import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from "../views/Main";
import NotFound from "../views/FullViewPage/NotFound";
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Main,
    children: [
          {
            path: '/',
            name: 'Home',
            component: function () {
              return import('../views/Home.vue')
            }
          },
          {
            path: '/about',
            name: 'About',
            component: function () {
              return import('../views/About.vue')
            }
          },
          {
            path: '/error/404',
            name: 'NotFound',
            component: NotFound
          }
        ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    redirect: '/error/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router

router.beforeEach((to, from, next) => {
  const session = localStorage.getItem("user");
  const publicPages = ["/login"];
  const notPublicPages = !publicPages.includes(to.path);
  let logged = false;
  if (session) {
    logged = true;
  }
  if (logged && !notPublicPages) {
    next("/");
  } else if (!logged && notPublicPages) {
    next("/login");
  } else {
    next();
  }
});
