<template>
  <div class="relative min-h-screen">
    <Navigation v-if="userProfile" />
    <div :class="[userProfile ? 'px-10 py-5 md:pl-40 md:pr-10 h-full min-h-screen' : '']">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { auth } from './firebase';

import Navigation from '@/components/Navigation';

export default {
  name: 'App',
  components: {
    Navigation
  },
  computed: {
    ...mapGetters('firebase', ['userProfile'])
  },
  created() {
    // without this userProfile is null when refreshing the page
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.$store.commit('firebase/setUserProfile', authUser);
      } else {
        this.$store.commit('firebase/setUserProfile', null);
      }
    });
  }
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
