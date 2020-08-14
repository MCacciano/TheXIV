import { auth, signInWithGoogle, usersCollection } from '../../../firebase';
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
    loginForm: ({ loginForm }) => loginForm,
    signUpForm: ({ signUpForm }) => signUpForm,
    showLoginForm: ({ showLoginForm }) => showLoginForm
  },
  mutations: {
    setUserProfile: (state, val) => (state.userProfile = val),
    setShowLoginForm: (state, val) => (state.showLoginForm = val)
  },
  actions: {
    async login({ dispatch }, { email, password }) {
      try {
        // sign user in
        const { user } = await auth.signInWithEmailAndPassword(email, password);

        // fetch user profile and set in state
        dispatch('fetchUserProfile', user);
      } catch (err) {
        console.error(err);
      }
    },
    async loginWithGoogle({ dispatch }) {
      try {
        const { displayName, email, uid } = await signInWithGoogle();
        const user = {
          uid,
          email,
          displayName
        };

        dispatch('fetchUserProfile', user);
      } catch (err) {
        console.error(err);
      }
    },
    async signUp({ dispatch }, { email, password, displayName }) {
      try {
        // sign user up
        const { user } = await auth.createUserWithEmailAndPassword(email, password);

        // add user to the db
        await usersCollection.doc(user.uid).set({ email, displayName, createdAt: Date.now() });

        // fetch user profile and set in state
        dispatch('fetchUserProfile', user);
      } catch (err) {
        console.error(err);
      }
    },
    async signOut({ commit }) {
      try {
        await auth.signOut();
        commit('setUserProfile', null);

        router.push('/login');
      } catch (err) {
        console.error(err);
      }
    },
    async fetchUserProfile({ commit }, user) {
      try {
        if (user) {
          // fetch user profile
          const userProfile = await usersCollection.doc(user.uid).get();

          // set user profile in state
          commit('setUserProfile', userProfile.data());
        } else {
          commit('setUserProfile', null);
        }

        // route to dashboard
        router.push('/');
      } catch (err) {
        console.error(err);
      }
    },
    toggleForm({ commit, state }) {
      commit('setShowLoginForm', !state.showLoginForm);
    }
  }
};
