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
          <!-- <li v-if="route.path != `/search-talent`" class="nav-item mx-4"> -->
          <li class="nav-item mx-4">
            <div class="dropdown">
              <button ref="dropdownToggler" class="nav-link dropdown-toggle" type="button" id="triggerId"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                For Company
                <i class="bi bi-chevron-down"></i>
              </button>
              <div class="dropdown-menu animate__animated animate__zoomIn animate__faster" aria-labelledby="triggerId">
                <span @click="goToTalentPage(id, title)" v-for="{ title, id } in talentsList" :key="id"
                  class="dropdown-item hover-tiltX cursor-pointer">
                  Hire {{ title }}
                </span>
              </div>
            </div>

          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/for-talent">For Talent</router-link>
          </li> -->
          <li v-for="({ title, routePath }, i) in templateStore.navBarMenus" :key="i" class="nav-item ">
            <router-link class="nav-link me-2 " :class="{ 'text-white': route.path == '/' && !headerDropped }"
              :to="routePath">
              {{ title }}
            </router-link>
          </li>
        </ul>
        <div class="d-flex">
          <router-link class="nav-link mx-4 p-1" to="/auth/login">Login</router-link>
          <router-link style="color: #fff !important;" to="/auth/signup" class="btn btn-primary m- nav-link  p-1 px-3">
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
import { useRoute, useRouter } from 'vue-router';
import { useJobsStore } from '@/stores/jobsStore';

const jobsStore = useJobsStore()

const templateStore = useTemplateStore()
const headerDropped = ref<boolean>(false)
const route = useRoute()
const router = useRouter()

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
  getIndustries()
})


// Search Talent - for company #### START

const jobCategories = ref<any[]>([])

async function getIndustries() {
  await jobsStore.getJobCategories()
  jobCategories.value = jobsStore.categories
}

const titleMapping: any = {
  design: "Designers",
  sales: "Salespeople",
  marketing: "Marketers",
  business: "Business Experts",
  "Product & Project Management": "Project Managers",
  "Software & Data": "Software Engineers",
};


const talentsList = computed(() => {
  const mapped = jobCategories.value.map((cate: { name: string, id: number }) => ({
    title: titleMapping[cate.name] || null,
    id: cate.id
  }))
  return mapped.filter(x => x.title != null)
})


const dropdownToggler = ref<any>(null)

function goToTalentPage(ref: number, tag: string) {
  dropdownToggler.value?.click()
  router.push({
    path: `/search-talent`,
    query: {
      ref: ref,
      tag: tag,
      tm: new Date().getTime()
    }
  })
  // window.location.reload()
}


// Search Talent - for company #### END

</script>

<style scoped>
.navbar-nav .nav-link.active,
.navbar-nav .nav-link.show {
  color: var(--theme-color) !important;
  /* font-weight: bolder; */
  border-bottom: 1px solid var(--theme-color) !important;
}

.navbar-nav .nav-link {
  transition: all ease-in-out 0.4s;
}

.navbar-nav .nav-link:hover {
  color: #000 !important;
  transform: translateY(-5px);
}

.dropdown-toggle::after {
  content: none !important;
}

.dropdown:hover .dropdown-menu {
  display: block;
  min-height: 150px;
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
