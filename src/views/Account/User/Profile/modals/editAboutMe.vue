<template>
    <div class="modal fade" id="editAboutModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg " role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">About Me</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-12" style="margin-bottom: 50px; height:200px">
                        <QuillEditor v-model:content="editorData" contentType="html" toolbar="minimal" />
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
import { watch, ref } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';
import { useEditingProfileStore } from '../editingProfileStore';

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()
const route = useRoute()

const editorData = ref<string>(editingStore.aboutMe.text)
watch(() => editingStore.aboutMe.isEdit, () => {
    editorData.value = editingStore.aboutMe.text
})

const isSaving = ref(false)

function clickSave() {

    // if (!useFxn.isOnline()) {
    //     useFxn.toastShort('You are offline')
    //     return
    // }

    isSaving.value = true
    save()
}

async function save() {
    try {
        let { data } = await api.userUpdateProfile({ about_me: editorData.value })
        if (data.status === 201) {
            useFxn.toast('Updated successfully', 'success')
            btnX.value.click();
            profileStore.getProfile()
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
p {
    margin: 0px !important;
}

.btn {
    width: 250px;
}
</style>
