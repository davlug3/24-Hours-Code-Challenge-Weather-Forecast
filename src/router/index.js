import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import CityView from '../views/CityView.vue'
import NotFound from '../views/NotFound.vue'


import { useAuth0  } from '@auth0/auth0-vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound 
    },

    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/city/:city',
      name: 'city',
      component: CityView,
      meta: { requiresAuth : true}
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})



router.beforeEach((to, from) => {
  console.log("beforeEach")

  const auth0 = useAuth0();
  const { loginWithRedirect, user, isAuthenticated, isLoading } = auth0
  console.log("isLoading: ", isLoading.value);


  console.log("isAuthenticated: ", isAuthenticated.value);
  
  if (to.meta.requiresAuth && !isAuthenticated.value && to.name !== 'login') {
    console.log('di papunta login', to)
    console.log(auth0)
    return '/login'
  }
  if (isAuthenticated.value && to.name === 'login') return '/'
})
      


export default router




