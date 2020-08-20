import {
  auth,
  firestore,
  signInWithGoogle,
  createUserDocument,
  seedAllMounts,
  seedAllMinions
} from '../../../firebase';
import router from '../../../router';

import XIVAPI from 'xivapi-js';

const xiv = new XIVAPI({
  private_key: process.env.VUE_APP_XIV_API_KEY,
  language: 'en',
  snake_case: true
});

export default {
  namespaced: true,
  state: {
    allMounts: [],
    allMinions: [],
    userProfile: null,
    showLoginForm: true,
    loginForm: {
      email: '',
      password: ''
    },
    signUpForm: {
      displayName: '',
      email: '',
      password: ''
    }
  },
  getters: {
    allMounts: ({ allMounts }) => allMounts,
    allMinions: ({ allMinions }) => allMinions,
    userProfile: ({ userProfile }) => userProfile,
    showLoginForm: ({ showLoginForm }) => showLoginForm,
    loginForm: ({ loginForm }) => loginForm,
    signUpForm: ({ signUpForm }) => signUpForm
  },
  mutations: {
    setAllMounts: (state, mounts) => (state.allMounts = mounts),
    setAllMinions: (state, minions) => (state.allMinions = minions),
    setUserProfile: (state, val) => (state.userProfile = val),
    setShowLoginForm: (state, val) => (state.showLoginForm = val),
    clearLoginSignUpForms: state => {
      state.signUpForm = {
        displayName: '',
        email: '',
        password: ''
      };
      state.loginForm = {
        email: '',
        password: ''
      };
    }
  },
  actions: {
    async fetchAllMounts({ commit }) {
      try {
        const mountsCollection = firestore.collection('mounts');
        const snapShot = await mountsCollection.orderBy('id').get();

        if (snapShot.empty) {
          const { results } = await xiv.data.list('mount', { limit: 300 });
          const mounts = results.filter(({ name }) => name !== '');

          seedAllMounts(mounts);
          commit('setAllMounts', mounts);
        } else {
          const mounts = snapShot.docs.map(doc => doc.data());

          commit('setAllMounts', mounts);
        }
      } catch (err) {
        console.error(err);
      }
    },
    async fetchAllMinions({ commit }) {
      try {
        const minionsCollection = firestore.collection('minions');
        const snapShot = await minionsCollection.orderBy('id').get();

        if (snapShot.empty) {
          const { results } = await xiv.data.list('companion', { limit: 500 });

          seedAllMinions(results.filter(({ name }) => name !== ''));

          commit(
            'setAllMinions',
            results.filter(({ name }) => name !== '')
          );
        } else {
          const minions = snapShot.docs.map(doc => doc.data());

          commit('setAllMinions', minions);
        }
      } catch (err) {
        console.error(err);
      }
    },
    setUserProfile({ commit }, user) {
      commit('setUserProfile', user);
    },
    dashboardRedirect({ commit }) {
      commit('clearLoginSignUpForms');
      router.push({ name: 'Dashboard' });
    },
    async signUpWithEmailAndPassword({ dispatch }, { email, password, displayName }) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        await createUserDocument(user, { displayName });

        dispatch('dashboardRedirect');
      } catch (err) {
        console.error(err);
      }
    },
    async loginWithEmailAndPassword({ dispatch }, { email, password }) {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch('dashboardRedirect');
    },
    async loginWithGoogle({ dispatch }) {
      await signInWithGoogle();
      dispatch('dashboardRedirect');
    },
    async logout({ dispatch }) {
      await auth.signOut();
      await dispatch('setUserProfile', null);
      router.push({ name: 'Login' });
    },
    toggleLoginForm({ commit, state }) {
      commit('setShowLoginForm', !state.showLoginForm);
    }
  }
};
