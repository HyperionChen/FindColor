/**自封装一个简单的事件发布控制器**/

class EventBus {


  static getInstance() {
    return EventBus.instance
  }

  constructor() {
    if (EventBus.instance) {
      return EventBus.instance
    }
    this._events = []
    EventBus.instance = this
  }

  /**
   * 注册事件
   * @param name key
   * @param fn callback
   */
  register(name, fn) {
    if (this._events[name]) {
      this._events[name].push(fn)
    } else {
      this._events[name] = [fn]
    }
  }

  unRegister(name, fn) {
    if (this._events[name]) {
      this._events[name] = this._events[name].filter(it => it !== fn)
    }
  }

  /**
   * 发布事件
   * @param name 事件名
   * @param params 参数
   */
  post(name, ...params) {
    // console.log(`eventBus 发布的事件名：${name} -- 参数  ： ${JSON.stringify(params)}`)
    if (this._events[name]) {
      this._events[name].forEach(it => {
        it.apply(this, params)
      })
    }
  }

}


const eventBus = new EventBus()

export default eventBus
