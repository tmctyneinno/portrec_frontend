import LandingPage from '../views/General/LandingPage/LandingPage.vue'

export default [
    {
        path: '/',
        name: 'Home',
        component: LandingPage
    },
    {
        path: '/about-us',
        name: 'About Us',
        component: () => import(/* webpackChunkName: "general" */  '../views/General/About.vue')
    },
    {
        path: '/our-services',
        name: 'Our Services',
        component: () => import(/* webpackChunkName: "general" */  '../views/General/Services.vue')
    },
    {
        path: '/search-talent/:industry_id?',
        name: 'Search Talent',
        component: () => import(/* webpackChunkName: "talent" */  '../views/General/SearchTalent.vue')
    },
    {
        path: '/for-talent',
        name: 'For Talent',
        component: () => import(/* webpackChunkName: "talent" */  '../views/General/ForTalent.vue')
    },
    {
        path: '/summits',
        name: 'Summits',
        component: () => import(/* webpackChunkName: "talent" */  '../views/General/Summits/Summits.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import( /* webpackChunkName: "general" */  '../views/General/Contact.vue')
    },
    {
        path: '/find-jobs',
        name: 'Find Jobs',
        component: () => import(/* webpackChunkName: "general" */  '../views/General/FindJobs.vue')
    },
    {
        path: '/job-description/:id',
        name: 'Job Description',
        component: () => import(/* webpackChunkName: "general" */  '../views/General/JobDescription/JobDescription.vue')
    },

    {
        path: '/meeting/invite',
        alias: ['/meeting/accept', '/candidate/accept/view'],
        name: 'Meeting Invite',
        component: () => import(/* webpackChunkName: "general" */  '../views/Account/User/MeetingInvite.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import(/* webpackChunkName: "error" */  '../views/General/PageNotFound.vue')
    },
]