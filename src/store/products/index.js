import axios from 'axios'
import { url } from '../../helpers/env'
const state = () => {
  return {
    all: {
      data: [],
      isLoading: false,
      isError: false,
      errorMessage: '',
      meta: null
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
  },
  SET_META (state, payload) {
    state.all.meta = payload
  }
}

const actions = {
  getAllProducts (context, payload) {
    const fd = {
      name: payload.name === undefined ? '' : payload.name,
      page: payload.page === undefined ? '1' : payload.page,
      sortby: payload.sortby === undefined ? 'id_product' : payload.sortby,
      sorttype: payload.sorttype === undefined ? 'asc' : payload.sorttype
    }
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall?name=${fd.name}&sort=${fd.sortby}&typesort=${fd.sorttype}&page=${fd.page}`)
        .then((response) => {
          resolve(response.data)
          context.commit('SET_ALL_DATA_PRODUCT', response.data.data)
          context.commit('SET_META', response.data.meta)
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
          resolve(response.data)
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
