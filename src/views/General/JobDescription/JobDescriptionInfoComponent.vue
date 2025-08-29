<template>


  <div class="row  gy-3 ">
    <div class="col-lg-8">

      <div class="py-3">
        <h5 class="fw-bold">Description</h5>
        <div v-html="currentJob?.description ?? ''" class="card m-0 p-0 border-0">
        </div>
      </div>

      <div class="card p-0 border-0">
        <div class="card-body p-0">
          <div v-for="(qualification, i) in JSON.parse(currentJob?.other_qualifications ?? '[]')" :key="i" class="py-3">
            <h5 class="fw-bold">{{ qualification.title.replaceAll('_', ' ') }}</h5>
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
        <h5 class="fw-bold">About this job</h5>
        <!-- <div v-if="currentJob?.total_applied" class="card p-3 border-0 bg-light">
          <div class="fw-bold small">
            {{ currentJob?.total_applied }} applied of {{ currentJob?.capacity }} capacity
            {{ currentJob?.total_applied }} applied
          </div>
          <div class="progress mt-2 mb-0 rounded-0" role="progressbar" :aria-valuenow="currentJob.total_applied"
            aria-valuemin="0" :aria-valuemax="currentJob?.capacity" style="height: 5px">
            <div class="progress-bar bg-danger"
              :style="`width: ${(currentJob?.total_applied / currentJob?.capacity) * 100}%`">
            </div>
          </div>
        </div> -->

        <div class="col-12 mt-3">
          <ul class="list-group list-group-flush">
            <li class="list-group-item border-0 px-0">Apply Before
              <span class="float-end fw-bold">
                {{ dateShow(currentJob?.deadline) }}
              </span>
            </li>
            <li class="list-group-item border-0 px-0">Job Posted On
              <span class="float-end fw-bold">
                {{ dateShow(currentJob?.created_at) }}
              </span>
            </li>
            <li v-if="currentJob?.job_type" class="list-group-item border-0 px-0">Job Type
              <span class="float-end fw-bold text-capitalize">
                {{ currentJob?.job_type?.name ?? '-' }}
              </span>
            </li>
            <li class="list-group-item border-0 px-0">Job Mode
              <span class="float-end fw-bold text-capitalize">
                {{ currentJob?.job_mode?.name ?? '' }}
              </span>
            </li>
            <li class="list-group-item border-0 px-0">
              <!-- Salary -->
              <span class="float-end fw-bold small">
                ({{ numeral(currentJob?.min_salary ?? 0).format('0,0.00') }} -
                {{ numeral(currentJob?.max_salary ?? 0).format('0,0.00') }})
                {{ currentJob?.currency?.currency ?? 0 }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <hr>

      <div class="py-2  border-0">
        <h5 class="fw-bold">Category</h5>
        <span class=" text-capitalize" :class="currentJob?.industry?.name ?? '' + '-tag'">
          {{ currentJob?.industry?.name ?? '' }}
        </span>
        <!-- <span class="category-tag text-capitalize">
              {{ currentJob?.sub_category?.name ?? '' }}
              {{ currentJob?.sub_category?.name ?? '' }}
            </span> -->
      </div>

      <hr>

      <div class="py-2 border-0">
        <h4 class="fw-bold">Required Skills</h4>
        <span v-for="skill in JSON.parse(currentJob?.required_skills ?? '[]')" :key="skill" class=" skills-tag">
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

        <div v-for="benefit in JSON.parse(currentJob?.benefits ?? '[]')" :key="benefit" class="col-md-6 col-lg-4">
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

</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';

//@ts-ignore
import numeral from 'numeral';

defineProps(['currentJob'])

function dateShow(date: any) {
  let d = useDateFormat(date, `MMMM D, YYYY`)
  return d.value
}

</script>

<style scoped>
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