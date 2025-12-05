import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/stores/Helpers/axios'
import type { JobOpeningInterface, JobStatusInterface } from '@/stores/interfaces'

export const useRecruiterCommonStore = defineStore('recruiterCommonStore', () => {
    // Interfaces START ##################################
    interface jobApplicationInterface {
        showing: 'list' | 'details',
        currentIdShowing: string,
        details: any,
        interview: any,
        detailsLoading: boolean
    }

    interface jobPostingInterface {
        modal: boolean,
        stage: number,
        editingId: any,
        hasLoadedDropdowns: boolean,
        jobListUpdated: boolean
    }

    interface jobDropdownsInterface {
        jobFunctions: any[],
        jobIndustries: any[],
        jobTypes: any[],
        jobModes: any[],
        jobLevels: any[],
        skills: any[],
        currencies: any[],
    }

    interface companyProfileInterface {
        profileEditModal: boolean,
        socialLinksEditModal: boolean,
        industryEditModal: boolean,
        topInfoEditModal: boolean,
        techStackEditModal: boolean,
        data: any,
        resources: { employees: any[], industry: any[], countries: any[] },
        isLoading: boolean,
        companyFound: boolean,
        avatar: string,
    }

    // Interfaces END ##################################


    const isJobURLOrEmail = ref<'url' | 'email'>('url')


    const jobApplication = reactive<jobApplicationInterface>({
        showing: 'list',
        currentIdShowing: '',
        details: null,
        interview: null,
        detailsLoading: false
    })

    const jobPosting = reactive<jobPostingInterface>({
        modal: false,
        stage: 1,
        editingId: null,
        hasLoadedDropdowns: false,
        jobListUpdated: false
    })

    const interview = reactive<{ scheduleModal: boolean }>({
        scheduleModal: false,
    })

    const userProfile = reactive<{ portfolioModal: boolean, portfolio: any, profile: any }>({
        portfolioModal: false,
        portfolio: null,
        profile: null
    })

    const jobPostingDropdowns = reactive<jobDropdownsInterface>({
        jobFunctions: [],
        jobIndustries: [],
        jobTypes: [],
        jobModes: [],
        jobLevels: [],
        skills: [],
        currencies: [],
    })

    const companyProfile = reactive<companyProfileInterface>({
        profileEditModal: false,
        socialLinksEditModal: false,
        industryEditModal: false,
        topInfoEditModal: false,
        techStackEditModal: false,
        data: null,
        resources: { employees: [], industry: [], countries: [] },
        isLoading: false,
        companyFound: false,
        avatar: '',
    })

    async function loadJobPostingDropdowns() {
        try {
            const [functions, levels, types, modes, industries, skills, currencies] = await Promise.all([
                api.jobFunctions(),
                api.jobLevels(),
                api.jobTypes(),
                api.jobModes(),
                api.jobCategories(),
                api.skills(),
                api.currencies(),
            ]);

            jobPostingDropdowns.jobFunctions = functions.data.body;
            jobPostingDropdowns.jobLevels = levels.data.body;
            jobPostingDropdowns.jobTypes = types.data.body;
            jobPostingDropdowns.jobModes = modes.data.body;
            jobPostingDropdowns.jobIndustries = industries.data.body;
            jobPostingDropdowns.skills = skills.data.body;
            jobPostingDropdowns.currencies = currencies.data.body;
            jobPosting.hasLoadedDropdowns = true;
        } catch (error) {
            console.error('Failed to load job posting dropdowns:', error);
        }
    }


    async function getCompanyInformation() {
        try {
            const resp = await api.recruiterCompanyInformation()
            if (resp.status == 204) {
                companyProfile.companyFound = false
            } else {
                companyProfile.data = resp.data
                companyProfile.avatar = resp.data?.avatar ?? 'https://dummyimage.com/150x150'
                companyProfile.companyFound = true
            }
            companyProfile.isLoading = false

        } catch (error) {
            // console.log(error);

        }
    }

    async function getCompanyResources() {
        try {
            const { data } = await api.recruiterCompanyResources()
            companyProfile.resources.employees = data.company_size
            companyProfile.resources.industry = data.industry
        } catch (error) {
            console.log(error);

        }
    }



    async function getJobApplication() {
        try {
            jobApplication.detailsLoading = true
            const { data } = await api.recruiterJobApplicationDetails(jobApplication.currentIdShowing)
            jobApplication.details = data
            jobApplication.detailsLoading = false;

            // get interview
            const interviewResp: any = await api.recruiterGetInterviews()
            const interviewData = interviewResp?.data ?? []
            jobApplication.interview = interviewData.find((x: { user_id: string }) => x.user_id == jobApplication.currentIdShowing)

        } catch (error) {
            // console.log(error);

        }
    }



    const jobPostingFieldsEmptyState: JobOpeningInterface = {
        job_level_id: '',
        job_function_id: '',
        industry_id: '',
        job_type_id: '',
        job_mode_id: '',
        title: '',
        required_skills: [],
        min_salary: '',
        max_salary: '',
        deadline: new Date(),
        location: '',
        job_url: '',
        job_email: '',

        description: '',
        qualifications: null,
        experience: '',
        other_qualifications: '',
        responsibilities: '',
        questions: null,

        capacity: '',
        currency_id: '1',
        status: '',

        benefits: [],

        temp_responsibilities: [{ descriptions: '' }],
        temp_WhoYouAre: [{ descriptions: '' }],
        temp_niceToHave: [{ descriptions: '' }],
        temp_questions: [{ questions: '' }],
        isSaving: false
    }

    const jobPostingFields = reactive({
        ...jobPostingFieldsEmptyState
    })


    async function editJobOpening(job: any) {
        const JSONrequired_skills = JSON.parse(job.required_skills)
        const JSONbenefits = JSON.parse(job.benefits)
        const JSONqualifications = JSON.parse(job.other_qualifications)

        let temp_niceToHave = [{ descriptions: '' }]
        let temp_responsibilities = [{ descriptions: '' }]
        let temp_WhoYouAre = [{ descriptions: '' }]

        if (JSONqualifications.length) {
            const JSONresp = JSONqualifications.find((x: { title: string }) => x.title == 'Responsibilities')
            if (JSONresp)
                temp_responsibilities = JSONresp.descriptions.map((x: any) => ({ descriptions: x }))

            const JSONnice = JSONqualifications.find((x: { title: string }) => x.title == 'Nice_To_Haves')
            if (JSONnice)
                temp_niceToHave = JSONnice.descriptions.map((x: any) => ({ descriptions: x }))

            const JSONWho = JSONqualifications.find((x: { title: string }) => x.title == 'Who_You_Are')
            if (JSONWho)
                temp_WhoYouAre = JSONWho.descriptions.map((x: any) => ({ descriptions: x }))
        }

        jobPosting.editingId = job.id

        jobPostingFields.job_level_id = parseInt(job.job_level_id);
        jobPostingFields.job_function_id = parseInt(job.job_function_id);
        jobPostingFields.industry_id = parseInt(job.industry_id);
        jobPostingFields.job_type_id = parseInt(job.job_type_id);
        jobPostingFields.job_mode_id = parseInt(job.job_mode_id);
        jobPostingFields.title = job.title;
        jobPostingFields.required_skills = JSONrequired_skills;
        if (job.min_salary)
            jobPostingFields.min_salary = job.min_salary.replace(/,/g, '');
        if (job.max_salary)
            jobPostingFields.max_salary = job.max_salary.replace(/,/g, '');
        jobPostingFields.deadline = new Date(job.deadline);
        jobPostingFields.location = job.location;

        jobPostingFields.description = job.description;

        if (job.job_url) isJobURLOrEmail.value = 'url'
        if (job.job_email) isJobURLOrEmail.value = 'email'

        jobPostingFields.job_url = job.job_url;
        jobPostingFields.job_email = job.job_email;
        jobPostingFields.qualifications = job.qualifications;
        jobPostingFields.experience = job.experience;
        jobPostingFields.other_qualifications = '';
        jobPostingFields.responsibilities = job.responsibilities;

        jobPostingFields.capacity = job.capacity;
        jobPostingFields.currency_id = job.currency_id;
        jobPostingFields.benefits = JSONbenefits;

        jobPostingFields.temp_responsibilities = temp_responsibilities
        jobPostingFields.temp_WhoYouAre = temp_WhoYouAre;
        jobPostingFields.temp_niceToHave = temp_niceToHave;
        jobPostingFields.temp_questions = job.questions;

        jobPosting.modal = !jobPosting.modal

    }

    function resetJobPostingForm() {
        jobPosting.editingId = null
        Object.assign(jobPostingFields, jobPostingFieldsEmptyState)
    }


    const hiringProgressList = ref<{ label: string, val: JobStatusInterface, desc?: string }[]>([
        { label: 'In-Review', val: 'IN_REVIEW', desc: 'The application is being reviewed to assess initial eligibility based on submitted materials.', },
        { label: 'Shortlisted', val: 'SHORTLISTED', desc: 'The candidate has passed the initial review and is under consideration for the next steps.', },
        { label: 'Interviewing', val: 'INTERVIEWING' },
        { label: 'Offered', val: 'OFFERED', desc: 'The candidate has successfully completed the process and is being offered the position.', },
        { label: 'Rejected', val: 'REJECTED', desc: 'The candidate is no longer being considered for the role and may receive feedback if available.', },
    ]);





    return {
        jobApplication,
        jobPosting,
        isJobURLOrEmail,
        loadJobPostingDropdowns,
        editJobOpening,
        resetJobPostingForm,
        getJobApplication,
        jobPostingDropdowns,
        jobPostingFields,

        companyProfile,
        getCompanyInformation,
        getCompanyResources,

        // usersOnSearch,

        interview,
        hiringProgressList,
        userProfile
    }
})
