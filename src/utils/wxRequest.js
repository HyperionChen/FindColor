// 微信请求封装
import wepy from 'wepy'
import tip from './tip'
import crypto from 'crypto-js'
import {
    HOST_URL,
    USER_INFO,
    USER_TOKEN_KEY,
    CODE_SUCCESS,
    APP_TYPE_WX,
    APP_TYPE_QQ,
    VERSION_CODE,
    APP_NAME,
    USER_TOKEN_TIME
} from '@/utils/constant'

const wxRequest = (params = {}, url, isShowLoading = true) => {
    if (isShowLoading) {
        tip.showLoading()
    }
    let appType = wepy.$instance.globalData.isQQPlatform ? APP_TYPE_QQ : APP_TYPE_WX
    let data = params.query || {}
    let timestamp = new Date().getTime()
    //需要添加签名
    let method = params.method || 'POST'
    let sign
    if (method === 'GET' || method === 'DELETE') {
        //get或delete时只对url签名
        sign = crypto.MD5(encodeURIComponent(url)).toString()
    } else {
        sign = signUrl(timestamp, appType, data)
    }
    return new Promise(((resolve, reject) => {
        wepy.request({
                url: HOST_URL + url,
                method: method,
                data: data,
                header: {
                    'Content-Type': 'application/json',
                    'apptype': appType,
                    'appname': APP_NAME,
                    'versioncode': VERSION_CODE,
                    'sign': sign,
                    'timestamp': timestamp,
                    'token': tokenKey()
                }
            }
        )
            .then(res => {
                if (res.data.status === CODE_SUCCESS) {
                    //成功
                    resolve(res.data.content)
                } else if (!handleCode(res)) {
                    reject(res)
                }
            })
            .catch(error => {
                reject(error)
            })
            .then(res => {
                if (isShowLoading) {
                    tip.dismissLoading()
                }
            })
    }))
}

function retryAuthorize() {
    wepy.setStorageSync(USER_INFO, null)
    wepy.setStorageSync(USER_TOKEN_KEY, null)
    wepy.setStorageSync(USER_TOKEN_TIME, 0)
    wepy.reLaunch({
        url: '/pages/authorize'
    })
}

let lastRelaunchTime = 0

/**
 * 特殊错误码处理
 */
function handleCode(res) {
    if (res.data.status == 219) {
        // 登陆失效，重新去认证
        let interval = new Date().getTime() - lastRelaunchTime
        //防重
        if (interval > 2000) {
            lastRelaunchTime = new Date().getTime()
            retryAuthorize()
        }
        return true
    }
    return false
}

function tokenKey() {
    let cacheToken = wepy.$instance.globalData.userLoginToken
    if (!cacheToken) {
        cacheToken = wepy.getStorageSync(USER_TOKEN_KEY)
    }
    if (cacheToken) {
        wepy.$instance.globalData.userLoginToken = cacheToken
    }
    return cacheToken
}

/**
 * 对请求参数签名
 * @param {Number} timestamp 时间戳
 * @param {string} appType app type
 * @param {obj} params 参数对象
 */
function signUrl(timestamp, appType = APP_TYPE_QQ, params) {
    let paramsMap = Object.assign({}, params)
    paramsMap.appname = APP_NAME
    paramsMap.apptype = appType
    paramsMap.timestamp = timestamp
    paramsMap.versioncode = VERSION_CODE
    let keys = Object.keys(paramsMap)
    let content = ''

    keys.sort().filter((v) => {
        return v
    }).forEach(function (key) {
        //数组不参与签名
        let v = paramsMap[key]
        if (typeof (v) == 'undefined' || v == null) return
        if (v instanceof Array) return
        let value = '' + v
        value = value.replace(/\*/g, '')
        value = value.replace(/[ ]/g, '')
        value = value.replace(/[\f\r\t\v]+/g, '')
        // value = value.replace(/\s\n/g, '')
        if (value) {
            value = encodeURIComponent(value)
            value = replaceEscapeChar(value)
            content += `${key}=${value}&`
        }
    })
    if (content.length > 0) {
        content = content.substring(0, content.length - 1)
    }
    console.error('参与签名字符串:==>' + content)
    let sign = crypto.MD5(content)
    return sign.toString()
}

/**
 * 替换所有encodeURIComponent未编码的字符
 */
function replaceEscapeChar(text) {
    if (!text) {
        return text
    }
    text = text.replace(/\(/g, escape('('))
    text = text.replace(/\)/g, escape(')'))
    text = text.replace(/\~/g, escape('~'))
    text = text.replace(/\./g, escape('.'))
    text = text.replace(/\*/g, escape('*'))
    text = text.replace(/\'/g, escape('\''))
    text = text.replace(/_/g, escape('_'))
    text = text.replace(/!/g, escape('!'))
    return text
}

module.exports = {
    wxRequest,
    tokenKey: tokenKey
}
