import Vue from 'vue'
import Vuex from 'vuex'

import ErrorModule from './ErrorModule'
import LoadingModule from './LoadingModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    ErrorModule,
    LoadingModule,
  },
})
