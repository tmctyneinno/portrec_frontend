
import { createRouter, createWebHistory } from 'vue-router'
import public_routes from './public_routes'
import account_routes from './account_routes'
import auth_routes from './auth_routes'
import password_routes from './password_routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // scroll to top except for Find-Jobs route
    if (router.currentRoute.value.name != 'Find Jobs')
      return {
        top: 0,
        behavior: 'smooth',
      }
  },
  linkActiveClass: 'active',
  routes: [
    ...public_routes,
    ...account_routes,
    ...auth_routes,
    ...password_routes,
  ]
})

router.afterEach((to, from) => {
  document.title = "PORTREC RESOURCING | " + to.name?.toString()
})

export default router
