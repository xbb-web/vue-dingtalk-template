/*
 * @Author: kai.yang
 * @LastEditors: kai.yang
 * @Description: 钉钉方法封装
 * @Date: 2019-04-08 21:00:17
 * @LastEditTime: 2019-04-11 14:24:06
 */

import { getConfig, generateNonce, getUserInfo } from '@/api/system'
import router from '@/router'

// 生产环境引入的dingtalkAPI
import * as ddProd from 'dingtalk-jsapi'
// 开发环境，对dingtalkAPI的封装
import ddDev from './dev-index'

const dd = process.env.NODE_ENV === 'development' ? ddDev : ddProd
const scenes = 'dingtalk' // 当前登录场景

// localStorage
const LS = {
  get (name) {
    let value = localStorage.getItem(name)
    if (/^\{.*\}$/.test(value) || /^\[.*\]$/.test(value)) value = JSON.parse(value)
    return value
  }
}

// 是否是钉钉环境
function isDingTalk () {
  let flag
  let userAgent = window.navigator.userAgent
  flag = /DingTalk/i.test(userAgent)
  return flag
}

/*
  start 钉钉方法封装
*/
// 设置标题
const setTitle = dd.biz.navigation.setTitle

// 设置右侧按钮
const setRight = dd.biz.navigation.setRight

// 设置右侧菜单
const setMenu = dd.biz.navigation.setMenu

// 设置左侧返回按钮
const setLeft = dd.biz.navigation.setLeft

// 旋转设备屏幕
const rotateView = dd.device.screen.rotateView

// 重置设备屏幕方向
const resetView = dd.device.screen.resetView

/*
  end 钉钉方法封装
*/

// 打开新窗口
const openNewLink = function (url) {
  const ip = location.origin
  // vm页面链接禁止访问
  if (url.indexOf('/dist') === -1) {
    return
  }
  window.location.href = ip + url
}

// 拿到钉钉的免登code
function getCode (appid, corpid) {
  return new Promise((resolve, reject) => {
    dd.runtime.permission.requestAuthCode({
      corpId: corpid,
      onSuccess (result) {
        resolve(result.code, corpid, appid)
        console.log('钉钉code', result)
      },
      onFail (err) {
        reject(err)
        console.log('钉钉code err', err)
      }
    })
  })
}

// 初始化
function init () {
  return new Promise((resolve, reject) => {
    // 开发环境或非钉钉环境，可略过登录验证
    const isLocal = process.env.NODE_ENV === 'production' ? 0 : 1
    if (isLocal || !isDingTalk()) {
      resolve()
      return false
    }
    const params = {
      pageUrl: window.location.href
    }
    getConfig(params)
      .then(({ config }) => {
        // dingding鉴权
        dd.config({
          agentId: config.agentid, // 必填，微应用ID
          corpId: config.corpId, // 必填，企业ID
          timeStamp: config.timeStamp, // 必填，生成签名的时间戳
          nonceStr: config.nonceStr, // 必填，生成签名的随机串
          signature: config.signature, // 必填，签名
          jsApiList: ['biz.contact.choose', 'biz.contact.complexPicker', 'biz.contact.departmentsPicker', 'biz.ding.create'] // 必填，需要使用的jsapi列表
        })
        dd.error((error) => {
          alert(JSON.stringify(error) + ',请退出重新进入销帮帮', 'error')
          dd.biz.navigation.close()
          return false
        })
        return Promise.resolve(config)
      })
      .then(({ agentid, corpid }) => {
        // 获取code码
        return getCode(agentid, corpid)
      })
      .then((code, corpid, appid) => {
        // 保存appid，并获取登录用户信息
        LS.set('appid', appid)
        return getUserInfo({ code, corpid, appid, scenes })
      })
      .then(data => {
        // 拿到用户信息，然后验证登录是否存在异常
        const nr = data.nr
        const { corpid, userid } = data.user
        return generateNonce({ corpid, userid, nr, scenes })
      })
      .then(data => {
        // 是否有异常
        if ([5, 9, 10, 12, 13].indexOf(data.expireType) > -1) {
          router.push({ name: 'NoAccess', params: data })
          return
        }
        // 保存公司id,用户id,微应用
        LS.set('corpid', data.user.corpid)
        LS.set('userId', data.user.userId)
        LS.set('xbbAccessToken', data.xbbAccessToken)
        LS.set('userName', data.user.name)

        // 登录完成
        resolve(data)
      })
      .catch((error) => {
        console.warn('登录异常', error)
        reject(error)
        if (!error.code) router.push({ name: 'Error' })
      })
  })
}

export default {
  isDingTalk,
  setTitle,
  setRight,
  setLeft,
  setMenu,
  rotateView,
  resetView,
  openNewLink,
  init
}
