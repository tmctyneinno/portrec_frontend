<template>
    <div class=" min-vh-10 overflow-hidden bg-black pb-5 mb-4">
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-9 col-lg-7">
                    <div class="hero-text text-center text-white ">
                        Find your dream employment
                        <span v-if="animaIndex == 1" class="theme-color2 fw-bold">with</span>
                        <span v-if="animaIndex == 2" class="text-primary fw-bold">us at</span>
                        <span v-if="animaIndex == 3"
                            class="theme-color-shine fw-bold animate__animated animate__slideInUp">Portrec</span>
                    </div>

                    <div class="small-text text-white text-center mt-4">
                        Great platform for the job seeker that is searching for new career heights and
                        passionate about startups.
                    </div>
                </div>
                <div class="col-md-9 mt-4">
                    <searchJobFormVue :from-home="true" />
                </div>

                <div class=" d-flex justify-content-center my-5 ">
                    <!-- <img src="/images/hero/hero-image.png" class="hero-image" alt=""> -->
                    <video playsinline autoplay muted loop>
                        <source src="/images/hero/demo-video.mp4" type="video/mp4" />
                        Your browser does not support the videos.
                    </video>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import searchJobFormVue from '@/components/templates/searchJobForm.vue';
import { ref, onMounted } from 'vue';

const animaIndex = ref(1)

onMounted(() => {
    setInterval(() => {
        animaIndex.value = (animaIndex.value == 3) ? 1 : animaIndex.value += 1
    }, 1000)
})


</script>

<style scoped>
.hero-text {
    font-weight: 700;
    line-height: 1;
    font-size: 57px;
    margin-top: 150px;
}


.hero-text .small-text {
    font-size: 17px;
}


.hero-image {
    /* max-width: 130%; */
    height: auto;
}



@media (max-width: 767px) {
    .hero-text {
        margin-top: 100px;
        font-size: 47px;
    }

    .hero-text .find,
    .hero-text .with-us {
        /* line-height: 30px; */
        font-size: 50px;
    }

    .hero-text .small-text {
        font-size: 14px;
    }

    .hero-image {
        /* margin-top: 30px;
        max-width: 100%;
        height: auto; */
        display: none;
    }
}

video {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    /* Ensures the video covers the entire container */
}
</style>
