import {watch} from 'vue'
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
      component: LogoutView,
      meta: { requiresAuth : true}
    },
    {
      path: '/city/:city',
      name: 'city',
      component: CityView,
      meta: { requiresAuth : true}
    },

  ]
})



router.beforeEach(async (to, from) => {
  console.log("from: ",  from);
  console.log("to: ", to);

  const auth0 = useAuth0();
  const { isAuthenticated, isLoading } = auth0
  console.log("isLoading: ", isLoading.value);


  const canUserAccess = async () => {
  
    return new Promise ((resolve) => { 
      if (isLoading.value) {
        watch ([isLoading, isAuthenticated], (stateNew) => {
          if (!stateNew[0]) resolve(stateNew[1]) 
        })
      }
      else {
        resolve(isAuthenticated.value)
      }

    })
  }


  const canAcess = await canUserAccess()
  console.log("canAcess: ", canAcess);

  if (canAcess && to.meta.requiresAuth) {
    return true
  }

  
  if (canAcess && !to.meta.requiresAuth ) {

    if (to.name !== 'login') return "/login"
    else return "/"
  }

  if (!canAcess && !to.meta.requiresAuth) {
    return true
  }

  if (!canAcess && to.meta.requiresAuth) {
    return "/login"
  }

  console.log('passthrrou')
})


      


export default router




