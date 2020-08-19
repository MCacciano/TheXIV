<template>
  <div class="relative min-h-screen">
    <Navigation v-if="userProfile" />
    <div :class="[userProfile ? 'px-10 py-5 md:pl-40 md:pr-10 h-0 min-h-screen' : '']">
      <router-view />
    </div>
  </div>
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
      unsub: null
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
        try {
          const userRef = await createUserDocument(authUser);

          // await userRef.onSnapshot(snapShot => this.setUserProfile(snapShot.data()));
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
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
