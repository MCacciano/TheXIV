<template>
  <div class="h-full" v-if="userProfile">
    <div class="flex justify-center items-center h-full" v-if="!userProfile.character">
      <button
        class="bg-blue-700 hover:bg-blue-600 border border-black rounded shadow px-2 py-1 text-white font-medium text-lg focus:outline-none"
        @click="showModal = true"
      >
        Link Your FFXIV Character Data
      </button>
    </div>
    <div class="w-full" v-else>
      <ul class="flex flex-wrap">
        <li v-for="mount in userProfile.character.mounts" :key="mount.id">
          <img :src="mount.icon" />
        </li>
      </ul>
    </div>
    <modal :showModal="showModal" @close="showModal = false">
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
    ...mapGetters('firebase', ['userProfile'])
  },
  methods: {
    ...mapActions('xivapi', ['fetchServers', 'validateCharacter']),
    handleOnSubmit(e) {
      this.validateCharacter({
        name: `${this.forename}+${this.surname}`,
        server: this.chosenServer
      });
    }
  },
  created() {
    this.fetchServers();
  }
};
</script>

<style lang="scss" scoped></style>
