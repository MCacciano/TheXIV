import Vue from 'vue';
import VueRouter from 'vue-router';

import { auth } from '../firebase';

import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isLoginPage: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const isLoginPage = to.matched.some(x => x.meta.isLoginPage);

  if (requiresAuth) {
    if (!auth.currentUser) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    if (isLoginPage) {
      if (auth.currentUser) {
        next({ name: 'Dashboard' });
      } else {
        next();
      }
    }
    next();
  }
});

export default router;
