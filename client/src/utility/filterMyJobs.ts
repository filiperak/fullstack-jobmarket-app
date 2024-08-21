import { IJobsAppliedTo } from "../interface/props";

export const filterMyJobs = (arr:IJobsAppliedTo[],userId:String) => {
    return arr.map(job => {
        return {
            ...job,
            applicants: job.applicants.filter(applicant => applicant.applicant._id.toString() == userId)
        };
    });
}