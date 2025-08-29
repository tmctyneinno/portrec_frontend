import { $instance, $instancePublic, $instanceForm } from '../instances'

export default {

    allJobs(queryStr?: string) {
        return $instance.get(`job/all${queryStr}`)
    },

    latestJobs() {
        return $instance.get(`job/all/latest`)
    },

    featuredJobs(queryStr?: string) {
        return $instance.get(`get/featured/jobs${queryStr}`)
    },

    jobDetails(id: any) {
        return $instancePublic.get(`job/${id}`)
    },

    similarJobs(id: any) {
        return $instancePublic.get(`job/all/similar/${id}`)
    },

    jobCategories() {
        return $instancePublic.get(`job/industries`)
    },

    jobTypes() {
        return $instancePublic.get(`job/types`)
    },

    jobModes() {
        return $instancePublic.get(`job/modes`)
    },

    jobQualifications() {
        return $instancePublic.get(`job/qualifications`)
    },

    jobLevels() {
        return $instancePublic.get(`job/levels`)
    },

    jobFunctions() {
        return $instancePublic.get(`job/functions`)
    },

    skills() {
        return $instancePublic.get(`job/skills`)
    },

    currencies() {
        return $instancePublic.get(`job/currencies`)
    },

    searchByLocation(title: string, location: string) {
        // return $instance.get(`/job/search?location=fIe790x166&title=JuPAEBt7nY`)
        return $instance.get(`/job/search?location=${location}&title=${title}`)
    },

    applyJob(form: FormData) {
        return $instanceForm.post(`job/apply`, form)
    },

    applyJobGuest(form: FormData) {
        return $instanceForm.post(`job/apply/guest`, form)
    },
}