<template>
    <div class="modal fade" id="addEducationModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Add Education</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-12">
                            <label class="form-label">Institution * </label>
                            <textarea v-model="education.institution" class="form-control " name="" id=""
                                rows="2"></textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">From * </label>
                            <VueDatePicker :flow="['year', 'month', 'calender']" :format="useFxn.dateDisplay"
                                :teleport="true" hide-input-icon :clearable="false" :max-date="new Date()"
                                :enable-time-picker="false" auto-apply v-model="education.start_date">
                            </VueDatePicker>
                            <label class="cursor-pointer small">
                                <input v-model="isCurrentlyHere" class="form-check-input me-1" type="checkbox">
                                I currently school here
                            </label>
                        </div>
                        <div class="col-md-6" v-if="!isCurrentlyHere">
                            <label class="form-label">To * </label>
                            <VueDatePicker :flow="['year', 'month', 'calender']" :format="useFxn.dateDisplay"
                                :teleport="true" hide-input-icon :clearable="false" :max-date="new Date()"
                                :min-date="education.start_date" :enable-time-picker="false" auto-apply
                                v-model="education.end_date">
                            </VueDatePicker>
                        </div>
                        <div class="col-lg-6">
                            <label class="form-label">Qualification * </label>
                            <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                                v-model="education.qualification" class=" text-capitalize profile-edit-select"
                                :clearable="false" :options="jobsStore.qualifications" label="name"></v-select>
                        </div>

                        <div class="col-lg-6">
                            <label class="form-label">Description * </label>
                            <textarea v-model="education.description" class="form-control " name="" id=""
                                rows="2"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <primaryButton @click="clickSave" v-if="!isSaving">
                        Save
                    </primaryButton>
                    <primaryButtonLoading v-else />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive, onMounted, computed } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';
import { useEditingProfileStore } from '../editingProfileStore'
import { useJobsStore } from '@/stores/jobsStore';

const route = useRoute()
const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()

const jobsStore = useJobsStore()

const isCurrentlyHere = ref(false)

onMounted(() => {
    jobsStore.getJobQualifications()
})

// const qualificationsArray = computed(() => {
//     return jobsStore.qualifications.map((x: any) => ({ id: x.id, label: x.name }))
// })

const education = reactive<any>({
    institution: '',
    qualification: '',
    start_date: new Date(),
    end_date: new Date(),
    description: '',
})


const isSaving = ref(false)

function clickSave() {

    // if (!useFxn.isOnline()) {
    //     useFxn.toastShort('You are offline')
    //     return
    // }


    const requiredFields = ['start_date', 'qualification', 'institution'];

    for (const field of requiredFields) {
        if (!education[field]) {
            useFxn.toastShort(`Please complete field: ${field}`);
            return;
        }
    }

    isSaving.value = true
    save()
}

async function save() {

    let thisEndDate = isCurrentlyHere.value ? null : education.end_date;
    let obj = {
        institution: education.institution,
        qualification_id: education.qualification.id,
        start_date: editingStore.dateSubmitFormat(education.start_date),
        end_date: editingStore.dateSubmitFormat(thisEndDate),
        description: education.description
    }

    try {
        let { data } = await api.userEducation(obj)
        if (data.status === 200) {
            useFxn.toast('Updated successfully', 'success')
            btnX.value.click();
            profileStore.getProfile()
            education.institution = education.description = education.qualification = ''
        }
    } catch (error) {
        // 
    }
    finally {
        isSaving.value = false
    }
}


const btnX = ref<any>(null)
onBeforeRouteLeave(() => {
    btnX.value.click();
})

</script>


<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>

<style>
/* .dp__pointer {
    border-radius: 0px !important;
} */
</style>
