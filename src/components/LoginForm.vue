<template>
  <form
    class="flex flex-col w-full max-w-md bg-white border border-gray-500 rounded shadow p-4"
    @submit.prevent
  >
    <div class="flex justify-center">
      <h1 class="text-2xl font-medium">Login</h1>
    </div>
    <TextInput label="Email" v-model.trim="loginForm.email" id="email" placeholder="Enter email" />
    <TextInput
      label="Password"
      v-model.trim="loginForm.password"
      id="password"
      placeholder="Enter password"
    />
    <button
      class="border border-blue-700 text-blue-700 font-semibold hover:bg-blue-700 hover:text-white px-2 py-1 my-2 rounded shadow"
      @click="login"
    >
      Log In
    </button>
    <div class="flex justify-between items-center my-2">
      <span>Alread have an account?</span>
      <a class="cursor-pointer text-sm font-thin text-blue-700" @click="toggleForm">
        Create an Account
      </a>
    </div>
  </form>
</template>

<script>
import TextInput from '@/components/TextInput';

export default {
  name: 'LoginForm',
  components: {
    TextInput
  },
  props: {
    loginForm: {
      type: Object,
      required: false
    },
    login: {
      type: Function,
      required: false
    },
    toggleForm: {
      type: Function,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped></style>
