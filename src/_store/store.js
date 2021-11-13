import Vue from 'vue'
import Vuex from 'vuex'
import { cityService } from '../_services/cityService'

Vue.use(Vuex)

const cities = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : []

export const store = new Vuex.Store({
  state: {
    cities
  },
  mutations: {
    create (state, data) {
      state.cities.push(data)
      cityService.setStorage(state.cities)
    },
    remove (state, name) {
      state.cities = state.cities.filter(i => i.name !== name)
      cityService.setStorage(state.cities)
    },
    update (state, data) {
      state.cities = state.cities.map(i => i.name === data.name ? data : i)
      cityService.setStorage(state.cities)
    }
  },
  getters: {
    cities: ({ cities }) => cities
  }
})
