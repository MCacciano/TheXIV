import XIVAPI from 'xivapi-js';

const xiv = new XIVAPI({
  private_key: process.env.VUE_APP_XIV_API_KEY,
  language: 'en',
  snake_case: true
});

export default {
  namespaced: true,
  state: {
    mounts: []
  },
  getters: {
    mounts: ({ mounts }) => mounts
  },
  mutations: {
    setMounts: (state, mounts) => (state.mounts = mounts)
  },
  actions: {
    async fetchMounts({ commit }) {
      try {
        const { results } = await xiv.data.list('mount');
        const mounts = results.filter(({ name }) => name);
        console.log('mounts :>> ', mounts);

        commit('setMounts', mounts);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
