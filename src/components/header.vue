<template>
  <nav class="navbar navbar-expand-lg fixed-top p-3 bg-white" :class="customClass">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="/images/site_logo.png" width="140" alt="site_logo">
      </router-link>
      <button class="navbar-toggler border-0" data-bs-toggle="offcanvas" data-bs-target="#menuOffcanvas"
        aria-controls="menuOffcanvas" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="route.path != `/search-talent`" class="nav-item mx-4">
            <div class="dropdown open">
              <a class="nav-link dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                For Company
                <i class="bi bi-chevron-down"></i>
              </a>
              <div class="dropdown-menu animate__animated animate__zoomIn animate__faster" aria-labelledby="triggerId">
                <router-link class="dropdown-item hover-tiltX" to="/search-talent">Hire Developers</router-link>
                <router-link class="dropdown-item hover-tiltX" to="/search-talent">Hire Designers</router-link>
                <router-link class="dropdown-item hover-tiltX" to="/search-talent">Hire Product Managers</router-link>
                <router-link class="dropdown-item hover-tiltX" to="/search-talent">Hire Project Managers</router-link>
                <router-link class="dropdown-item hover-tiltX" to="/search-talent">Hire Assistants</router-link>
              </div>
            </div>

          </li>
          <li class="nav-item">
            <router-link v-if="route.path != `/for-talent`" class="nav-link" to="/for-talent">For Talent</router-link>
          </li>
          <li v-for="({ title, routePath }, i) in templateStore.navBarMenus" :key="i" class="nav-item ">
            <router-link class="nav-link mx-4 " :class="{ 'text-white': route.path == '/' && !headerDropped }"
              :to="routePath">{{ title
              }}</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <router-link class="nav-link mx-4 p-1" to="/login">Login</router-link>
          <router-link style="color: #fff !important;" to="/signup" class="btn btn-primary m- nav-link  p-1 px-3">
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </nav>
  <mobileMenuVue />
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import mobileMenuVue from './mobileMenu.vue';
import { useTemplateStore } from '@/stores/templateStore';
import { useRoute } from 'vue-router';

const templateStore = useTemplateStore()
const headerDropped = ref<boolean>(false)
const route = useRoute()

const customClass = computed(() => ({
  // 'b': route.path !== '/',
  'bg-transparent text-white': !headerDropped.value && route.path == '/',
  'animate__animated animate__slideInDown animate__faster': headerDropped.value && route.path == '/',
  'shadow-sm': headerDropped.value || route.path !== '/'
}))

onMounted(() => {
  window.addEventListener("scroll", function () {
    const scrollThreshold = 50;
    if (window.scrollY > scrollThreshold)
      headerDropped.value = true;
    else
      headerDropped.value = false;
  })
})
</script>

<style scoped>
.navbar-nav .nav-link.active,
.navbar-nav .nav-link.show {
  color: var(--theme-color);
  /* font-weight: bolder; */
  /* border-bottom: 1px solid var(--theme-color); */
}

.dropdown-toggle::after {
  content: none !important;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-item:hover {
  color: var(--theme-color);
  background: transparent;
}

.dropdown-menu {
  --bs-dropdown-link-active-color: var(--bs-body-color);
  --bs-dropdown-link-active-bg: transparent;
}
</style>
