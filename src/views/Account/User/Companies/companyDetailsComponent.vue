<template>
    <overlayLoading v-if="pageIsLoading" />
    <div v-if="companyData" class="row g-3">
        <div class="col-lg-8">
            <div class="card">
                <h5 class="card-header border-0 bg-transparent py-3"> Company details </h5>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item border-0">
                            <div class="row g-2">
                                <div class="col-md-2">
                                    <img :src="companyData.image" width="100" class="img-fluid" alt="image" />
                                </div>
                                <div class="col">
                                    <h5 class="fw-bold">{{ companyData.name }}</h5>
                                    <small class="text-muted">{{ companyData.address }}</small>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item border-0">
                            {{ companyData.description }}
                        </li>

                        <li v-if="companyData.jobs.length" class="list-group-item border-0 mt-4">
                            <div v-for="job in companyData.jobs.slice(0, 5)" :key="job" class="card shadow-sm mb-3">
                                <div class="card-body">
                                    <div class="row g-4">
                                        <div class="col-lg-8">
                                            <div class="row g-2">
                                                <div class="col-md-2 align-content-center">
                                                    <img :src="companyData.image" width="100" class="img-fluid"
                                                        alt="image" />
                                                </div>
                                                <div class="col">
                                                    <span class="fw-bold h5">{{ job.title }}</span> <br>
                                                    <small class="xsmall">{{ job.location }}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="row justify-content-center align-items-center ">
                                                <div class="col-3">
                                                    <i class="bi bi-share"></i>
                                                </div>
                                                <div class="col-9 align-content-center">
                                                    <button @click="goToJob(job.id, job.title)"
                                                        class="btn p-2 btn-primary w-100">Apply</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>
                        <!-- <li class="list-group-item">
                            <div class="text-muted my-2">
                                <i class="bi bi-geo-alt me-2"></i>{{ companyData.address }}
                            </div>
                            <div class="text-muted my-2">
                                <i class="bi bi-globe me-2"></i>
                                <a class="theme-color" :href="companyData.website" target="_blank">
                                    {{ companyData.website }}</a>
                            </div>
                        </li> -->
                        <!-- <li v-if="companyData.twitter" class="list-group-item">
                            <div class="d-flex justify-content-start">
                                <div v-if="companyData.twitter" class="me-3">
                                    <i class="bi bi-twitter-x"></i> {{ companyData.twitter }}
                                </div>
                                <div v-if="companyData.instagram" class="me-3">
                                    <i class="bi bi-instagram"></i> {{ companyData.instagram }}
                                </div>
                                <div v-if="companyData.facebook" class="me-3">
                                    <i class="bi bi-facebook"></i> {{ companyData.facebook }}
                                </div>
                                <div v-if="companyData.linkedin" class="me-3">
                                    <i class="bi bi-linkedin"></i> {{ companyData.linkedin }}
                                </div>
                            </div>
                        </li> -->
                    </ul>
                </div>
            </div>

        </div>

        <div class="col-md-4">
            <div class="row g-3">

                <div class="col-12">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="card shadow-sm border-">
                                <div class="card-body">
                                    <form @submit.prevent="sendMessage" class="row g-3" v-if="company_recruiter_id">
                                        <!-- <div v-if="companyData.recruiter" class="col-12 text-center">
                                            <i style="font-size: 4rem;" class="bi bi-person-circle text-muted lh-1"></i>
                                            <div class="text-center fw-bold"> <br>
                                                {{ companyData.recruiter.name }}
                                            </div>
                                            <div>Recruiter</div>
                                        </div> -->
                                        <div class="text-muted">Chat Recruiter</div>
                                        <div class="col-12">
                                            <textarea v-model="message.text" placeholder="type message here.."
                                                class="form-control" style="height: 100px;"></textarea>
                                        </div>
                                        <div class="col-12">
                                            <primaryButton btnType="submit" :className="'w-100'"
                                                v-if="!message.isSending">
                                                <i class="bi bi-chat"></i> Chat recruiter
                                            </primaryButton>
                                            <primaryButtonLoading v-else :className="'w-100'" />

                                        </div>

                                    </form>

                                    <div class="mt-5 small">
                                        <div class="mt-2">
                                            <i class="bi bi-envelope-fill"></i>
                                            <!-- <strong class="ms-1">Email:</strong> -->
                                            {{ companyData?.recruiter?.email ?? '-' }}
                                        </div>

                                        <div class="mt-2">
                                            <i class="bi bi-telephone-fill"></i>
                                            <!-- <strong class="ms-1">Call:</strong> -->
                                            {{ companyData?.recruiter?.phone ?? '-' }}
                                        </div>

                                        <div class="mt-2">
                                            <i class="bi bi-geo-alt-fill"></i>
                                            <!-- <strong class="ms-1">Location:</strong> -->
                                            {{ companyData?.recruiter?.location ?? '-' }}
                                        </div>

                                        <!-- <div class="mt-2">
                                            <i class="bi bi-building-fill"></i>
                                            <strong class="ms-1">Location:</strong>
                                            {{ companyData.recruiter?.industry?.name }}
                                        </div> -->

                                        <div class="mt-2">
                                            <i class="bi bi-facebook"></i>
                                            {{ companyData.facebook }}
                                        </div>

                                        <div class="mt-2">
                                            <i class="bi bi-twitter-x"></i>
                                            {{ companyData?.twitter ?? '-' }}
                                        </div>

                                        <div class="mt-2">
                                            <i class="bi bi-linkedin"></i>
                                            {{ companyData.linkedin }}
                                        </div>

                                        <div class="mt-2">
                                            <i class="bi bi-globe"></i>
                                            {{ companyData.website ?? '-' }}
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';

const route = useRoute()
const router = useRouter()
const pageIsLoading = ref(false)
const companyData = ref<any>('')

onMounted(() => {
    loadCompanyDetails()
})


async function loadCompanyDetails() {
    try {
        const companyId: any = route.query.company;
        pageIsLoading.value = true
        const { data } = await api.companyDetails(companyId)
        companyData.value = data.data.company
        pageIsLoading.value = false
        console.log(companyData.value, 'details');
    } catch (error) {
        console.log(error);
        pageIsLoading.value = false

    }
}


const company_recruiter_id = computed(() => {
    let id = null
    const jobs = companyData.value.jobs ?? []
    if (jobs.length) {
        const firstJobInArray = jobs[0]
        id = firstJobInArray?.recruiter_id
    }
    return id;

})




// messaging

const message = reactive({
    text: '',
    isSending: false
})

async function sendMessage() {


    if (message.text) {
        const obj = new FormData();
        obj.append('message', message.text)
        obj.append('recipient_id', company_recruiter_id.value)

        try {
            message.isSending = true
            await api.createMessage(obj)
            useFxn.toast('Message Sent', 'success')
            message.text = ''
            message.isSending = false
        } catch (error) {
            // console.log(error);
            message.isSending = false
        }
    }
}

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



<style lang="css" scoped></style>
