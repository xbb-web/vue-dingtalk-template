/*
 * @Author: kai.yang
 * @LastEditors: kai.yang
 * @Description: 开发环境对钉钉api的模拟
 * @Date: 2019-04-11 13:59:34
 * @LastEditTime: 2019-04-11 14:11:19
 */

const state = {
  headConfig: {
    onSuccess: null,
    title: '',
    rightButton: '',
    rightMenu: []
  }
}

// getters
const getters = {
  getHeadConfig: state => state.headConfig
}

// actions
const actions = {
  setAppTitle ({ commit }, payload) {
    commit('TITLE', payload)
  },

  setRightButton ({ commit }, payload) {
    commit('RIGHTBUTTON', payload)
  },

  setRightMenu ({ commit }, payload) {
    commit('RIGHTMENU', payload)
  },

  setOnSuccess ({ commit }, payload) {
    commit('SETONSUCCESS', payload)
  }
}

// mutations
const mutations = {
  TITLE (state, str) {
    state.headConfig.title = str
  },

  RIGHTBUTTON (state, text) {
    state.headConfig.rightButton = text
  },

  RIGHTMENU (state, arr) {
    state.headConfig.rightMenu = arr
  },

  SETONSUCCESS (state, func) {
    state.headConfig.onSuccess = func
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
