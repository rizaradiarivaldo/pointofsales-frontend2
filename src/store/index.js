import Vue from 'vue'
import Vuex from 'vuex'
import products from './products/index'
import category from './category/index'
import auth from './auth/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    category,
    auth
  }

  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
})
