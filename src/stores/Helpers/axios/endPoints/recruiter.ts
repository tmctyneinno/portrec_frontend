import { $instance, $instanceForm } from '../instances'

export default {
    recruiterRegister(data: any) {
        return $instance.post(`recruiter/signup`, JSON.stringify(data))
    },

    recruiterLogin(data: any) {
        return $instance.post(`recruiter/login`, JSON.stringify(data))
    },

    recruiterProfile() {
        return $instance.get(`recruiter/profile`)
    },

    recruiterUpdateProfile(data: any) {
        return $instance.post(`recruiter/profile/update`, JSON.stringify(data))
    },

    recruiterProfilePicture(form: FormData, id?: any) {
        const str: string = id ? `/recruiter/profile/picture/${id}` : `/recruiter/profile/picture`
        return $instanceForm.post(`${str}`, form)
    },

    recruiterPassword(data: any) {
        return $instance.post(`/recruiter/password`, JSON.stringify(data))
    },

    recruiterMessageSend(data: any) {
        return $instance.put(`/messages`, JSON.stringify(data))
    },


    recruiterJobsList(data: any) {
        return $instance.post(`recruiter/job/list`, JSON.stringify(data))
    },

    recruiterJobPosting(job: any) {
        return $instance.post(`recruiter/job/post`, JSON.stringify(job))
    },

    recruiterJobPostingUpdate(id: string | number, job: Object) {
        return $instance.post(`recruiter/job/update/${id}`, JSON.stringify(job))
    },

    recruiterJobDelete(id: any) {
        return $instance.delete(`recruiter/job/delete/${id}`,)
    },

    recruiterJobApplicationsList(data: Object) {
        return $instance.post(`recruiter/job/applications`, JSON.stringify(data))
    },
    recruiterJobApplicationDetails(applicationId: string | number) {
        return $instance.get(`recruiter/job/application/${applicationId}`)
    },

    recruiterJobsSelect() {
        return $instance.get(`recruiter/jobs/select`)
    }
}