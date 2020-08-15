<template>
  <nav
    class="fixed bottom-0 w-full bg-blue-800 border-t border-black md:h-full md:min-h-screen md:w-32 md:border-r z-50"
  >
    <ul class="grid grid-cols-9 md:flex md:flex-col md:h-full content-start">
      <!-- <ul class="flex justify-evenly md:flex-col md:justify-start md:h-full"> -->
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
      <li v-for="(link, i) in links" :key="i" class="col-span-2">
        <router-link
          :to="link.to"
          class="flex justify-center items-center h-full md:border-b border-black text-white hover:bg-white hover:text-gray-500"
          :class="[
            link.to !== '/' ? 'md:py-4 border-l md:border-l-0' : '',
            currentPage.includes(link.to) ? 'text-blue-800' : ''
          ]"
        >
          <img
            :src="require('@/assets/images/default-user.png')"
            v-if="link.image"
            class="w-12 h-12 m-1 object-fit rounded-full fill-current md:w-18 md:h-18"
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
import { mapActions } from 'vuex';

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
          image: '../assets/images/default-user.png'
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
    currentPage() {
      return this.$route.fullPath;
    },
    isDashboard() {
      return this.$route.name.toLowerCase() === 'dashboard';
    }
  },
  methods: {
    ...mapActions('firebase', ['logout'])
  }
};
</script>

<style lang="scss" scoped>
.router-link-exact-active:not(#logo) {
  background-color: #fff;
}
</style>
