<template>

    <modal_template>

        <template #title>
            <div class="fw-bold text-muted fs-5">Submit your resume</div>
            <div class="xsmall text-muted lh-1 mb-2">
                Be sure to include an updated resume
            </div>
        </template>

        <template #form>
            <!-- <div class="col-12">
                            <div class="card overflow-hidden">
                                <div class="row g-0">
                                    <div class="pdf-grid col-2 bg-primary fw-bold  text-white small">PDF</div>
                                    <div class="col-8">
                                        <div class="ps-2 py-1 ms-0">
                                            <div class="fw-bold text-muted">BOMA AGINA-OBU.pdf</div>
                                            <small class="text-muted">Last used on 7/25/2022</small>
                                        </div>
                                    </div>
                                    <div class="col-1 d-flex align-items-center cursor-pointer">
                                        <i class="bi bi-download"></i>
                                    </div>
                                    <div class="col-1 d-flex align-items-center cursor-pointer">
                                        <i class="bi bi-circle-fill"></i>
                                    </div>
                                </div>
                            </div>
                        </div> -->

            <!-- <div class="col-12 d-flex justify-content-end ">
                            <small class="text-muted cursor-pointer">show more resume <i class="bi bi-chevron-down"></i>
                            </small>
                        </div> -->

            <div class="col-12 col-md-6">
                <div class="resume-attach" v-bind="getRootProps()">
                    <i class="bi bi-paperclip fs-5"></i>
                    <div class="text-muted small fw-bold">Attach Resume/CV</div>
                    <input v-bind="getInputProps()" />
                </div>
            </div>
            <div v-if="store.applyData.resume" class="col-12 col-md-6">
                <div class="alert small alert-success bg-transparent border-0" role="alert">
                    {{ useFxn.truncateStr(store.applyData.resume_name, 18) }} <i class="bi bi-check-circle-fill"></i>
                </div>
            </div>

        </template>

        <template #buttons>
            <div class="row">
                <div class="col-6">
                    <button @click="store.switchModal(-1)" type="button"
                        class="btn btn-outline-dark rounded-0 w-100">Back</button>
                </div>
                <div class="col-6">
                    <button :disabled="!store.applyData.resume" @click="switchOrSkipModal" type="button"
                        class="btn btn-primary rounded-0 w-100">Next</button>
                </div>
            </div>
        </template>

    </modal_template>
</template>

<script lang="ts" setup>
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
//@ts-ignore
import { useDropzone } from "vue3-dropzone";
import useFxn from "@/stores/Helpers/useFunctions";
import modal_template from './modal_template.vue';



const store = useJobApplicationStore()
const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptFiles: any[], rejectReasons: any) => {

        if (!useFxn.isExtension(acceptFiles[0].name, ['pdf', 'doc', 'docx'])) {
            useFxn.toast('Please upload a vaild document', 'warning');
            return;
        }

        store.applyData.resume = acceptFiles[0]
        store.applyData.resume_name = acceptFiles[0].name
        console.log(rejectReasons);
    },
});

function switchOrSkipModal() {
    if (!store.currentJob.questions.length) store.switchModal(+2)
    else store.switchModal(+1)
}

</script>

<style scoped>
.pdf-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-block: 10px; */

}

.resume-attach {
    border-style: dashed;
    border-radius: 10px;
    border-color: var(--theme-color);
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: var(--bs-light);
    padding: 8px 10px;
    cursor: pointer;
}
</style>