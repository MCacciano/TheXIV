<template>
  <div class="relative min-h-screen">
    <Navigation />
    <div class="px-10 py-5 md:pl-40 md:pr-10 h-full min-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navigation from '@/components/Navigation';

export default {
  name: 'App',
  components: {
    Navigation
  },
  computed: {
    ...mapGetters('firebase', ['userProfile'])
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
