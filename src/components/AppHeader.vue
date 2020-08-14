<template>
  <header class="sticky top-0 flex justify-center w-full bg-blue-700 h-16 z-50">
    <nav class="w-full max-w-screen-lg flex justify-between items-center px-4">
      <h1 class="text-2xl text-white flex">
        <span class="font-semibol">Raid</span>
        <span class="font-thin">Time</span>
      </h1>
      <ul class="flex">
        <template v-if="userProfile">
          <li class="text-white font-light text-lg px-2">
            <router-link to="/">{{ userProfile.displayName || userProfile.email }}</router-link>
          </li>
          <li class=" px-2">
            <button type="button" class="text-white font-medium text-lg" @click="logout">
              Logout
            </button>
          </li>
        </template>
        <li v-else>
          <button
            type="button"
            class="text-white font-semibold"
            @click="$router.push({ name: 'Login' })"
          >
            Login
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { auth } from '../firebase';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  created() {
    // without this userProfile is null when refreshing the page
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.$store.commit('firebase/setUserProfile', authUser);
      } else {
        this.$store.commit('firebase/setUserProfile', null);
      }
    });
  },
  computed: {
    ...mapGetters('firebase', ['userProfile'])
  },
  methods: {
    ...mapActions('firebase', ['logout'])
  }
};
</script>
