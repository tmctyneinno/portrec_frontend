export interface ApplyJobInterface {
    isAuthUser: boolean,
    fullname: string,
    email: string,
    phone: string
    resume: string | Blob,
    resume_name: string,
    portfolio_url: string,
    cover_letter: string,
    answers: any[]
}

export interface JobOpeningInterface {
    job_level_id: string | number,
    job_function_id: string | number,
    industry_id: string | number,
    job_type_id: string | number,
    title: string,
    required_skills: [],
    min_salary: string | number,
    max_salary: string | number,
    deadline: Date,
    location: string,
    job_url: string,
    job_email: string,

    description: string,
    qualifications: null,
    experience: string,
    other_qualifications: string,
    responsibilities: string,
    capacity: string,
    currency_id: string,
    benefits: any[],
    questions: string | null,

    status?: string,
    temp_responsibilities: any[],
    temp_WhoYouAre: any[],
    temp_niceToHave: any[],
    temp_questions: any[],
    isSaving: Boolean
}

export interface UserProfileCardInterface {
    id: number,
    name: string,
    title: string,
    status: 'recommended' | 'promoted',
    skills: string[],
    experience: number | string,
    email: string,
    star: number | string,
    location: string,
    availability: string,
    avatar: string,
}

export interface PortfolioInterface {
    images: File[],
    title: string,
    goals: string,
    description: string,
    achievements: string,
    project_url: string,
}

export interface SummitInterface {
    id: string,
    title: string,
    image?: string,
    theme: string,
    summit_date: string,
    venue: string,
    speakers: { name: string, title: string }[],
    content?: any,
    link?: any
}

export type JobStatusInterface = 'ALL' | 'IN_REVIEW' | 'SHORTLISTED' | 'OFFERED' | 'REJECTED' | 'INTERVIEWING'

