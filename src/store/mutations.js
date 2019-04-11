import * as types from './mutation-types'

const mutations = {

  /**
   * @description 更新用户信息
   * @param {*} state
   * @param {Object} userinfo 用户信息
   */
  [types.SET_USER_INFO] (state, userinfo) {
    state.userInfo = userinfo
  }
}

export default mutations
