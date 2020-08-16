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
    servers: [],
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
    servers: ({ servers }) => servers,
    character: ({ character }) => character
  },
  mutations: {
    setMounts: (state, mounts) => (state.mounts = mounts),
    setServers: (state, servers) => (state.servers = servers),
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
    async fetchServers({ commit }) {
      try {
        const res = await xiv.data.servers();

        commit('setServers', res);
      } catch (err) {
        console.error(err);
      }
    },
    async validateCharacter({ commit, dispatch, state, rootState }, { name, server }) {
      // const cachedCharacter = localStorage.getItem('xivCharacterProfile');
      const user = await usersCollection.doc(rootState.firebase.userProfile.uid).get();

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
          const isValid = profile.bio === 'be17cca6fe';

          if (!isValid) return;

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
            { ...rootState.firebase.userProfile, character: { ...characterProfile } },
            { root: true }
          );

          // localStorage.setItem('xivCharacterProfile', JSON.stringify(characterProfile));

          commit('setCharacter', characterProfile);
        } catch (err) {
          console.error(err);
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
