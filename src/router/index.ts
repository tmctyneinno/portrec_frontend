/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/General/LandingPage/_landingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LandingPage
    },
    {
      path: '/about-us',
      name: 'About Us',
      component: () => import('../views/General/About.vue')
    },
    {
      path: '/find-jobs',
      name: 'Find Jobs',
      component: () => import('../views/General/FindJobs.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/General/Login.vue')
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: () => import('../views/General/Signup.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/PageNotFound.vue')
    },
  ]
})

router.afterEach((to, from) => {
  document.title = "PORTREC | " + to.name?.toString()
})

export default router
