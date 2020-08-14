import Vue from 'vue';
import Vuex from 'vuex';

import firebase from './modules/firebase';
import xivapi from './modules/xivapi';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    xivapi,
    firebase
  }
});
