import Vue from 'vue';
import Vuex from 'vuex';
import { auth, usersCollection } from '../firebase';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile: (state, val) => (state.userProfile = val)
  },
  actions: {
    async login({ dispatch }, { email, password }) {
      // sign user in
      const { user } = await auth.signInWithEmailAndPassword(email, password);

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user);
    },
    async signUp({ dispatch }, { email, password, displayName }) {
      // sign user up
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      // add user to the db
      await usersCollection
        .doc(user.uid)
        .set({ email, displayName, createdAt: Date.now().toLocaleString() });

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user);
    },
    async signOut({ commit }) {
      auth.signOut();

      commit('setUserProfile', {});
      router.push('/login');
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await usersCollection.doc(user.uid).get();

      // set user profile in state
      commit('setUserProfile', userProfile.data());

      // route to dashboard
      router.push('/');
    }
  },
  modules: {}
});
