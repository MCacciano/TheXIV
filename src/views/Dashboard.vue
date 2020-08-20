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
        <h1 class="flex flex-col md:flex-row md:items-center text-2xl font-semibold">
          <span>{{ character.profile.name }}</span>
          <small class="text-sm md:text-base md:pt-2 md:pl-2 font-light font-rubik">
            {{ character.profile.title.name }}
          </small>
        </h1>
        <h2 class="text-2xl font-semibold">{{ character.profile.server }}</h2>
      </div>
      <div class="w-full h-px bg-black my-2"></div>
      <div class="mt-5">
        <div class="flex flex-col md:flex-row items-center justify-between max-w-full">
          <div class="flex flex-col items-center my-4">
            <h2 class="text-xl font-medium my-1 font-rubik">Mounts</h2>
            <PieGraph
              :height="300"
              :width:="300"
              :total="allMounts"
              :chartData="character.mounts"
            />
          </div>
          <div class="flex flex-col items-center my-4">
            <h2 class="text-xl font-medium my-1 font-rubik">Minions</h2>
            <PieGraph
              :height="300"
              :width="300"
              :total="allMinions"
              :chartData="character.minions"
            />
          </div>
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
import PieGraph from '@/components/PieGraph';

export default {
  name: 'Dashboard',
  components: {
    LinkAccountForm,
    PieGraph
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
    ...mapGetters('firebase', ['userProfile', 'allMounts', 'allMinions']),
    character() {
      return this.userProfile && this.userProfile.character && this.userProfile.character;
    }
  },
  methods: {
    ...mapActions('xivapi', ['fetchDataCentersAndServers']),
    ...mapActions('firebase', ['fetchAllMounts', 'fetchAllMinions'])
  },
  async created() {
    this.fetchAllMounts();
    this.fetchAllMinions();
    this.fetchDataCentersAndServers();
  }
};
</script>

<style lang="scss" scoped></style>
