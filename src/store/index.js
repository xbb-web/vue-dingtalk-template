import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import mockding from './modules/mock-ding'

Vue.use(Vuex)

const debug = process.env.NODE_EVN !== 'production'

const state = {
  // 用户登录信息
  userInfo: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug,
  modules: {
    mockding
  }
})
