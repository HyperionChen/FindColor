// 提示类工具
import wepy from 'wepy'

export default class Tips {
  constructor() {
    this.isLoading = false
  }

  /**
   * 成功的toast
   * @param {String} title title
   * @param {long} duration duration
   */
  static showSuccess(title, duration = 1500) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: 'success',
        mask: true,
        duration: duration
      })
    }, 200)
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, duration)
      })
    }
  }

  /**
   * 弹出确认对话框
   * @param {string} text content
   * @param {()} success 确认后的传递的操作
   * @param {()} fail 取消后的传递的操作
   * @param {string} title title
   */
  static showConfirm({ text, success, cancel = () => {}, title = '提示' }) {
    wx.showModal({
      title: title,
      content: text,
      showCancel: cancel != null,
      success: res => {
        if (res.confirm) {
          success && success()
        } else if (res.cancel) {
          cancel && cancel()
        }
      },
      fail: res => {
        cancel && cancel()
      }
    })
  }

  /**
   * 弹出单按钮确认对话框
   * @param {string} text content
   * @param {()} success 确认后的传递的数据
   * @param {string} title title
   */
  static showAlert({ text, success, title = '提示' }) {
    wx.showModal({
      title: title,
      content: text,
      showCancel: false,
      success: res => {
        if (success) {
          success()
        }
      },
      fail: res => {
      }
    })
  }

  /**
   * 弹出toast
   * @param {string} title title
   * @param {*} icon success / loading / none
   */
  static showToast(title, icon = 'success') {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: icon,
        mask: true,
        duration: 1000
      })
    }, 200)
  }

  static showLoading(title = '加载中...') {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    wx.showLoading({
      title: title,
      mask: true
    })
  }

  static dismissLoading() {
    if (Tips.isLoading) {
      wx.hideLoading()
      Tips.isLoading = false
    }
  }

  static checkNetState() {
    if (!wepy.$instance.globalData.isNetConnected) {
      this.showToast('网络错误!', 'none')
      return false
    }
    return true
  }

  static isIOS() {
    let sysVersion = wepy.$instance.globalData.systemInfo.system
    return sysVersion.startsWith('iOS')
  }

  static iOSVersion() {
    let sysVersion = wepy.$instance.globalData.systemInfo.system
    if (sysVersion.startsWith('iOS')) {
      sysVersion = sysVersion.replace('iOS', '')
      let versions = sysVersion.split('.')
      let versionH = parseInt(versions[0])
      let versionM = parseInt(versions[1])
      let versionL = 0
      if (versions.length > 2) {
        versionL = parseInt(versions[2])
      }
      return versionH * 100 + versionM * 10 + versionL
    }
    return -1
  }

  /**
   * iOS支持的版本，部分功能以11为界进行区分
   */
  static isIOSSupport() {
    let version = this.iOSVersion()
    if (version == -1) {
      //非iOS版本
      return true
    }
    return version > 1100 && version < 1214

  }

  /**
   * 是否是 iPhone X
   */
  static isIphoneX() {
    let systemInfo = wepy.$instance.globalData.systemInfo
    if (systemInfo.screenHeight >= 812 && systemInfo.platform == 'ios') {
      return true
    }
    return false
  }
}

/** 静态变量，默认false*/
Tips.isLoading = false
