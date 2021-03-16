import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Main from "../views/Main";
import FullViewPage from "../views/FullViewPage/FullViewPage";
import NotFound from "../views/FullViewPage/NotFound";
Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
    ]
  },
  {
    path: '',
    name: 'FullViewPage',
    component: FullViewPage,
    children: [
      {
        path: '/about',
        name: 'About',
        component: function () {
          return import('../views/About.vue')
        }
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/error/404',
        name: 'NotFound',
        component: NotFound
      }
    ]
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
  const publicPages = ["/login","/about"];
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
