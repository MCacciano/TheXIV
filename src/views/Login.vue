<template>
  <div style="margin-top: -4rem;" class="h-screen flex justify-center items-center bg-gray-200">
    <LoginForm
      v-if="showLoginForm"
      :loginForm="loginForm"
      :login="login"
      :toggleForm="toggleForm"
    />
    <SignUpForm v-else :signUpForm="signUpForm" :signUp="signUp" :toggleForm="toggleForm" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { auth } from '@/firebase';

import LoginForm from '@/components/LoginForm';
import SignUpForm from '@/components/SignUpForm';

export default {
  name: 'Login',
  components: {
    LoginForm,
    SignUpForm
  },
  data: () => ({
    showLoginForm: true,
    loginForm: {
      email: '',
      password: ''
    },
    signUpForm: {
      displayName: '',
      email: '',
      password: ''
    }
  }),
  computed: {
    ...mapState({
      userProfile: ({ userProfile }) => userProfile
    })
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      });
    },
    signUp() {
      this.$store.dispatch('signUp', {
        email: this.signUpForm.email,
        password: this.signUpForm.password,
        displayName: this.signUpForm.displayName
      });
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    }
  }
};
</script>

<style lang="scss" scoped></style>
