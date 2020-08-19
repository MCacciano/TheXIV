import XIVAPI from 'xivapi-js';

import { usersCollection } from '../../../firebase';

const xiv = new XIVAPI({
  private_key: process.env.VUE_APP_XIV_API_KEY,
  language: 'en',
  snake_case: true
});

export default {
  namespaced: true,
  state: {
    mounts: [],
    dataCenters: [],
    dataCenterKeys: [],
    character: {
      achievements: [],
      profile: {
        portrait: require('@/assets/images/default-user.png')
      },
      freeCompany: {},
      minions: [],
      mounts: []
    }
  },
  getters: {
    mounts: ({ mounts }) => mounts,
    dataCenters: ({ dataCenters }) => dataCenters,
    dataCenterKeys: ({ dataCenterKeys }) => dataCenterKeys,
    character: ({ character }) => character
  },
  mutations: {
    setMounts: (state, mounts) => (state.mounts = mounts),
    setDataCenters: (state, dataCenters) => (state.dataCenters = dataCenters),
    setDataCenterKeys: (state, dataCenterKeys) => (state.dataCenterKeys = dataCenterKeys),
    setCharacter: (state, character) => (state.character = character)
  },
  actions: {
    async fetchMounts({ commit }) {
      try {
        const { results } = await xiv.data.list('mount', { limit: 300 });
        const mounts = results.filter(({ name }) => name);

        commit('setMounts', mounts);
      } catch (err) {
        console.error(err);
      }
    },
    async fetchDataCentersAndServers({ commit }) {
      try {
        const res = await xiv.data.datacenters();
        const dataCenters = Object.keys(res).map(key => key);

        commit('setDataCenterKeys', dataCenters);
        commit('setDataCenters', res);
      } catch (err) {
        console.error(err);
      }
    },
    async validateCharacter({ commit, dispatch, state, rootState }, { name, server }) {
      dispatch('setIsLoading', true, { root: true });

      const user = await usersCollection.doc(rootState.firebase.userProfile.uid).get();

      // ? not sure if we need this logic. validateCharacter runs on
      // ? form submit so once data is stored in firebase the form would be used again
      if (user.data().character) {
        console.log('fetching character from firebase');
        const characterProfile = user.data().character;

        commit('setCharacter', characterProfile);
      } else {
        try {
          const { results } = await xiv.character.search(name, { server });
          const characterId = results[0].id;

          const { character: profile, mounts, ...rest } = await xiv.character.get(characterId, {
            extended: true,
            data: 'AC,MIMO,CJ,FC,'
          });

          // TODO: This is hard coded in my lodestone profile currently for testing purposes
          const isValid = profile.bio === user.data().characterLinkID;

          if (!isValid) {
            dispatch('setIsLoading', false, { root: true });
            return;
          }

          const characterProfile = { profile, mounts, ...rest };
          await usersCollection.doc(rootState.firebase.userProfile.uid).set(
            {
              character: {
                ...characterProfile
              }
            },
            { merge: true }
          );
          dispatch(
            'firebase/setUserProfile',
            {
              ...rootState.firebase.userProfile,
              character: { ...characterProfile }
            },
            { root: true }
          );

          commit('setCharacter', characterProfile);
        } catch (err) {
          console.error(err);
          dispatch('setIsLoading', false, { root: true });
        }
      }
    },
    async fetchCharacterById({ commit }, id) {
      try {
        const { character } = await xiv.character.get(id);

        commit('setCharacter', character);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
