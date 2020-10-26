import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import { url } from '../src/helpers/env'
import VueSweetalert2 from 'vue-sweetalert2'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueSweetalert2)

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log(error.response.data.message)
  // return Promise.reject(error)
  if (error.response.data.message === 'Token Expired !') {
    return new Promise((resolve, reject) => {
      const refreshtoken = localStorage.getItem('refreshtoken')
      axios.post(`${url}/users/tokenrefresh`, {
        tokenReq: refreshtoken
      }).then((result) => {
        localStorage.setItem('token', result.data.newtoken)
        window.location = '/'
      }).catch((err) => {
        console.log(err)
      })
    })
  }
})

axios.defaults.headers = {
  token: localStorage.getItem('token')
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
