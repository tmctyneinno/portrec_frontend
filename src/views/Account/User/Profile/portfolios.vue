<template>
    <div class="col-12">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Portfolios
                <span class="float-end" data-bs-toggle="modal" data-bs-target="#addPortfolioModal">
                    <span class="profile-edit-btn small rounded-1">
                        <i class="bi bi-plus-lg"></i>
                    </span>
                </span>
            </div>
            <div class="card-body small">

                <p v-if="!portfolios.length" class="text-muted2">
                    Add Portfolios.
                </p>

                <div v-else>
                    <div class="portfolio-container">
                        <div v-for="(item, index) in portfolios" :key="index" @click="openEditButton(item)"
                            class="portfolio-item text-wrap card hover-tiltY">
                            <img v-if="item.images.length" class="portfolio-image" :src="item.images[0].image"
                                alt="image">
                            <img v-else class="portfolio-image" src="" alt="image">

                            <div class="portfolio-content">
                                <div class="portfolio-title">{{ item.title ?? 'Portfolio' }} </div>
                                <div class="portfolio-desc">{{ useFunctions.truncateStr(item.description, 28) }} </div>
                            </div>
                        </div>
                    </div>
                    <button ref="editBtn" class="d-none" data-bs-toggle="modal"
                        data-bs-target="#editPortfolioModal"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useEditingProfileStore } from './editingProfileStore'
import { computed, ref } from 'vue';
import useFunctions from '@/stores/Helpers/useFunctions';

const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()


const portfolios = computed(() => { return profileStore.data?.portfolios ?? [] });

const editBtn = ref<any>(null)
function openEditButton(item: any) {
    editingStore.portfolioToEdit = item
    editBtn.value?.click()
}


</script>

<style scoped>
@import '@/assets/css/portfolioView.css';
</style>