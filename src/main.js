import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faColumns,
  faExclamationCircle,
  faHorse,
  faIdCard,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Modal from './components/Modal';
import Spinner from './components/Spinner';
import PreLoader from './components/PreLoader';

import App from './App.vue';
import router from './router';
import store from './store';

import { auth } from './firebase';

import '@/assets/css/tailwind.css';

library.add(faColumns, faExclamationCircle, faHorse, faIdCard, faUsers);

Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('modal', Modal);
Vue.component('spinner', Spinner);
Vue.component('pre-loader', PreLoader);

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
