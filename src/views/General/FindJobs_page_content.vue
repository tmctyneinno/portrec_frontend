<template>
  <!-- header -->
  <!-- <headerVue /> -->
  <!-- <overlayLoading v-if="jobsStore.loading" /> -->
  <!-- <div class="space-from-header"></div> -->

  <div class="animate__animated animate__fadeIn mb-5">

    <div class="section-panel section-panel-light py-5">
      <div class="container mb-5">
        <div class="row g-3">
          <div class="col-md-12">
            <div class="section-title text-center mb-0">
              Find your <span class="theme-color fw-bold">dream job</span>
            </div>
            <div class="text-center small text-muted mb-4">
              Discover top opportunities and explore opportunities across industries to find your next role
            </div>
            <div class="row justify-content-center">
              <div class="col-md-10">
                <searchJobForm :isLoadingPage="jobsStore.loading" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container bg-white py-3" :class="{ 'small': route.path != '/find-jobs' }">

      <FindJobsSkeleton v-if="jobsStore.loading" />

      <div v-else class="row">
        <div class="col-lg-3">
          <div class="card border-0 pt-5 pb-3">
            <div class="row gy-3">
              <div class="col-12 col-md-6 col-lg-12">
                <div class="accordion accordion-flush" id="type-of-employment">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                        Type of Employment
                      </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse show"
                      data-bs-parent="#type-of-employment">
                      <div class="accordion-body small">
                        <div class="list-group list-group-flush">

                          <label v-for="x in jobsStore.types" :key="x"
                            class="list-group-item border-0 text-capitalize small">
                            <input @change="respondToCheckBox('type_id', x.id)" class="form-check-input me-1"
                              type="checkbox" :value="x.id" v-model="checked.type_id">
                            {{ x.name }}
                            <!-- ({{ x.total_jobs }}) -->
                          </label>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-lg-12">
                <div class="accordion accordion-flush" id="categories">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button fw-bold" :class="{ 'collapsed': windowWidth > 768 }" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="true"
                        aria-controls="flush-collapseTwo">
                        Categories
                      </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse"
                      :class="{ 'show': windowWidth > 768 }" data-bs-parent="#categories">
                      <div class="accordion-body small">
                        <div class="list-group list-group-flush">
                          <label v-for="x in jobsStore.categories" :key="x"
                            class="list-group-item border-0 text-capitalize small">
                            <input @change="respondToCheckBox('industry_id', x.id)" class="form-check-input me-1"
                              type="checkbox" :value="x.id" v-model="checked.industry_id">
                            <span class="form-check-label" v-if="windowWidth > 768" :title="x?.name ?? ''">
                              {{ useFunctions.truncateStr(x?.name ?? '', 15) }}
                            </span>
                            <span v-else> {{ x.name }}</span>
                            <!-- ({{ x?.total_jobs ?? 0 }}) -->
                          </label>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-lg-12">
                <div class="accordion accordion-flush" id="job-level">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button fw-bold" :class="{ 'collapsed': windowWidth > 768 }" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="true"
                        aria-controls="flush-collapseThree">
                        Job Level
                      </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse"
                      :class="{ 'show': windowWidth > 768 }" data-bs-parent="#job-level">
                      <div class="accordion-body small">
                        <div class="list-group list-group-flush">
                          <label v-for="x in jobsStore.levels" :key="x"
                            class="list-group-item border-0 text-capitalize small">
                            <input @change="respondToCheckBox('level_id', x.id)" class="form-check-input me-1"
                              type="checkbox" :value="x.id" v-model="checked.level_id">
                            {{ x.name }}
                            <!-- ({{ x.total_jobs }}) -->
                          </label>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-lg-12">
                <div class="accordion accordion-flush" id="salary-range">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button fw-bold" :class="{ 'collapsed': windowWidth > 768 }" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="true"
                        aria-controls="flush-collapseFour">
                        Salary Range
                      </button>
                    </h2>
                    <div id="flush-collapseFour" class="accordion-collapse collapse"
                      :class="{ 'show': windowWidth > 768 }" data-bs-parent="#salary-range">
                      <div class="accordion-body small">
                        <div class="list-group list-group-flush">
                          <label v-for="x in salaryRanges" :key="x.id"
                            class="list-group-item border-0 text-capitalize small">
                            <input @change="respondToCheckBox('salary_range', x.id)" class="form-check-input me-1"
                              type="checkbox" :value="x.id" v-model="checked.salary_range">
                            {{ x.min }} - {{ x.max }}
                          </label>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="card p-2 border-0">
            <div class="col-12 my-3">
              <div class="row mb-3">
                <div class="col-12">
                  <div>

                    <div class="fw-bold fs-4">
                      {{ jobsStore.isFromSearch ? 'Search Results' : 'All Jobs' }}
                    </div>
                    <div v-if="!jobsStore.loading" class="small text-muted" style="line-height:7px; ">
                      Showing page <span class="fw-bold">{{ currentPage }}/ {{ totalPages }}</span>
                      of <span class="fw-bold">{{ totalRecords }}</span> results
                    </div>
                  </div>
                  <span v-show="jobsStore.isFromSearch" @click="getJobs()"
                    class="float-end fw-bold cursor-pointer theme-color hover-tiltX">
                    Show all jobs <i class="bi bi-chevron-right"></i>
                  </span>

                </div>

                <!-- <div class="col-lg-5 col-12 d-flex justify-content-end  align-items-center small ">
                  <div class="line-right">
                    <span class="text-muted">Sort By:</span>
                    <span class="ms-2">Most Revelant <i class="bi bi-chevron-down"></i> </span>
                  </div>
                  <div class="ps-3">
                    <span><i class="bi bi-grid"></i></span>
                    <span class="ms-3 p-2 bg-light"><i class="bi bi-hdd-stack-fill theme-color"></i></span>
                  </div>
                </div> -->
              </div>
            </div>

            <div class="col-12">
              <div class="card border-0 bg-light p-4 min-vh-100">
                <div v-if="jobsStore.loading" style="min-height: 400px;">
                  <!-- <componentLoading /> -->
                </div>

                <div v-else>
                  <div v-if="jobsStore.allJobsData.length" class="row justify-content-center gy-4">

                    <div v-for="job in jobsStore.allJobsData" :key="job" class="col-md-12 col-sm-12 col-12 ">
                      <div class="card rounded- job-card">
                        <div class="card-body">
                          <div class="row gy-3 align-items-center">
                            <div class="col-md-2 text-lg-center">
                              <img v-if="job.image && !imageFallback" @error="imageFallback = true" width="100"
                                :src="job.image" class="img-fluid" alt="_img">
                              <i v-if="!job.image || imageFallback" class="bi bi-briefcase-fill theme-color"
                                style="font-size: 3.2rem;"></i>
                            </div>
                            <div class="col-md-7">
                              <h4 class="mb-0 job_title">{{ job.title }}</h4>
                              <div class="d-block mb-2 position-relative">
                                <span class="text-muted medium text-capitalize"><i class="lni lni-map-marker me-1"></i>
                                  <span class="text-muted xsmall">Posted by</span>
                                  {{ job.company ? job.company.name : '' }}
                                  <!-- {{ job.company ? job.company.country : '' }} -->
                                </span>
                              </div>
                              <span class="border-right">
                                <span class="category-tag fulltime-tag text-capitalize">
                                  {{ job.job_type ? job.job_type.name : 'Full Time' }}
                                </span>
                              </span>
                              <span class="category-tag text-capitalize" :class="job?.industry?.name ?? '' + '-tag'">
                                {{ job.industry ? job.industry.name : '' }}
                              </span>
                              <!-- <span class="category-tag text-capitalize">
                                {{ job.sub_category ? job.sub_category.name : '' }}
                              </span> -->
                            </div>
                            <div class="col-md-3 justify-content-end">
                              <div class="text-cente">
                                <button @click="goToJob(job.id, job.title)"
                                  class="btn p-2 btn-primary rounded- w-100">Details</button>

                                <!-- <div class="progress mt-2 mb-0 rounded-0" role="progressbar"
                                  :aria-valuenow="job.total_applied" aria-valuemin="0" :aria-valuemax="job.capacity"
                                  style="height: 5px">
                                  <div class="progress-bar bg-danger"
                                    :style="`width: ${(job.total_applied / job.capacity) * 100}%`">
                                  </div>
                                </div>
                                <small>{{ job.total_applied }} applied of {{ job.capacity }} capacity</small>
                                <small>{{ job.total_applied }} applied.</small> -->
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- pagination -->
                    <div class="mt-5">
                      <customPagination :currentPage="currentPage" :perPage="perPage" :totalRecords="totalRecords"
                        @moveToNext="paginateToNext" />
                    </div>

                  </div>

                  <emptyDataComponent v-else text="No jobs" />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import searchJobForm from '@/components/templates/searchJobForm.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useJobsStore } from '@/stores/jobsStore';
import { useRoute, useRouter } from 'vue-router';
import { useWindowSize } from '@vueuse/core'
import useFunctions from '@/stores/Helpers/useFunctions';
import FindJobsSkeleton from '@/components/skeletonLoaders/findJobsSkeleton.vue';

const jobsStore = useJobsStore()
const route = useRoute()
const router = useRouter()

const imageFallback = ref<boolean>(false)

const { width: windowWidth } = useWindowSize()

// pagination
const currentPage = ref(0);
const totalPages = ref(0);
const perPage = ref(0);
const totalRecords = ref(0);

const checked: any = reactive({
  industry_id: [],
  type_id: [],
  level_id: [],
  salary_range: []
})

onMounted(async () => {
  window.scrollTo(0, 0)

  jobsStore.loading = true
  checkBoxesAccordingToExistingQuery()
  if (!jobsStore.isFromSearch)
    await getJobs()


  await jobsStore.getJobCategories()
  await jobsStore.getJobFunctions()
  await jobsStore.getJobTypes()
  await jobsStore.getJobLevels()

  jobsStore.loading = false

  if (windowWidth.value < 768) {
    // collapseAllAccordions();
  }
})


function checkBoxesAccordingToExistingQuery() {
  for (const key of ["industry_id", "type_id", "level_id"]) {
    if (jobsStore.queryObj[key]) {
      jobsStore.queryObj[key].forEach((e: any) => {
        checked[key].push(e);
      });
    }
  }
}

async function getJobs(page = 1) {
  const queryObj: any = {};

  for (const key of ["industry_id", "type_id", "level_id"]) {
    if (checked[key].length) {
      queryObj[key] = checked[key];
    }
  }

  console.log(queryObj);


  jobsStore.queryObj = queryObj;

  await jobsStore.getAllJobs(page)
  jobsStore.isFromSearch = false


}

watch(() => jobsStore.allJobsChunked, () => {
  currentPage.value = jobsStore.allJobsChunked.current_page
  totalPages.value = jobsStore.allJobsChunked.last_page
  perPage.value = jobsStore.allJobsChunked.per_page
  totalRecords.value = jobsStore.allJobsChunked.total
})

function paginateToNext(page: any) {
  window.scrollTo(0, 0)
  getJobs(page)
}

function respondToCheckBox(prop: string, value: any) {
  // window.scrollTo(0, 0)
  // checked[prop] = checked[prop].includes(value) ? [] : [value]; //only one item in each array

  getJobs()
}


const salaryRanges = ref([
  { min: 0, max: 700, id: 1 },
  { min: 700, max: 1000, id: 2 },
  { min: 1000, max: 2000, id: 3 },
  { min: 2000, max: 'above', id: 4 },
])



function goToJob(id: any, title: '') {
  router.push({
    path: `job-description/${btoa(id)}`,
    query: {
      job: title.toLowerCase().replace(/\s+/g, "-"),
      t: new Date().getTime(),
    }
  })
}


</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}


/* .img-fluid {
  max-width: 100%;
  height: auto;
} */

.job-card {
  /* border-color: #fff; */
  /* border-width: 2px; */
  border-color: transparent;
  /* border-left: 1px solid var(--theme-color); */
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
}


.job_title {
  font-size: 20px !important;
  font-weight: 700;
  text-transform: capitalize;
}


/* accordion */
.accordion-button {
  padding-block: 0px;
}

.accordion-button:not(.collapsed) {
  color: var(--bs-black);
  background-color: var(--bs-transparent);
  /* box-shadow: inset 0 calc(-1 * var(--bs-accordion-border-width)) 0 var(--bs-accordion-border-color); */
  box-shadow: none;
}

/* accordion */

@media (max-width: 767px) {
  .img-fluid {
    max-width: 20%;
    height: auto;
  }
}
</style>