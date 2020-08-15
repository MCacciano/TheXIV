import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faColumns, faHorse, faIdCard, faJedi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';

import { auth } from './firebase';

import '@/assets/css/tailwind.css';

library.add(faColumns, faHorse, faIdCard, faJedi);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
