import axios from 'axios'
import { url } from '../../helpers/env'
const state = () => {
  return {
    all: {
      data: [],
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  }
}

const getters = {
  getAllProducts (state) {
    return state.all
  }
}

const mutations = {
  SET_ALL_DATA_PRODUCT (state, payload) {
    state.all.data = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  }
}

const actions = {
  getAllProducts (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  SortingData (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall?name=${payload}`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },

  sortLates (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall?typesort=desc`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  sortProductNameA (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall?sort=productname`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  sortProductNameZ (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall?sort=productname&typesort=desc`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  sortPriceA (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall?sort=price`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  sortPriceZ (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall?sort=price&typesort=desc`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  insertData (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.post(`${url}/product/insert`, payload)
        .then((response) => {
          // console.log(response)
          resolve()
        }).catch((err) => {
          console.log(err.message)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  updateData (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.put(`${url}/product/update/${payload.id}`, payload.formdata)
        .then((response) => {
          // console.log(response)
          resolve()
        }).catch((err) => {
          console.log(err.message)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  deleteData (context, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/product/delete/${payload}`)
        .then((response) => {
          resolve()
          window.location = '/'
        }).catch((err) => {
          console.log(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
