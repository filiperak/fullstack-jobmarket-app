import express from 'express'
import { createJob, deleteJob, getAllJobs, getJob } from '../controllers/jobs'
import { auth } from '../middleware/authentication'


const JobsRouter = express.Router()
JobsRouter.route('/').get(auth,getAllJobs)//.post(createJob)
JobsRouter.route('/:id').get(getJob).delete(deleteJob)

export default JobsRouter