import { reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/stores/Helpers/axios'
import type { JobOpening } from '@/stores/interfaces'

export const useRecruiterCommonStore = defineStore('recruiterCommonStore', () => {
    const applicants = reactive<{
        showing: 'list' | 'details',
        currentIdShowing: string
    }>({
        showing: 'list',
        currentIdShowing: ''
    })

    const jobPosting = reactive({
        modal: false,
        stage: 1,
        editingId: null,
        hasLoadedDropdowns: false,
        jobListUpdated: false
    })

    const jobPostingDropdowns = reactive<any>({
        jobFunctions: [],
        jobIndustries: [],
        jobTypes: [],
        jobLevels: [],
        skills: [],
    })


    async function loadJobPostingDropdowns() {
        try {
            const functions = await api.jobFunctions()
            jobPostingDropdowns.jobFunctions = functions.data.body
            const levels = await api.jobLevels()
            jobPostingDropdowns.jobLevels = levels.data.body
            const types = await api.jobTypes()
            jobPostingDropdowns.jobTypes = types.data.body
            const industries = await api.jobIndustries()
            jobPostingDropdowns.jobIndustries = industries.data.body
            const skills = await api.skills()
            jobPostingDropdowns.skills = skills.data.body
            jobPosting.hasLoadedDropdowns = true
        } catch (error) {
            console.log(error);

        }
    }




    const jobPostingFieldsEmptyState: JobOpening = {
        job_level_id: '',
        job_function_id: '',
        industry_id: '',
        job_type_id: '',
        title: '',
        required_skills: [],
        min_salary: '',
        max_salary: '',
        deadline: new Date(),
        location: '',

        description: '',
        qualifications: null,
        experience: '',
        other_qualifications: '',
        responsibilities: '',

        capacity: '',
        // status: '',

        benefits: [],

        temp_responsibilities: [{ descriptions: '' }],
        temp_WhoYouAre: [{ descriptions: '' }],
        temp_niceToHave: [{ descriptions: '' }],
        isSaving: false
    }

    const jobPostingFields = reactive({
        ...jobPostingFieldsEmptyState
    })


    async function editJobOpening(job: any) {
        console.log(job);


        if (!jobPosting.hasLoadedDropdowns) await loadJobPostingDropdowns()

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

            const JSONWho = JSONqualifications.find((x: { title: string }) => x.title == 'Who_We_Are')
            if (JSONWho)
                temp_WhoYouAre = JSONWho.descriptions.map((x: any) => ({ descriptions: x }))
        }

        jobPosting.editingId = job.id

        jobPostingFields.job_level_id = parseInt(job.job_level_id);
        jobPostingFields.job_function_id = parseInt(job.job_function_id);
        jobPostingFields.industry_id = parseInt(job.industry_id);
        jobPostingFields.job_type_id = parseInt(job.job_type_id);
        jobPostingFields.title = job.title;
        jobPostingFields.required_skills = JSONrequired_skills;
        jobPostingFields.min_salary = job.min_salary.replace(/,/g, '');
        jobPostingFields.max_salary = job.max_salary.replace(/,/g, '');
        jobPostingFields.deadline = new Date(job.deadline);
        jobPostingFields.location = job.location;

        jobPostingFields.description = job.description;
        jobPostingFields.qualifications = job.qualifications;
        jobPostingFields.experience = job.experience;
        jobPostingFields.other_qualifications = '';
        jobPostingFields.responsibilities = job.responsibilities;

        jobPostingFields.capacity = job.capacity;
        jobPostingFields.benefits = JSONbenefits;

        jobPostingFields.temp_responsibilities = temp_responsibilities
        jobPostingFields.temp_WhoYouAre = temp_WhoYouAre;
        jobPostingFields.temp_niceToHave = temp_niceToHave;

        jobPosting.modal = !jobPosting.modal

    }

    function resetJobPostingForm() {
        jobPosting.editingId = null
        Object.assign(jobPostingFields, jobPostingFieldsEmptyState)
    }


    return {
        applicants,
        jobPosting,
        loadJobPostingDropdowns,
        editJobOpening,
        resetJobPostingForm,
        jobPostingDropdowns,
        jobPostingFields
    }
})
