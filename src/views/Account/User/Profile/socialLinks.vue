<template>
    <div class="col-12">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Social Links
                <span class="float-end" data-bs-toggle="modal" data-bs-target="#editSocialLinksModal">
                    <span class="profile-edit-btn small rounded-1">
                        <i class="bi bi-pencil-fill"></i>
                    </span>
                </span>
            </div>
            <div class="card-body small">
                <ul class="list-group list-group-flush">
                    <li v-if="userHas('instagram')" class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-instagram"></i>
                            </div>
                            <div class="col">
                                <div class="text-muted">Instagram</div>
                                <div class="theme-color">
                                    {{ socialLinkUrl('instagram') }}
                                </div>
                            </div>
                        </div>
                    </li>
                    <li v-if="userHas('twitter')" class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-twitter-x"></i>
                            </div>
                            <div class="col">
                                <div class="text-muted">Twitter</div>
                                <div class="theme-color">
                                    {{ socialLinkUrl('twitter') }}
                                </div>
                            </div>
                        </div>
                    </li>
                    <li v-if="userHas('linkedin')" class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-linkedin"></i>
                            </div>
                            <div class="col">
                                <div class="text-muted">LinkedIn</div>
                                <div class="theme-color">
                                    {{ socialLinkUrl('linkedin') }}
                                </div>
                            </div>
                        </div>
                    </li>
                    <li v-if="userHas('facebook')" class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-facebook"></i>
                            </div>
                            <div class="col">
                                <div class="text-muted">Facebook</div>
                                <div class="theme-color">
                                    {{ socialLinkUrl('facebook') }}
                                </div>
                            </div>
                        </div>
                    </li>
                    <li v-if="userHas('website')" class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-globe"></i>
                            </div>
                            <div class="col">
                                <div class="text-muted">Website</div>
                                <div class="theme-color">
                                    {{ socialLinkUrl('website') }}
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- <div v-else class="text-muted2 list-group-item border-0 py-4">
                        Add your social links here
                    </div> -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';

const profileStore = useProfileStore()

const userHas = (str: string) => {
    let bool: boolean = false
    if (profileStore.profile)
        bool = profileStore.profile[str] ? true : false
    return bool

}

const socialLinkUrl = (str: string) => {
    let url: string = ''
    if (profileStore.profile)
        url = profileStore.profile[str] ?? '__';
    return url

}



</script>

<style lang="css" scoped>
.skills-tag {
    background-color: var(--bs-light);
    color: var(--theme-color);
    padding: 5px 8px;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    font-size: small;
}
</style>
