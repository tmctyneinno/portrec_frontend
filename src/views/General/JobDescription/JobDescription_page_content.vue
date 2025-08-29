<template>
  <JobDescriptionSkeleton v-if="loading" />
  <!-- <overlayLoading v-if="loading" /> -->


  <div v-else class="animate__animated animate__fadeIn">


    <div class="section-panel section-panel-light py-3 py-md-4">
      <div class="container mb-5">
        <div class="row justify-content-center pt-5 g-3">

          <div class="col-md-12 col-sm-12 col-12 ">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <div class="row gy-3 align-items-center">

                  <div class="col-md-1 text-lg-center" :class="{ 'bg-light': !currentJob.image }">
                    <img v-if="currentJob?.image && !imageFallback" @error="imageFallback = true"
                      :src="currentJob.image" class="img-fluid" width="100" alt="_img">
                    <i v-if="!currentJob.image || imageFallback" class="bi bi-briefcase-fill theme-color"
                      style="font-size: 3.5rem;"></i>
                  </div>

                  <div class="col-md-7">
                    <h4 class="mb-0 fs-3 fw-bold text-capitalize">{{ currentJob.title }}</h4>
                    <div class="d-block mb-2 position-relative">
                      <div class="slide-info text-muted small text-capitalize">
                        <span class="text-muted xsmall">Posted by</span>
                        {{ currentJob.company?.name ?? '' }}
                        {{ `${currentJob.company?.country ?? ''}` }}
                        <i class="bi bi-dot"></i>
                        <span v-if="currentJob.job_type">
                          <i class="bi bi-briefcase ms-2"></i>
                          {{ currentJob.job_type?.name ?? '' }}
                        </span>
                        <span v-if="currentJob.job_mode">
                          ({{ currentJob.job_mode?.name ?? '' }})
                        </span>
                      </div>
                      <div class="xsmall fst-italic text-success-emphasis">
                        Posted <span class="fw-bolder">{{ useFunctions.timeAgo(currentJob.created_at) }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 my-3 ">
                    <div class="d-flex justify-content-end align-items-center">
                      <span @click="shareLink" class="line-right pe-4 me-3 cursor-pointer">
                        <i class="bi bi-share"></i>
                      </span>
                      <div v-if="hasPassedDeadline()">
                        <div class="small text-muted fst-italic text-center">No longer accepting candidates</div>
                        <primaryButton :disabled="true" className="w-100">
                          Apply
                        </primaryButton>
                      </div>
                      <span v-else>
                        <span v-if="hasAppliedForThisJob" class="text-warning small ">Already Applied</span>
                        <span v-else>
                          <span v-if="currentJob.job_url || currentJob.job_email">
                            <button v-if="currentJob.job_url" @click="visitExternalLink"
                              class="btn btn-primary rounded- px-3">Visit link</button>
                            <a v-if="currentJob.job_email"
                              :href="`mailto:${currentJob.job_email}?subject=Application for Job`"
                              class="btn btn-primary rounded- px-3">Apply now</a>
                          </span>
                          <button v-else @click="openApplyModal" class="btn btn-primary rounded- px-3">
                            Apply now</button>
                        </span>

                      </span>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="container bg-whit px-lg-5 py-5">
      <JobDescriptionInfoComponent :current-job="currentJob" />
    </div>

    <div v-if="similarJobs.length" class="section-panel min-vh-100 section-panel-light">
      <div class="container px-lg-5">
        <div class="col-12">
          <div class="row">
            <div class="col-8">
              <div class=" section-title">Similar Jobs</div>
            </div>
            <div class="col-4 d-flex justify-content-end align-items-center ">
              <router-link to="/find-jobs"
                class="hover-tiltX float-end theme-color cursor-pointer fw-bolder me-0 section-right">
                show all jobs <i class="bi bi-arrow-right-short"></i>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="row g-4">
            <jobsDisplayVue :job="i" @click="goToJob(i.id, i.title ?? '')" v-for="i in similarJobs" :key="i" />
          </div>
          <!-- <emptyDataComponent v-else text="No similar jobs" /> -->
        </div>
      </div>
    </div>
  </div>

  <!-- modals -->
  <jobApplicationModal1 v-if="modalOpen && currentModal == 1" />
  <jobApplicationModal2 v-if="modalOpen && currentModal == 2" />
  <jobApplicationModal3 v-if="modalOpen && currentModal == 3" />
  <jobApplicationModal4 v-if="modalOpen && currentModal == 4" />
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { onBeforeRouteLeave } from 'vue-router';
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
import { useDateFormat } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import api from '@/stores/Helpers/axios'
import { useShare } from '@vueuse/core'
//@ts-ignor

// import useMetaTags from '@/stores/Helpers/useMetaTags';
import { useSeoMeta } from '@unhead/vue'


const imageFallback = ref<boolean>(false)

import { useProfileStore } from '@/stores/profileStore';

import jobApplicationModal1 from './jobApplication/modal1.vue';
import jobApplicationModal2 from './jobApplication/modal2.vue';
import jobApplicationModal3 from './jobApplication/modal3.vue';
import jobApplicationModal4 from './jobApplication/modal4.vue';
import useFunctions from '@/stores/Helpers/useFunctions';
import JobDescriptionSkeleton from '@/components/skeletonLoaders/jobDescriptionSkeleton.vue';
import JobDescriptionInfoComponent from './JobDescriptionInfoComponent.vue';

const job = useJobApplicationStore()
const { currentJob, loading, modalOpen, currentModal } = storeToRefs(job)
const router = useRouter()
const route = useRoute()
const similarJobs = ref<any[]>([])

const profileStore = useProfileStore()

const jobIdOnRoute = ref<string>('')

watchEffect(async () => {
  loading.value = true

  // @ts-ignore
  jobIdOnRoute.value = atob(route.params.id)
  await job.currentJobQuery(jobIdOnRoute.value)
  if (!currentJob.value.title) router.back()
  getSimilarJobs()
})


const hasAppliedForThisJob = ref(false)

watchEffect(() => {
  if (profileStore.isLoggedIn && currentJob.value?.title) {
    hasAppliedForThisJob.value = currentJob.value.applications.includes(profileStore.profile?.user_id) ? true : false
  }
})


// onBeforeMount(() => {
//   console.log(route.path);

//   // redirect to account page if loggged in
//   // if (profileStore.getUserType == 'user') {
//   //   router.replace({ path: `/user/job-description/${route.params.id}`, query: { t: new Date().getTime() } })
//   // }
// })

async function getSimilarJobs() {
  try {
    const resp: any = await api.similarJobs(jobIdOnRoute.value)
    if (resp.status == 200)
      similarJobs.value = resp.data.body
    console.log('similarJobs', resp.data.body);
  } catch (error) {
    console.log(error);
  }
}

function openApplyModal() {
  modalOpen.value = true;
  currentModal.value = 1
}

function visitExternalLink() {
  let jobUrl = currentJob.value?.job_url;

  if (jobUrl) {
    if (!jobUrl.startsWith("https://") && !jobUrl.startsWith("http://")) {
      jobUrl = `https://${jobUrl}`;
    }
    window.open(jobUrl, '_blank'); // Open in a new tab
  } else {
    console.log("Invalid URL");
  }
}


function dateShow(date: any) {
  let d = useDateFormat(date, `MMMM D, YYYY`)
  return d.value
}


// share job
const { share } = useShare()
function shareLink() {
  console.log(currentJob.value?.company?.name);

  share({
    title: `Job openeing - ${currentJob.value.title}`,
    text: `Check out this job opening at -  ${currentJob.value?.company?.name}`,
    url: location.href,
  })
}


function goToJob(id: any, title: '') {
  router.push({
    path: `/job-description/${btoa(id)}`,
    query: {
      job: title.toLowerCase().replace(/\s+/g, "-"),
      t: new Date().getTime(),
    }
  })
}

const hasPassedDeadline = () => {
  const deadline = new Date(currentJob.value.deadline)
  const today = new Date()
  // Set both dates to midnight
  deadline.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return deadline < today

}


onBeforeRouteLeave(() => {
  modalOpen.value = false
})


useSeoMeta({
  title: computed(() => currentJob.value?.title),
  description: 'Apply at Portrec',
  ogUrl: route.fullPath,
  ogTitle: computed(() => currentJob.value?.title),
})

</script>

<style scoped>
/* @import '@/assets/css/theme-style.css'; */

.img-fluid {
  max-width: 100%;
  height: auto;
}

.skills-tag {
  background-color: var(--bs-light);
  padding: 5px 8px;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: small;
}

.category-tag {
  display: inline-block;
  margin-bottom: 5px;
}

.benefit-icon {
  font-size: 2.63rem;
  color: var(--theme-color);
}
</style>