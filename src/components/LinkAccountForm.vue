<template>
  <div>
    <modal :showModal="isLoading">
      <spinner slot="body" />
    </modal>
    <form class="flex flex-col border rounded p-3 border-gray-500" @sumbit.prevent>
      <template>
        <label for="forename" class="flex my-2">
          <span class="font-light pr-3">Forename</span>
          <input
            v-model="accountLinkForm.forename"
            id="forename"
            class="bg-gray-200 p-1 focus:bg-white flex-grow mx-2 border border-gray-500 rounded"
          />
        </label>
        <label for="surname" class="flex my-2">
          <span class="font-light pr-5">Surname</span>
          <input
            v-model="accountLinkForm.surname"
            id="surname"
            class="bg-gray-200 p-1 focus:bg-white flex-grow mx-2 border border-gray-500 rounded"
          />
        </label>
        <div class="flex justify-center items-center my-2">
          <label for="server" class="my-2 flex-1 px-4">
            <select
              class="bg-gray-200 p-1 focus:bg-white w-full border border-gray-500"
              name="server"
              v-model="accountLinkForm.chosenServer"
            >
              <option class="font-thin" disabled value="">Server</option>
              <optgroup v-for="(dataCenter, i) in dataCenterKeys" :key="i" :label="dataCenter">
                <option v-for="server in dataCenters[dataCenter]" :key="server.id">
                  {{ server }}
                </option>
              </optgroup>
            </select>
          </label>
          <div class="flex-1 px-4">
            <button
              type="button"
              @click="handleOnSubmit"
              class="bg-blue-700 hover:bg-blue-800 text-white px-2 py-1 font-normal w-full"
              :class="[dirty ? 'opacity-50 cursor-not-allowed' : '']"
              :disabled="dirty"
            >
              Submit
            </button>
          </div>
        </div>
        <div class="flex flex-col font-medium whitespace-wrap break-words">
          <small class="text-red-700">
            <span>
              <fa-icon :icon="['fas', 'exclamation-circle']" size="sm" />
            </span>
            Paste this id number into your lodestone character profile before submitting this form.
          </small>

          <p class="text-lg py-1">
            <span class="font-semibold">ID:&nbsp;</span>
            <span class="text-sm font-medium">{{ userProfile.characterLinkID }}</span>
          </p>
        </div>
      </template>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LinkAccountForm',
  data() {
    return {
      accountLinkForm: {
        forename: '',
        surname: '',
        chosenServer: ''
      },
      showModal: false
    };
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('xivapi', ['dataCenters', 'dataCenterKeys']),
    ...mapGetters('firebase', ['userProfile']),
    dirty() {
      const { forename, surname, chosenServer } = this.accountLinkForm;

      return forename === '' || surname === '' || chosenServer === '';
    }
  },
  methods: {
    ...mapActions(['setIsLoading']),
    ...mapActions('xivapi', ['fetchDataCentersAndServers', 'validateCharacter']),

    handleOnSubmit(e) {
      const { forename, surname, chosenServer } = this.accountLinkForm;

      if (this.dirty) return;

      this.validateCharacter({
        name: `${forename.toLowerCase()}+${surname.toLowerCase()}`,
        server: chosenServer
      });
    }
  },
  created() {
    console.log(this.$store);
    this.fetchDataCentersAndServers();
  }
};
</script>
