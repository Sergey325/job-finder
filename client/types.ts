export type Applicant = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    qualification: string,
    jobPosition: string,
    cvUrl: string,
}

export type Vacancy = {
    _id: string,
    name: string
    description: string
    location: string
    salary: string
    workType: string,
    companyName: string
}

export type Contract = {
    _id: string,
    date: Date,
    companyName: string,
    applicantFullName: string,
    jobPosition: string,
    companyAddress: string
}