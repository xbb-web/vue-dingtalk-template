/*
 * @Author: zpp
 * @Date: 2019-01-03 11:03:37
 * @LastEditors: kai.yang
 * @LastEditTime: 2019-04-08 21:02:34
 * @Description: 挂载到全局的utils方法
 * @Props:
 * @Emit:
 */

import vueCookie from 'vue-cookies'
import dingtalk from './dingtalk'

// localStorage
const LS = {
  get (name) {
    let value = localStorage.getItem(name)
    if (/^\{.*\}$/.test(value) || /^\[.*\]$/.test(value)) value = JSON.parse(value)
    return value
  },
  set (name, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value)
    return localStorage.setItem(name, value)
  },
  remove (name) {
    return localStorage.removeItem(name)
  }
}

// 设置cookie
const CK = {
  // 设置key
  set: (keyName, value) => {
    return vueCookie.set(keyName, value) // this
  },
  // 获取key
  get: (keyName) => {
    return vueCookie.get(keyName) // value
  },
  // 删除key
  remove: (keyName) => {
    return vueCookie.remove(keyName) // true、false
  },
  // 是否存在key
  isKey: (keyName) => {
    return vueCookie.isKey(keyName) // true、false
  },
  // 获取所有key
  keys: () => {
    return vueCookie.keys() // array
  }
}

// 深拷贝
const deepClone = function (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

// 因为toISOString默认转为格林尼治时间，所以在转换之前需要额外加上8个小时
function timeZone (time) {
  if (typeof time === 'object') {
    time = time.getTime()
  }
  return new Date(time + 28800000)
}

const DateFormat = {
  formatDate (d, type) {
    if (!d) {
      d = timeZone(new Date())
    } else if (typeof d === 'object') {
      d = timeZone(d)
    } else if (typeof d === 'number') {
      if (d.toString().length === 10) {
        d = d * 1000
      }
      d = timeZone(d)
    } else {
      // 判断所传入的日期是否为有效日期，如果不是，则返回当日时间
      d = new Date(d)
      const isValidDate = d.getTime().toString() !== 'NaN'

      // 所传入的日期为有效日期，且年份不得大于9999
      if (isValidDate && d.getYear() < 9999) {
        d = timeZone(d)
      } else {
        d = timeZone(new Date())
      }
    }

    // 输出 datetime
    if (type === 'datetime') {
      return d.toISOString().substring(0, 16).replace('T', ' ')
    } else if (type === 'seconds') {
      return d.toISOString().substring(0, 19).replace('T', ' ').substring(11, 19)
    }

    // 输出 date
    return d.toISOString().slice(0, 10)
  },
  // 与现在时间做比较
  /*
  传入参数列表
  time: 需要比较的时间（秒）
  demo:
  1分钟内： '刚刚'
  1小时内： 'xx分钟前'
  5小时内： 'xx小时前'
  超过5小时但在今日内： '今日 hh:mm'
  其他时间：'DD-MM hh:mm'
  */
  formatTimeCompare (time) {
    time = Number(time)
    if (!time) {
      return
    }
    // 只需要精确到秒
    let curTime = parseInt(new Date().getTime() / 1000)

    // 现在时间与传入的时间做比较
    let poor = curTime - time

    // 今日零点的时间戳（取的秒）
    let curDay = parseInt(new Date(new Date().setHours(0, 0, 0, 0)) / 1000)

    if (parseInt(poor / 60) === 0) { // 1 分钟内
      return '刚刚'
    } else if (parseInt(poor / 60) < 60) { // 1小时内
      return parseInt(poor / 60) + '分钟前'
    } else if (parseInt(poor / 3600) < 5) { // 5小时内
      return parseInt(poor / 3600) + '小时前'
    } else if (curDay < time) { // 超过5小时但在今日内
      return '今日 ' + DateFormat.formatDate(time, 'datetime').slice(11)
    } else {
      return DateFormat.formatDate(time, 'datetime').slice(5)
    }
  }
}

export default {
  deepClone,
  LS,
  CK,
  DateFormat,
  ...dingtalk
}
