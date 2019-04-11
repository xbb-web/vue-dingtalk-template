import * as type from './mutation-types'

export const setUserInfo = ({ commit }, userifo) => {
  commit(type.SET_USER_INFO, userifo)
}
