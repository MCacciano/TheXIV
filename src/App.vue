<template>
  <pre-loader v-if="!$route.meta.isLoginPage && !userLoaded" />
  <transition name="user-loaded" v-else>
    <div class="relative min-h-screen h-0">
      <Navigation v-show="!$route.meta.isLoginPage" />
      <div :class="[userProfile ? 'm-10' : '']">
        <transition name="route-change">
          <router-view />
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { auth, createUserDocument } from './firebase';

import Navigation from '@/components/Navigation';

export default {
  name: 'App',
  components: {
    Navigation
  },
  data() {
    return {
      unsub: null,
      userLoaded: false
    };
  },
  computed: {
    ...mapGetters('firebase', ['userProfile'])
  },
  methods: {
    ...mapActions('firebase', ['logout', 'setUserProfile'])
  },
  created() {
    auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        this.userLoaded = true;

        try {
          const userRef = await createUserDocument(authUser);

          await userRef.onSnapshot(snapShot => {
            if (snapShot.exists) {
              this.setUserProfile(snapShot.data());
            } else {
              this.setUserProfile(snapShot);
            }
          });
        } catch (err) {
          console.error(err);
        }
      } else {
        this.setUserProfile(authUser);
      }
    });
  }
};
</script>

<style lang="scss">
.user-loaded-enter-active,
.user-loaded-leave-active {
  transition: opacity 0.5s;
}
.user-loaded-enter,
.user-loaded-leave-to {
  opacity: 0;
}

.route-change-enter-active,
.route-change-leave-active {
  transition: opacity 0.5s;
}
.route-change-enter,
.route-change-leave-to {
  opacity: 0;
}
</style>
