<template>
  <div style="margin-top: -4rem;" class="h-screen flex justify-center items-center bg-gray-200">
    <LoginForm v-if="showLoginForm" />
    <SignUpForm v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { auth } from '@/firebase';

import LoginForm from '@/components/LoginForm';
import SignUpForm from '@/components/SignUpForm';

export default {
  name: 'Login',
  components: {
    LoginForm,
    SignUpForm
  },
  computed: {
    ...mapGetters('firebase', ['userProfile', 'showLoginForm'])
  }
};
</script>

<style lang="scss" scoped></style>
