import axios from 'axios'
import { url } from '../../helpers/env'

const state = () => {
  return {
    all: {
      data: [],
      isLoading: false,
      isError: false,
      errorMessage: ''
    },
    token: localStorage.getItem('token') || null
  }
}

const getters = {
  getAllCategory (state) {
    // console.log(state.all)
    return state.all
  },
  getToken (state) {
    if (state.token !== null) {
      console.log('token ada')
    } else {
      console.log('token tidak ada')
    }
  }
}

const mutations = {
  SET_ALL_DATA_CATEGORY (state, payload) {
    state.all.data = payload
  }
}

const actions = {
  getAllCategory (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/category/getall`)
        .then((response) => {
          context.commit('SET_ALL_DATA_CATEGORY', response.data.data)
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
