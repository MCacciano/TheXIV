<template>
  <div class="w-screen h-screen flex justify-center items-center bg-gray-200">
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
  methods: {
    login() {
      console.log({
        email: this.loginForm.email,
        password: this.loginForm.password
      });
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
