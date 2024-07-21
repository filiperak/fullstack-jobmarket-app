import express from 'express'
import { createJob, deleteJob, getAllJobs, getJob } from '../controllers/jobs'


const JobsRouter = express.Router()
JobsRouter.route('/').get(getAllJobs).post(createJob)
JobsRouter.route('/:id').get(getJob).delete(deleteJob)

export default JobsRouter