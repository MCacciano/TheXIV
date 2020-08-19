import { auth, signInWithGoogle, usersCollection, createUserDocument } from '../../../firebase';
import router from '../../../router';

export default {
  namespaced: true,
  state: {
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
    userProfile: ({ userProfile }) => userProfile,
    showLoginForm: ({ showLoginForm }) => showLoginForm,
    loginForm: ({ loginForm }) => loginForm,
    signUpForm: ({ signUpForm }) => signUpForm
  },
  mutations: {
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
    setUserProfile({ commit }, user) {
      commit('setUserProfile', user);
    },
    dashboardRedirect({ commit }) {
      commit('clearLoginSignUpForms');
      router.push({ name: 'Dashboard' });
    },
    async signUpWithEmailAndPassword({ dispatch }, { email, password, displayName }) {
      await auth.createUserWithEmailAndPassword(email, password);
      dispatch('dashboardRedirect');
    },
    async loginWithEmailAndPassword({ dispatch }, { email, password }) {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch('dashboardRedirect');
    },
    async loginWithGoogle({ dispatch }) {
      await signInWithGoogle();
      dispatch('dashboardRedirect');
    },
    async logout() {
      await auth.signOut();
      router.push({ name: 'Login' });
    },
    toggleLoginForm({ commit, state }) {
      commit('setShowLoginForm', !state.showLoginForm);
    }
  }
};
