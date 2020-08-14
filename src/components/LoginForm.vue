<template>
  <form
    class="flex flex-col w-full max-w-md bg-white border border-gray-500 rounded shadow p-4 mx-2"
    @submit.prevent
  >
    <div class="flex justify-center">
      <h1 class="text-2xl font-medium">Login</h1>
    </div>
    <TextInput label="Email" v-model.trim="loginForm.email" id="email" placeholder="Enter email" />
    <TextInput
      type="password"
      label="Password"
      v-model.trim="loginForm.password"
      id="password"
      placeholder="Enter password"
    />
    <div class="flex flex-col">
      <button
        class="border border-blue-700 text-blue-700 font-semibold hover:bg-blue-700 hover:text-white px-2 py-1 my-2 rounded shadow"
        @click="login(loginForm)"
      >
        Log In
      </button>
      <button
        class="border border-red-700 text-red-700 font-semibold hover:bg-red-700 hover:text-white px-2 py-1 my-2 rounded shadow"
        @click="loginWithGoogle"
      >
        Log In With Google
      </button>
    </div>
    <div class="flex justify-between items-center my-2">
      <span>Need an account?</span>
      <a class="cursor-pointer text-sm font-light text-blue-700" @click="toggleForm">
        Sign Up
      </a>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TextInput from '@/components/TextInput';

export default {
  name: 'LoginForm',
  components: {
    TextInput
  },
  computed: {
    ...mapGetters('firebase', ['loginForm'])
  },
  methods: {
    ...mapActions('firebase', ['loginWithGoogle', 'toggleForm', 'login'])
  }
};
</script>

<style lang="scss" scoped></style>
