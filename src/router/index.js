import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import { auth } from '../firebase';

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
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
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
      next('/login');
    } else {
      next();
    }
  } else {
    if (isLoginPage) {
      if (auth.currentUser) {
        next('/');
      } else {
        next();
      }
    }
    next();
  }
});

export default router;
