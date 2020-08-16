<template>
  <div>
    <h1>Dashboard</h1>
    <form
      class="grid gap-2 md:flex justify-between border rounded p-1 border-gray-500"
      @sumbit.prevent
    >
      <label for="forename">
        Forename
        <input
          v-model="forename"
          id="forename"
          class="bg-gray-200 p-1 focus:bg-white"
        />
      </label>
      <label for="surname">
        Surname
        <input
          v-model="surname"
          id="surname"
          class="bg-gray-200 p-1 focus:bg-white"
        />
      </label>
      <select
        class="bg-gray-200 p-1 focus:bg-white"
        name="server"
        v-model="chosenServer"
      >
        <option disabled value="">Server</option>
        <optgroup
          v-for="(dataCenter, i) in dataCenterKeys"
          :label="dataCenter"
          :key="i"
          style="text-transform: capitalize;"
        >
          <option v-for="server in dataCenters[dataCenter]" :key="server">
            {{ server }}
          </option>
        </optgroup>
      </select>
      <button
        type="button"
        @click="handleOnSubmit"
        class="bg-blue-800 text-white px-2 py-1 font-light"
      >
        Submit
      </button>
    </form>
    <div class="w-full" v-if="userProfile.character">
      <ul class="flex flex-wrap">
        <li v-for="mount in userProfile.character.mounts" :key="mount.id">
          <img :src="mount.icon" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Dashboard',
  data() {
    return {
      forename: '',
      surname: '',
      chosenServer: '',
      results: [],
    };
  },
  computed: {
    ...mapGetters('xivapi', ['dataCenters', 'dataCenterKeys']),
    ...mapGetters('firebase', ['userProfile']),
  },
  methods: {
    ...mapActions('xivapi', [
      'fetchDataCentersAndServers',
      'validateCharacter',
    ]),
    handleOnSubmit(e) {
      this.validateCharacter({
        name: `${this.forename}+${this.surname}`,
        server: this.chosenServer,
      });
    },
  },
  created() {
    this.fetchDataCentersAndServers();
  },
};
</script>

<style lang="scss" scoped></style>
