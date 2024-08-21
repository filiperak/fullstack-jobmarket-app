import express from 'express'
import { applyToJob, createJob, deleteJob, getAllJobs, getJob, menageApplicant } from '../controllers/jobs'
import { auth } from '../middleware/authentication'


const JobsRouter = express.Router()
JobsRouter.route('/').get(getAllJobs).post(auth,createJob)
JobsRouter.route('/:id').get(getJob).delete(auth,deleteJob).patch(auth,applyToJob)
JobsRouter.route('/:jobId/applicants/:applicantId').patch(auth,menageApplicant)

export default JobsRouter