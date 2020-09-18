<template>
  <nav class="flex py-1 px-10 justify-between w-full bg-blue-800 border-b border-black z-50">
    <template v-if="userProfile">
      <div class="flex justify-between item-cemter mx-auto w-full max-w-screen-lg">
        <router-link id="logo" class="flex text-3xl justify-center items-center font-rubik" to="/">
          <span class="font-normal text-white">The</span>
          <span class="font-semibold text-red-700">XIV</span>
        </router-link>
        <ul class="flex items-center">
          <router-link id="portrait" to="/" class="block w-10 h-10 mx-2 bg-blue-800 border-black">
            <transition name="fade">
              <img
                @load="onLoad"
                v-show="loaded"
                :src="
                  characterLinked
                    ? userProfile.character.profile.portrait
                    : require('@/assets/images/default-user.png')
                "
                class="w-full max-h-full rounded-full object-cover"
              />
            </transition>
          </router-link>
          <li class="mx-2">
            <button
              type="button"
              class="flex items-center justify-center h-full w-full text-white font-light "
              to="/"
              @click="logout"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </template>
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
      loaded: false,
      links: [
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
    },
    characterLinked() {
      return this.userProfile && this.userProfile.character;
    }
  },
  methods: {
    ...mapActions('firebase', ['logout']),
    ...mapActions('xivapi', ['fetchCharacterById']),
    onLoad() {
      this.loaded = true;
    }
  }
};

/**
 * <div>
        <div class="hidden md:block">
          <router-link
            id="logo"
            class="flex p-2 text-lg justify-center items-center h-8 border-b border-black font-rubik"
            to="/"
          >
            <span class="font-normal text-white">The</span>
            <!-- <span class="font-normal text-white pb-1">_</span> -->
            <span class="font-semibold text-red-700">XIV</span>
          </router-link>
        </div>
        <router-link
          id="portrait"
          to="/"
          class="relative block w-16 h-16 bg-blue-800 border-black md:w-full md:h-48 md:border-b"
        >
          <transition name="fade">
            <img
              @load="onLoad"
              v-show="loaded"
              :src="
                characterLinked
                  ? userProfile.character.profile.portrait
                  : require('@/assets/images/default-user.png')
              "
              class="w-full max-h-full md:min-h-full md:p-0 p-1 rounded-full md:rounded-none md:w-full object-cover"
            />
          </transition>
        </router-link>
      </div>
      <ul class="flex md:flex-col md:h-full content-start flex-grow">
        <li v-for="(link, i) in links" :key="i" class="flex-1 md:flex-none">
          <router-link
            :to="link.to"
            class="relative flex justify-center items-center h-full md:border-b border-black text-white hover:bg-white hover:text-gray-500"
            :class="[
              link.to !== '/' ? 'md:py-4 border-l md:border-l-0' : '',
              currentPage.includes(link.to) ? 'text-blue-800' : ''
            ]"
          >
            <fa-icon :icon="link.icon" size="2x" class="fill-current col-span-2" />
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
 */
</script>

<style lang="scss" scoped>
.router-link-exact-active:not(#logo):not(#portrait) {
  background-color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
