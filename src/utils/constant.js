/**
 * host url
 */
export const HOST_URL = (process.env.NODE_ENV === 'production') ? 'https://platform.52mengdong.com' : 'https://platform-test.52mengdong.com';
/**
 *appType表示客户端类型
 */
export const APP_TYPE_WX = 'applet-wx';

export const APP_TYPE_QQ = 'applet-qq';
/**
 * app 名
 */
export const APP_NAME = '';
/**
 * 用于请求的版本号，长整型
 */
export const VERSION_CODE = 1;
/**
 *网络请求业务上成功码
 */
export const CODE_SUCCESS = 1000;
/**
 * 用户的code换取session_key
 */
export const USER_TOKEN_KEY = `${process.env.NODE_ENV}_userTokenKey_${VERSION_CODE}`;
/**
 * 保存用户token的时间
 */
export const USER_TOKEN_TIME = `${process.env.NODE_ENV}_userTokenTime_${VERSION_CODE}`;
/**
 * 缓存的用户信息
 */
export const USER_INFO = `${process.env.NODE_ENV}_userInfo_${VERSION_CODE}`;
/**
 * 加载新的用户信息成功
 */
export const EVENT_USER_INFO_SUCCESS = 'eventUserInfoSuccess';
