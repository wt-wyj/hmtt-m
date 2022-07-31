import Vue from 'vue'
import Vuex from 'vuex'

import { setToken, getToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenObj: getToken() || {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
