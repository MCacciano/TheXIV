<template>
  <div id="app">
    <header class="sticky top-0 flex justify-center w-full bg-blue-700 h-16 z-50">
      <nav class="w-full max-w-screen-md flex justify-between items-center px-4">
        <h1 class="text-2xl font-semibold text-white">RaidTime</h1>
        <ul>
          <!-- <li v-if="userProfile"> -->
          <li>
            <button type="button" class="text-white font-semibold" @click="signOut">
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    ...mapActions(['signOut'])
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
