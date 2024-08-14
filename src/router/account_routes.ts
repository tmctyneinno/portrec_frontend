// @ts-nocheck

import { useProfileStore } from '@/stores/profileStore';

const accountGuard = (to, from, next) => {
    const profileStore = useProfileStore();
    if (!profileStore.userType) {
        next({ path: `/login` });
    }
    else {
        if (profileStore.userType !== to.meta.auth) {
            next({ path: `/${profileStore.userType}` });
        }
        else {
            next()
        }
    }
}

export default [
    {
        path: '/user',
        beforeEnter: accountGuard,
        component: () => import('../views/Account/User/Layout.vue'),
        children: [
            { path: 'dashboard', name: 'user-Dashboard', meta: { name: 'Dashboard', auth: 'user' }, alias: '/user', component: () => import('../views/Account/User/Dashboard.vue') },
            { path: 'settings', name: 'user-Settings', meta: { name: 'Settings', auth: 'user' }, component: () => import('../views/Account/User/Settings/Settings.vue') },
            { path: 'message', name: 'user-Messages', meta: { name: 'Messages', auth: 'user' }, component: () => import('../views/Account/User/Messages.vue') },
            { path: 'applied-jobs', name: 'user-Applied_Jobs', meta: { name: 'Applied Jobs', auth: 'user' }, component: () => import('../views/Account/User/AppliedJobs.vue') },
            { path: 'find-jobs', name: 'user-Find_Jobs', meta: { name: 'Find Jobs', auth: 'user' }, component: () => import('../views/Account/User/FindJobs.vue') },
            { path: 'job-description/:id', name: 'user-Job_Description', meta: { name: 'Job Description', auth: 'user' }, component: () => import('../views/Account/User/JobDescription.vue') },
            { path: 'browse-companies', name: 'user-Browse_Companies', meta: { name: 'Browse Companies', auth: 'user' }, component: () => import('../views/Account/User/Companies/Companies.vue') },
            { path: 'profile', name: 'user-Profile', meta: { name: 'My Profile', auth: 'user' }, component: () => import('../views/Account/User/Profile/Profile.vue') },
            { path: 'help-center', name: 'user-Help_Center', meta: { name: 'Help Center', auth: 'user' }, component: () => import('../views/Account/User/HelpCenter.vue') },
        ],
    },

    {
        path: '/recruiter',
        beforeEnter: accountGuard,
        component: () => import('../views/Account/Recruiter/Layout.vue'),
        children: [
            { path: 'dashboard', name: 'recruiter-Dashboard', meta: { name: 'Dashboard', auth: 'recruiter' }, alias: '/recruiter', component: () => import('../views/Account/Recruiter/Dashboard.vue') },
            { path: 'messages', name: 'recruiter-Messages', meta: { name: 'Messages', auth: 'recruiter' }, component: () => import('../views/Account/Recruiter/Messages.vue') },
            { path: 'company', name: 'recruiter-Company_Profile', meta: { name: 'Company Profile', auth: 'recruiter' }, component: () => import('../views/Account/Recruiter/CompanyProfile/CompanyProfile.vue') },
            { path: 'applicants', name: 'recruiter-All_Applicants', meta: { name: 'Applicants', auth: 'recruiter' }, component: () => import('../views/Account/Recruiter/Applicants.vue') },
            { path: 'job-listing', name: 'recruiter-Job_Listing', meta: { name: 'Job Listing', auth: 'recruiter' }, component: () => import('../views/Account/Recruiter/JobListing.vue') },
            { path: 'schedules', name: 'recruiter-Schedule', meta: { name: 'Schedule', auth: 'recruiter' }, component: () => import('../views/Account/Recruiter/Schedule.vue') },
            { path: 'settings', name: 'recruiter-Settings', meta: { name: 'Settings', auth: 'recruiter' }, component: () => import('../views/Account/Recruiter/Settings.vue') },
            { path: 'help-center', name: 'recruiter-Help_Center', meta: { name: 'Help Center', auth: 'recruiter' }, component: () => import('../views/Account/Recruiter/HelpCenter.vue') },
        ],
    },
]