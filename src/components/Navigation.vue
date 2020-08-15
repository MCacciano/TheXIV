<template>
  <nav
    class="fixed bottom-0 w-full h-20 bg-gray-700 border-t border-black md:h-full md:min-h-screen md:w-32 md:border-r z-50"
  >
    <ul class="flex justify-evenly md:flex-col md:justify-start md:h-full">
      <li class="hidden md:block">
        <router-link
          class="flex p-2 text-xl justify-center items-center h-20 border-b border-black hover:bg-gray-800"
          to="/"
        >
          <span class="font-normal">XIV</span>
          <span class="pb-1 pl-px pr-px whitespace-pre text-red-700">|</span>
          <span class="font-semibold">Network</span>
        </router-link>
      </li>
      <li
        v-for="(link, i) in links"
        :key="i"
        class="w-1/4 md:w-auto"
        :class="[
          currentPage.includes(link.name) ? 'bg-gray-800' : '',
          i > 0 ? 'border-l md:border-none border-black' : ''
        ]"
      >
        <router-link
          :to="link.to"
          class="flex justify-center items-center h-full md:border-b border-black py-6 text-white hover:bg-white hover:text-gray-700"
        >
          <fa-icon :icon="link.icon" size="2x" class="fill-current" />
        </router-link>
      </li>
      <li class="md:mt-auto md:h-10">
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
          icon: 'id-card'
        },
        {
          name: 'mounts',
          to: '/mounts',
          icon: 'horse'
        },
        {
          name: 'jedi',
          to: '/jedi',
          icon: 'jedi'
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
      return this.$route.path;
    }
  },
  methods: {
    ...mapActions('firebase', ['logout'])
  }
};
</script>

<style lang="scss" scoped></style>
