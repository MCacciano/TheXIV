<template>
  <nav
    class="fixed bottom-0 w-full bg-blue-800 border-t border-black md:h-full md:min-h-screen md:w-32 md:border-r z-50"
  >
    <ul class="flex md:flex-col md:h-full content-start">
      <li class="hidden md:block">
        <router-link
          id="logo"
          class="flex p-2 text-lg justify-center items-center h-8 border-b border-black"
          to="/"
        >
          <span class="font-normal text-white">The</span>
          <span class="font-normal text-white pb-1">_</span>
          <span class="font-semibold text-red-700">XIV</span>
        </router-link>
      </li>
      <li v-for="(link, i) in links" :key="i" class="flex-1 md:flex-none">
        <router-link
          :to="link.to"
          class="relative flex justify-center items-center h-full md:border-b border-black text-white hover:bg-white hover:text-gray-500"
          :class="[
            link.to !== '/' ? 'md:py-4 border-l md:border-l-0' : '',
            currentPage.includes(link.to) ? 'text-blue-800' : ''
          ]"
        >
          <img
            :src="userProfile.character.profile.portrait"
            v-if="!link.icon"
            class="w-16 h-16 p-1 rounded-full md:p-0 md:rounded-none md:w-full md:h-auto object-cover"
          />
          <fa-icon :icon="link.icon" size="2x" class="fill-current col-span-2" v-else />
        </router-link>
      </li>
      <li class="md:mt-auto md:h-10 col-span-1">
        <button
          type="button"
          class="flex items-center justify-center h-full w-full px-2 text-white font-light border-l md:border-l-0 md:border-t border-black"
          to="/"
          @click="logout"
        >
          Logout
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  data() {
    return {
      // TODO: currently "/" goes to Dashboard. This needs to be changed to handle multiple users
      // TODO: something like "/dashboard/:userId"
      links: [
        {
          name: 'dashboard',
          to: '/',
          image: ''
        },
        {
          name: 'mounts',
          to: '/mounts',
          icon: 'horse'
        },
        {
          name: 'users',
          to: '/users',
          icon: 'users'
        },
        {
          name: 'columns',
          to: '/columns',
          icon: 'columns'
        }
      ]
    };
  },
  computed: {
    ...mapGetters('xivapi', ['character']),
    ...mapGetters('firebase', ['userProfile']),
    currentPage() {
      return this.$route.path;
    },
    isDashboard() {
      return this.$route.name.toLowerCase() === 'dashboard';
    }
  },
  methods: {
    ...mapActions('firebase', ['logout']),
    ...mapActions('xivapi', ['fetchCharacterById'])
  }
};
</script>

<style lang="scss" scoped>
.router-link-exact-active:not(#logo) {
  background-color: #fff;
}
</style>
