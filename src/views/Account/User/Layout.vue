<template>
    <div>
        <side-bar userType="user" />
        <top-nav userType="user" />

        <div class="children-pages">
            <div class="container p-3">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import sideBar from '@/components/Accounts/sideBar.vue'
import topNav from '@/components/Accounts/topNav.vue'
import { useProfileStore } from '@/stores/profileStore';
import { onMounted } from 'vue';

const profileStore = useProfileStore()

onMounted(async () => {
    await profileStore.getProfile()
    await profileStore.getNotifications()
})

</script>

<style scoped>
.children-pages {
    padding-top: 70px;
    padding-bottom: 100px;
    /* background-color: #f4f2ee87; */
}

@media (min-width: 767px) {
    .children-pages {
        margin-left: 250px;
    }
}
</style>