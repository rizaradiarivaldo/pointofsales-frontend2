import axios from 'axios'
import { url } from '../../helpers/env'

const state = () => {
  return {
    token: localStorage.getItem('token') || null
  }
}

const getters = {
  isLogin (state) {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  login (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/users/login`, payload)
        .then((response) => {
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('refreshtoken', response.data.data.refreshtoken)
          resolve(response.data.message)
          console.log(response.data)
        }).catch(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Gagal Login')
        })
    })
  },
  register (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/users/register`, payload)
        .then((response) => {
          resolve(response.data.message)
          console.log(response.data)
        }).catch(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Gagal Register')
        })
    })
  },

  logout (context) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshtoken')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
