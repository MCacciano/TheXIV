<template>
  <div>
    <button @click="showModal = true">Link Your Account</button>
    <modal :showModal="showModal" @close="showModal = false">
      <LinkAccountForm slot="body" />
    </modal>
    <div class="w-full" v-if="userProfile.character">
      <ul class="flex flex-wrap">
        <li v-for="mount in userProfile.character.mounts" :key="mount.id">
          <img :src="mount.icon" />
        </li>
      </ul>
    </div>
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
