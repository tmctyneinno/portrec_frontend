<template>
    <div :class="size == 'half' ? 'col-lg-6' : ''">
        <div class="card card-latest p-4 hover-tiltY cursor-pointer h-100">
            <div class="row justify-content-center align-items-center">
                <div class="col-3 d-flex justify-content-center  rounded-2 " :class="{ 'bg-light': !job.image }">
                    <img v-if="job.image && !imageFallback" @error="imageFallback = true" width="100" :src="job.image"
                        alt="_img">
                    <i v-if="!job.image || imageFallback" class="bi bi-briefcase-fill theme-color"
                        style="font-size: 3.5rem;"></i>
                </div>
                <div class="col">
                    <h5 class="slide-title job_title">
                        {{ job.title ?? '' }} <i class="bi d-md-none bi-chevron-right"></i>
                    </h5>
                    <div class="slide-info text-muted small text-capitalize">
                        <span class="text-muted xsmall">Posted by</span>
                        {{ job.company?.name ?? '' }}

                        <!-- <span v-if="job.company?.city && job.company?.country">
                            <i class="bi bi-dot"></i>
                            {{ job.company?.city ?? '' }},
                            {{ job.company?.country ?? '' }}
                        </span> -->

                        <div v-if="job.min_salary && job.max_salary" class="fw-bolder text-nowrap">
                            ({{ job.min_salary }} - {{ job.max_salary }})
                            {{ job.currency?.currency }}
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <span class="border-right">
                            <span class="category-tag fulltime-tag text-capitalize">
                                {{ job.job_type?.name ?? 'Full Time' }}
                                <span v-if="job.job_mode">
                                    ( {{ job.job_mode?.name ?? '-' }})
                                </span>
                            </span>

                        </span>
                        <span class="category-tag text-capitalize" :class="job.industry?.name ?? '' + '-tag'">
                            <!-- {{ job.category?.name ?? '' }} -->
                            {{ job.industry?.name ?? '' }}
                            <!-- {{ job }} -->
                        </span>
                        <!-- <span class="category-tag text-capitalize">
                            {{ job.sub_category?.name ?? '' }}
                        </span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import useFunctions from '@/stores/Helpers/useFunctions';
import { ref } from 'vue';

const imageFallback = ref<boolean>(false)

defineProps({
    job: {
        type: Object,
        required: true,
    },
    size: {
        default: 'half'
    }
})
</script>
<style scoped>
.card-latest {
    /* border-color: #fff; */
    /* border-width: 2px; */
    /* border-color: transparent; */
    /* border-left: 1px solid var(--theme-color); */
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
}

/* .card-latest:hover {
    border: 2px solid var(--theme-color);
    border-color: var(--theme-color);
    background-color: var(--theme-color2-soft);
} */

.card-latest:hover .slide-title {
    color: var(--theme-color);
}

.job_title {
    font-size: 20px !important;
    font-weight: 700;
    text-transform: capitalize;
}


@media (max-width: 767px) {
    .slide-title {
        font-size: 14px;
        color: var(--theme-color);
    }

    /* .slide-info {} */

}
</style>
