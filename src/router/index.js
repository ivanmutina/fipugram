import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      needsUser: true,
    }
  },
  {
    path: '/Login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/Signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// poziva se prije promjene svake rute
// pogleda gdje smo i gdje idemo i next se pokrece ako dozvolimo
router.beforeEach( (to, from, next) => {
  console.log("Stara ruta:", from.name, "Nova ruta:", to.name, "korisnik", store)
  
  // ako je current user null, vraca true
  const noUser = store.currentUser === null;

  if(noUser && to.meta.needsUser){
    next("Login");
  }else {
    next();
  }

})

export default router
