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
    setShowLoginForm: (state, val) => (state.showLoginForm = val),
    clearLoginAndSignUp: state => {
      Object.keys(state.loginForm).forEach(key => (state.loginForm[key] = ''));
      Object.keys(state.signUpForm).forEach(key => (state.signUpForm[key] = ''));
    }
  },
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        // sign user in
        const { user } = await auth.signInWithEmailAndPassword(email, password);

        commit('clearLoginAndSignUp');

        // fetch user profile and set in state
        dispatch('fetchUserProfile', user);
      } catch (err) {
        console.error(err);
      }
    },
    async loginWithGoogle({ dispatch, commit }) {
      const { user } = await signInWithGoogle();
      const { displayName, email, uid } = user;

      const userProfile = await usersCollection.doc(user.uid).get();

      const googleUser = {
        displayName,
        email,
        uid,
        createdAt: new Date(Date.now())
      };

      if (!userProfile.data()) {
        await usersCollection.doc(user.uid).set(googleUser);
      }

      commit('clearLoginAndSignUp');

      dispatch('fetchUserProfile', googleUser);
    },
    async signUp({ dispatch, commit }, { email, password, displayName }) {
      try {
        // sign user up
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        const userProfile = await usersCollection.doc(user.uid).get();

        console.log('userProfile :>> ', userProfile);

        if (!userProfile.data()) {
          // add user to the db
          await usersCollection
            .doc(user.uid)
            .set({ email, displayName, createdAt: new Date(Date.now()) });
        }

        commit('clearLoginAndSignUp');
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user);
      } catch (err) {
        console.error(err);
      }
    },
    async logout({ commit }) {
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
