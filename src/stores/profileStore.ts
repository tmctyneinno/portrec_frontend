import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import api from '@/stores/Helpers/axios'
// @ts-ignore
import Cookies from 'js-cookie';

export const useProfileStore = defineStore('profileStore', () => {
    const token: any = ref('')
    const tokenExpiry = 3 // days
    const userType: any = ref('')
    const userData: any = useStorage('protrec_$user_profile', null, sessionStorage)
    const isNewLogin: any = useStorage('protrec_$isNewLogin', '1')
    const avatar = ref<string>('')
    const notifications = ref<{
        title: string,
        message: string,
        notification_type: string,
        id: string,
        ref_id: string
    }[]>([])

    const isLoggedIn = computed(() => token.value || Cookies.get('PortrecTkn'));
    const getUserType = computed(() => userType.value || Cookies.get('PortrecUserType'))


    const login = (tokenStr: string, loginType: 'user' | 'recruiter') => {
        Cookies.set('PortrecTkn', tokenStr, { expires: tokenExpiry });
        token.value = tokenStr;

        Cookies.set('PortrecUserType', loginType, { expires: tokenExpiry });
        userType.value = loginType;

        window.location.reload();
    }


    function logout() {
        Cookies.remove('PortrecTkn');
        Cookies.remove('PortrecUserType');
        token.value = '';
        userType.value = '';
        userData.value = null;
        window.location.reload()
    }



    async function getProfile(type = 'user') {
        try {
            const resp = type == 'user' ? await api.userProfile() : await api.recruiterProfile();
            // console.log(resp);
            if (resp.status === 201) {
                userData.value = JSON.stringify(resp.data.body)
                avatar.value = resp.data.body?.avatar ?? 'https://dummyimage.com/150x150'
                // console.log('profile', JSON.parse(profile.value));
            }
        } catch (error: any) {
            if (error.response.data.status === 401
                || error.response.data.error == 'Unauthenticated'
                || error.response.data.error == 'Unauthenticated.') {
                logout()
            }
            // console.log(error.response.data);
        }
    }

    async function getNotifications(type = 'user') {
        try {
            const resp = type == 'user' ? await api.userNotifications() : await api.recruiterNotifications();
            console.log(resp);
            notifications.value = resp?.data ?? []
        } catch (error) {
            console.log(error);

        }
    }


    async function readNotification(id: any) {
        try {
            const resp = await api.readNotification(id);
        } catch (error) {
            console.log(error);

        }
    }
    const data = computed(() => JSON.parse(userData.value))
    const profile = computed(() => data.value?.profile)

    return {
        token,
        data,
        avatar,
        isNewLogin,
        login,
        logout,
        getProfile,
        getNotifications,
        readNotification,
        profile,
        isLoggedIn,
        getUserType,
        notifications
    }
})
