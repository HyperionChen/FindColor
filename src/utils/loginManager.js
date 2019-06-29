import utils from '@/utils/util'
import wepy from 'wepy'
import * as api from '@/api/api'
import tip from '@/utils/tip'
import eventBus from '@/utils/eventBus'
import {
    USER_TOKEN_KEY,
    USER_INFO,
    USER_OPEN_ID,
    USER_TOKEN_TIME,
    EVENT_USER_INFO_SUCCESS
} from '@/utils/constant'

//服务器token过期时间，7天
const TOKEN_OVER = 7 * 24 * 60 * 60 * 1000
/**
 * 授权失败
 */
const ERROR_AUTH = -10
/**
 * QQ登录失败
 */
const ERROR_LOGIN = -11
/**
 * 获取服务器token失败
 */
const ERROR_GET_TOKEN = -12
/**
 * 获取ali oss token失败
 */
const ERROR_OSS_TOKEN = -13
/**
 * 获取用户信息失败
 */
const ERROR_USER_INFO = -14

class LoginManager {
    constructor() {
        if (LoginManager.instance) {
            return LoginManager.instance
        }
        LoginManager.instance = this
    }

    //若已经授权了，但本地还没有数据，就自动登陆
    async autoLogin(isEnterAuth = true, ok, fail) {
        let res = await wepy.getSetting()
        if (res && (res.authSetting)['scope.userInfo']) {
            // 已经获得用户授权
            let userInfo = wepy.getStorageSync(USER_INFO)
            console.log('local cache userInfo >> ' + JSON.stringify(userInfo))
            let token = wepy.getStorageSync(USER_TOKEN_KEY)
            let tokenTime = wepy.getStorageSync(USER_TOKEN_TIME)
            tokenTime = tokenTime ? tokenTime : 0
            let isTokenOver = new Date().getTime() - tokenTime > TOKEN_OVER
            if (!userInfo || !userInfo.nickName || !token || isTokenOver) {
                // 需要重新登录拉取用户信息
                this.login(ok)
            } else {
                userInfo.photo = api.aliOssImgUrl(userInfo.photo)
                wepy.$instance.globalData.userInfo = userInfo
                wepy.$instance.globalData.userLoginToken = token
                this.loadOssToken(true, () => {
                    this.loadUserInfo(true, ok, fail)
                    //TODO:异步加载其他配置
                }, fail)
            }
        } else {
            //没有权限，就进入授权页,wx.authorize({scope: "scope.userInfo"})，不会弹出授权窗口，直接强获取
            let info = null
            try {
                info = await wepy.getUserInfo()
            } catch (e) {
                console.error('-- get user info fail-->' + JSON.stringify(e))
            }
            if (info) {
                this.login(ok)
            } else {
                fail && fail(ERROR_AUTH, '没有权限，请稍候再试')
            }
        }
    }


    isLogin() {
        return wepy.$instance.globalData.userLoginToken && wepy.$instance.globalData.userInfo
    }

    /**
     * 在需要登录的操作前使用该方法来登录后执行
     */
    async checkLogin(ok, fail) {
        if (this.isLogin()) {
            ok && ok()
        } else {
            let infoAuth
            try {
                infoAuth = await this.checkUserInfoAuth()
            } catch (e) {
                console.error('-- check user info auth fail-->' + JSON.stringify(e))
            }
            if (infoAuth) {
                this.login(ok, fail)
            } else {
                fail && fail()
            }
        }
    }

    async checkUserInfoAuth() {
        let info = null
        try {
            info = await wepy.getSetting()
        } catch (e) {
            console.error('-- get getSetting fail-->' + JSON.stringify(e))
        }
        return info && info.authSetting && (info.authSetting)['scope.userInfo']
    }

    /**
     *检查启动的数据
     */
    checkLaunchData(isCheckUserInfo = false, ok, fail) {
        if (!wepy.$instance.globalData.aliOssToken) {
            this.loadOssToken(false, () => {
                if (isCheckUserInfo && !wepy.$instance.globalData.userInfo) {
                    this.loadUserInfo(false, () => {
                        ok && ok()
                    }, (status, message) => {
                        fail && fail(status, message)
                    })
                } else {
                    ok && ok()
                }
            }, (status, message) => {
                fail && fail(status, message)
            })
        } else {
            ok && ok()
        }
    }

    /**
     * 登录
     */
    async login(ok, fail) {
        let loginInfo = await wepy.login()
        console.info('-- loginInfo -->' + JSON.stringify(loginInfo))
        if (loginInfo.code) {
            wepy.$instance.globalData.loginCode = loginInfo.code
            let info = await wepy.getUserInfo()
            console.info('-- user info -->' + JSON.stringify(info))
            let result = await this.convertToken(info, loginInfo.code)
            if (result) {
                // 缓存token
                console.info('-- Token  result -->' + JSON.stringify(result))
                wepy.$instance.globalData.userLoginToken = result.token
                wepy.setStorageSync(USER_TOKEN_KEY, result.token)
                wepy.setStorageSync(USER_TOKEN_TIME, new Date().getTime())
                this.loadOssToken(true, () => {
                    this.loadUserInfo(true, ok, fail)
                    //TODO:异步加载其他配置
                }, fail)
            } else {
                fail && fail(ERROR_GET_TOKEN, '获取数据失败，请稍候再试')
            }
        } else {
            fail && fail(ERROR_LOGIN, '登录失败，请稍候再试')
        }
    }

    async loadOssToken(isIgnore = true, ok, fail) {
        let token = null
        try {
            token = await api.getAliOSSToken({
                method: 'GET'
            })
        } catch (e) {
            console.error('--- getAliOSSToken fail ---' + JSON.stringify(e))
        }
        if (token) {
            wepy.$instance.globalData.aliOssToken = token
            //若不需要加载用户信息，就直接成功回调
            ok && ok()
        } else {
            if (isIgnore) {
                //若不需要加载用户信息，就直接成功回调
                ok && ok()
            } else {
                fail && fail(ERROR_OSS_TOKEN, '加载AliOSS数据失败')
            }
        }

    }


    /**
     * 加载自己服务器上的用户信息
     * @param isIgnore 加载失败后是否忽略继续成功回调
     */
    async loadUserInfo(isIgnore = true, ok, fail) {
        //获取当前用户信息
        let simpleUserInfo = null
        try {
            simpleUserInfo = await api.getSimpleUserInfo({
                method: 'GET'
            })
        } catch (e) {
            console.error('--- getSimpleUserInfo fail ---' + JSON.stringify(e))
        }
        tip.dismissLoading()
        // 缓存用户信息
        if (simpleUserInfo) {
            simpleUserInfo.photo = api.aliOssImgUrl(simpleUserInfo.photo)
            wepy.setStorageSync(USER_INFO, simpleUserInfo)
            wepy.$instance.globalData.userInfo = simpleUserInfo
            eventBus.post(EVENT_USER_INFO_SUCCESS)
            // 授权成功，进入主页
            ok && ok()
        } else {
            console.error('加载用户信息失败')
            if (isIgnore) {
                ok && ok()
            } else {
                fail && fail(ERROR_USER_INFO, '加载用户信息失败')
            }
        }
    }

    /**
     * 访问后台进行登录，换取token
     */
    convertToken(userInfoRes, code) {
        let params = {
            query: {
                code: code,
                encryptedData: userInfoRes.encryptedData,
                iv: userInfoRes.iv
            }
        }
        if (wepy.$instance.globalData.isQQPlatform) {
            return api.convertQQToken(params)
        }
        return api.convertToken(params)
    }
}

const loginManager = new LoginManager()

export default loginManager
