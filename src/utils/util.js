// 工具方法

//  遍历对象属性和值
function displayProp(obj) {
    let names = '';
    for (let name in obj) {
        names += name + obj[name];
    }
    return names;
}

/**
 * 校验手机号格式
 * @param {string} phone number
 */
function verifyPhone(phone) {
    let REGEX_CN_PHONE = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
    return REGEX_CN_PHONE.test(phone);
}

/**
 * 对列表升/降序排列
 * @param {list} keys 要排列的keys
 * @param {is ascending} ascending 是否升序
 */
function keySort(key, ascending = true) {
    return function(a, b) {
        return ascending ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    };
}

/**
 * 将长id处理成只显示后3位
 */
function formatSessionId(sessionId) {
    if (/^\d+$/.test(sessionId)) {
        //纯数字
        if (sessionId.length > 3) {
            return `${sessionId.substring(0, 1)}**${sessionId.substring(sessionId.length - 2)}`;
        }
    }
    return sessionId;
}

/**
 * 服务器返回的金额都为分，显示时处理成元
 * @param cent 分
 */
function formatPrice(cent) {
    cent = cent.toFixed(0);
    let num = (isNaN(cent)) ? String(0) : String(cent);
    let zero = '';
    for (let i = num.length; i < 3; i++) {
        zero += '0';
    }
    num = zero + num;
    return `${num.slice(0, num.length - 2)}.${num.slice(num.length - 2)}`;
}

/**
 * 将时间戳格式化成时间文本
 * @param timestamp number
 */
function formatDate(timestamp, format = 'yyyy-MM-dd hh:mm:ss') {
    Date.prototype.format = function(fmt) {
        let o = {
            'M+': this.getMonth() + 1,                 //月份
            'd+': this.getDate(),                    //日
            'h+': this.getHours(),                   //小时
            'm+': this.getMinutes(),                 //分
            's+': this.getSeconds(),                 //秒
            'q+': Math.floor((this.getMonth() + 3) / 3), //季度
            'S': this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    };
    return new Date(timestamp).format(format);
}

/**
 * 将时间字符串转换成时间戳
 * 在iOS的web js里必须是 yyyy/MM/dd的格式，否则无法识别
 */
function getTimeTamp(time) {
    if (time) {
        time = time.replace(/\-/g, '/');
        return Date.parse(time);
    }
    return new Date().getTime();
}

/**
 * 对数字添0格式化
 * @param num 原数据
 * @param n 完成后的长度，在其前面添0
 * @returns string
 */
function joinZeroNum(num, n) {
    let len = num.toString().length;
    while (len < n) {
        num = '0' + num;
        len++;
    }
    return num;
}

/**
 *时间差值转成分秒
 */
function intervalTime2MS(timeTamp) {
    if (!timeTamp || timeTamp <= 0) return '00:00';
    let t = parseInt(timeTamp / 1000);
    let m = parseInt(t / 60);
    let s = t - m * 60;
    return `${joinZeroNum(m, 2)}:${joinZeroNum(s, 2)}`;
}

/**
 * 格式化时间
 * @param time 2019-03-25 20:14:43
 */
function formatIntervalTime(time) {
    let tDate;
    if (time) {
        tDate = new Date();
        //在iOS的web js里必须是 yyyy/MM/dd的格式，否则无法识别
        time = time.replace(/\-/g, '/');
        let time1 = Date.parse(time);
        tDate.setTime(time1);
    } else {
        tDate = new Date();
    }
    let t = tDate.getTime();
    if (isToday(tDate.getTime())) {
        return formatDate(t, 'hh:mm');
    }
    if (isYesterday(tDate.getTime())) {
        return '昨天';
    }
    return formatDate(t, 'MM-dd');
}

/**
 * 判断输入的时间戳是否是今天
 * @param timeTamp 时间戳
 */
function isToday(timeTamp) {
    let tDate = new Date(timeTamp);
    let tYear = tDate.getFullYear();
    let tMonth = tDate.getMonth();
    let tDay = tDate.getDate();
    let today = new Date();
    return (tYear == today.getFullYear()) && (tMonth == today.getMonth()) && (tDay == today.getDate());
}

/**
 * 判断输入的时间戳是否是昨天天
 * @param timeTamp 时间戳
 */
function isYesterday(timeTamp) {
    let tDate = new Date(timeTamp);
    let tYear = tDate.getFullYear();
    let tMonth = tDate.getMonth();
    let tDay = tDate.getDate();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (tYear == yesterday.getFullYear()) && (tMonth == yesterday.getMonth()) && (tDay == yesterday.getDate());
}

/**
 * 将数字星期转成文字
 * @param weekNumber
 * @returns {string}
 */
function formatWeek(weekNumber) {
    let week = '';
    if (weekNumber == 1) {
        week = '周一';
    } else if (weekNumber == 2) {
        week = '周二';
    } else if (weekNumber == 3) {
        week = '周三';
    } else if (weekNumber == 4) {
        week = '周四';
    } else if (weekNumber == 5) {
        week = '周五';
    } else if (weekNumber == 6) {
        week = '周六';
    } else if (weekNumber == 7) {
        week = '周日';
    }
    return week;
}

/**
 * 判断对象是否为空
 * @param obj
 * @returns {boolean} true-空
 */
function isNull(obj) {
    return typeof (obj) == 'undefined' || obj == null || Object.keys(obj).length === 0;
}


function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) == 'object') {
            return true;
        }
    } catch (e) {
    }
    return false;
}

/**
 * 函数防抖，在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。用于防止表单多次提交。
 * @param fn 要执行的函数
 * @param wait 等待时间
 */
function debounce(fn, wait = 300) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, wait);
    };
}

function isString(s) {
    return String(s) === s;
}

/**
 * 函数节流,规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
 * 用于游戏中的刷新率等
 * @param fn 要执行的函数
 * @param gapTime 单位
 */
function throttle(fn, gapTime = 300) {
    let _lastTime = null;
    return function() {
        let _nowTime = +new Date();
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments);
            _lastTime = _nowTime;
        }
    };
}


module.exports = {
    displayProp: displayProp,
    keySort: keySort,
    verifyPhone: verifyPhone,
    formatPrice: formatPrice,
    formatDate: formatDate,
    formatSessionId: formatSessionId,
    formatIntervalTime: formatIntervalTime,
    getTimeTamp: getTimeTamp,
    isToday: isToday,
    formatWeek: formatWeek,
    joinZeroNum: joinZeroNum,
    isNull: isNull,
    isJsonString: isJsonString,
    debounce: debounce,
    throttle: throttle,
    isString: isString,
    intervalTime2MS: intervalTime2MS
};
