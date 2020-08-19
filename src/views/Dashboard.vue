<template>
  <div class="h-full" v-if="userProfile">
    <div class="flex justify-center items-center h-full" v-if="!character">
      <button
        class="bg-blue-700 hover:bg-blue-600 border border-black rounded shadow px-2 py-1 text-white font-medium text-lg focus:outline-none"
        @click="showModal = true"
      >
        Link Your FFXIV Character Data
      </button>
    </div>
    <div class="w-full" v-else>
      <div class="flex justify-between leading-snug">
        <h1 class="flex flex-col text-2xl font-semibold">
          <span>{{ character.profile.name }}</span>
          <small class="text-sm md:text-base font-light font-rubik"
            >({{ character.profile.title.name }})</small
          >
        </h1>
        <h2 class="text-2xl font-semibold">{{ character.profile.server }}</h2>
      </div>
      <div class="w-full h-px bg-black my-2"></div>
      <div class="mt-5">
        <div class="my-10 border border-black rounded shadow p-2">
          <h2 class="text-xl font-medium my-1 font-rubik">Mounts</h2>
          <ul class="grid grid-flow-row grid-cols-8 md:grid-cols-12 gap-2">
            <li v-for="mount in character.mounts" :key="mount.id">
              <img :src="mount.icon" />
            </li>
          </ul>
        </div>
        <div class="my-10 border border-black rounded shadow p-2">
          <h2 class="text-xl font-medium my-1 font-rubik">Minions</h2>
          <ul class="grid grid-flow-row grid-cols-8 md:grid-cols-12 gap-2">
            <li v-for="minion in character.minions" :key="minion.id">
              <img :src="minion.icon" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <modal :showModal="showModal" @close="showModal = false" v-if="!character">
      <LinkAccountForm slot="body" />
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import LinkAccountForm from '@/components/LinkAccountForm';

export default {
  name: 'Dashboard',
  components: {
    LinkAccountForm
  },
  data() {
    return {
      forename: '',
      surname: '',
      chosenServer: '',
      results: [],
      showModal: false
    };
  },
  computed: {
    ...mapGetters('firebase', ['userProfile']),
    character() {
      return this.userProfile && this.userProfile.character && this.userProfile.character;
    }
  },
  methods: {
    ...mapActions('xivapi', ['fetchDataCentersAndServers'])
  },
  created() {
    this.fetchDataCentersAndServers();
  }
};
</script>

<style lang="scss" scoped></style>
