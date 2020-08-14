<template>
  <form
    class="flex flex-col w-full max-w-md bg-white border border-gray-500 rounded shadow p-2"
    @submit.prevent
  >
    <div class="flex justify-center">
      <h1 class="text-2xl font-medium">Sign Up</h1>
    </div>
    <TextInput
      label="Name"
      v-model.trim="signUpForm.displayName"
      id="name"
      placeholder="Enter name"
    />
    <TextInput
      label="Email"
      v-model.trim="signUpForm.email"
      id="email2"
      placeholder="Enter email"
    />
    <TextInput
      label="Password"
      v-model.trim="signUpForm.password"
      id="password2"
      placeholder="Enter password"
    />
    <div class="flex flex-col">
      <button
        class="border border-blue-700 text-blue-700 font-semibold hover:bg-blue-700 hover:text-white px-2 py-1 my-2 rounded shadow"
        @click="signUp(signUpForm)"
      >
        Sign Up
      </button>
      <button
        class="border border-red-700 text-red-700 font-semibold hover:bg-red-700 hover:text-white px-2 py-1 my-2 rounded shadow"
        @click="loginWithGoogle"
      >
        Sign Up With Google
      </button>
    </div>

    <div class="flex justify-between items-center my-2">
      Alread have an account?
      <a class="cursor-pointer text-sm font-semibold text-blue-700" @click="toggleForm">
        Log In
      </a>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import TextInput from '@/components/TextInput';

export default {
  name: 'SignUpForm',
  components: {
    TextInput
  },
  computed: {
    ...mapGetters('firebase', ['signUpForm'])
  },
  methods: {
    ...mapActions('firebase', ['toggleForm', 'signUp', 'loginWithGoogle'])
  }
};
</script>

<style lang="scss" scoped></style>
