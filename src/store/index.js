import Vue from 'vue';
import Vuex from 'vuex';

import firebase from './modules/firebase';
import xivapi from './modules/xivapi';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  getters: {
    isLoading: ({ isLoading }) => isLoading
  },
  mutations: {
    setIsLoading: (state, val) => (state.isLoading = val)
  },
  actions: {
    setIsLoading({ commit }, isLoading) {
      commit('setIsLoading', isLoading);
    }
  },
  modules: {
    xivapi,
    firebase
  }
});
