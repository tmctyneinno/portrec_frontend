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
                        <i class="bi bi-briefcase ms-2"></i>
                        {{ currentJob.job_type?.name ?? '' }}
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
                      <div v-if="new Date(currentJob.deadline).toDateString() < new Date().toDateString()">
                        <div class="small text-muted fst-italic text-center">No longer accepting candidates</div>
                        <primaryButton :disabled="true" className="w-100">
                          Apply
                        </primaryButton>
                      </div>
                      <span v-else-if="hasAppliedForThisJob" class="text-warning small ">Already Applied</span>
                      <button v-else-if="currentJob.job_url" @click="visitExternalLink"
                        class="btn btn-primary rounded- px-3">Visit link</button>
                      <button v-else @click="openApplyModal" class="btn btn-primary rounded- px-3">Apply now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="container bg-whit px-lg-5">
      <div class="row py-5 gy-3 ">
        <div class="col-lg-8">

          <div class="py-3">
            <h4 class="fw-bold">Description</h4>
            <div v-html="currentJob.description ?? ''" class="card m-0 p-0 border-0">
            </div>
          </div>

          <div class="card p-0 border-0">
            <div class="card-body p-0">
              <div v-for="(qualification, i) in JSON.parse(currentJob.other_qualifications ?? '[]')" :key="i"
                class="py-3">
                <h4 class="fw-bold">{{ qualification.title.replaceAll('_', ' ') }}</h4>
                <ul class="list-group list-group-flush ">
                  <li v-for="(description, d) in qualification.descriptions" :key="d"
                    class="list-group-item border-0 px-0 ">
                    <div class="d-flex">
                      <div class="col"><i class="bi bi-check-circle text-danger me-1"></i></div>
                      <div class="col-11">
                        {{ description }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
        <div class="col-lg-4">
          <div class="py-3">
            <h4 class="fw-bold">About this job</h4>
            <div v-if="currentJob.total_applied" class="card p-3 border-0 bg-light">
              <div class="fw-bold small">
                <!-- {{ currentJob.total_applied }} applied of {{ currentJob.capacity }} capacity -->
                {{ currentJob.total_applied }} applied
              </div>
              <div class="progress mt-2 mb-0 rounded-0" role="progressbar" :aria-valuenow="currentJob.total_applied"
                aria-valuemin="0" :aria-valuemax="currentJob.capacity" style="height: 5px">
                <div class="progress-bar bg-danger"
                  :style="`width: ${(currentJob.total_applied / currentJob.capacity) * 100}%`">
                </div>
              </div>
            </div>

            <div class="col-12 mt-3">
              <ul class="list-group list-group-flush">
                <li class="list-group-item border-0 px-0">Apply Before
                  <span class="float-end fw-bold">
                    {{ dateShow(currentJob.deadline) }}
                  </span>
                </li>
                <li class="list-group-item border-0 px-0">Job Posted On
                  <span class="float-end fw-bold">
                    {{ dateShow(currentJob.created_at) }}
                  </span>
                </li>
                <li class="list-group-item border-0 px-0">Job Type
                  <span class="float-end fw-bold text-capitalize">
                    {{ currentJob.job_type?.name ?? '' }}
                  </span>
                </li>
                <li class="list-group-item border-0 px-0">
                  <!-- Salary -->
                  <span class="float-end fw-bold small">
                    ({{ numeral(currentJob.min_salary).format('0,0.00') }} -
                    {{ numeral(currentJob.max_salary).format('0,0.00') }})
                    {{ currentJob.currency?.currency }}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <hr>

          <div class="py-2  border-0">
            <h4 class="fw-bold">Category</h4>
            <span class=" text-capitalize" :class="currentJob.industry?.name ?? '' + '-tag'">
              {{ currentJob.industry?.name ?? '' }}
            </span>
            <!-- <span class="category-tag text-capitalize">
              {{ currentJob.sub_category?.name ?? '' }}
              {{ currentJob.sub_category?.name ?? '' }}
            </span> -->
          </div>

          <hr>

          <div class="py-2 border-0">
            <h4 class="fw-bold">Required Skills</h4>
            <span v-for="skill in JSON.parse(currentJob.required_skills ?? '[]')" :key="skill" class=" skills-tag">
              {{ skill.name }}
            </span>
          </div>

        </div>

        <hr>

        <div class="col-12 mb-3">
          <div class="fs-4 fw-bold">Perks & Benefits</div>
          <span class="small">This job comes with several perks and benefits</span>
        </div>

        <div class="col-12">
          <div class="row g-3">

            <div v-for="benefit in JSON.parse(currentJob.benefits ?? '[]')" :key="benefit" class="col-md-6 col-lg-3">
              <div class="card border-0">
                <div class="benefit-icon">
                  <i class="bi bi-check-circle"></i>
                </div>
                <div class="fs-5 text-capitalize">{{ benefit.title }} </div>
                {{ benefit.description }}
              </div>
            </div>

          </div>
        </div>
      </div>
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
import { computed, onBeforeMount, ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { onBeforeRouteLeave } from 'vue-router';
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
import { useDateFormat } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import api from '@/stores/Helpers/axios'
import { useShare } from '@vueuse/core'
//@ts-ignore
import numeral from 'numeral';

const imageFallback = ref<boolean>(false)

import { useProfileStore } from '@/stores/profileStore';

import jobApplicationModal1 from './jobApplication/modal1.vue';
import jobApplicationModal2 from './jobApplication/modal2.vue';
import jobApplicationModal3 from './jobApplication/modal3.vue';
import jobApplicationModal4 from './jobApplication/modal4.vue';
import useFunctions from '@/stores/Helpers/useFunctions';
import JobDescriptionSkeleton from '@/components/skeletonLoaders/jobDescriptionSkeleton.vue';

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


onBeforeRouteLeave(() => {
  modalOpen.value = false
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