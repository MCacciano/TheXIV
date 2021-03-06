import XIVAPI from 'xivapi-js';

import { usersCollection, seedAllMounts } from '../../../firebase';

const xiv = new XIVAPI({
  private_key: process.env.VUE_APP_XIV_API_KEY,
  language: 'en',
  snake_case: true
});

export default {
  namespaced: true,
  state: {
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
    dataCenters: ({ dataCenters }) => dataCenters,
    dataCenterKeys: ({ dataCenterKeys }) => dataCenterKeys,
    character: ({ character }) => character
  },
  mutations: {
    setDataCenters: (state, dataCenters) => (state.dataCenters = dataCenters),
    setDataCenterKeys: (state, dataCenterKeys) => (state.dataCenterKeys = dataCenterKeys),
    setCharacter: (state, character) => (state.character = character)
  },
  actions: {
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
      // ? form submit so once data is stored in firebase the form would never be used again
      if (user.data().character) {
        const characterProfile = user.data().character;

        commit('setCharacter', characterProfile);
      } else {
        try {
          const { results } = await xiv.character.search(name, { server });
          const characterId = results[0].id;

          const { character: simpleProfile } = await xiv.character.get(characterId);

          const isValid = simpleProfile.bio === user.data().characterLinkID;

          if (!isValid) {
            dispatch('setIsLoading', false, { root: true });
            return;
          }

          const { character, ...extendedProfile } = await xiv.character.get(characterId, {
            extended: 1,
            data: 'AC,MIMO,CJ,FC,'
          });

          const characterProfile = { profile: character, ...extendedProfile };
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
          dispatch('setIsLoading', false, { root: true });
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
