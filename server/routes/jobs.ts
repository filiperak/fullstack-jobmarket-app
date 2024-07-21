import express from 'express'
import { getAllJobs } from '../controllers/jobs'


const JobsRouter = express.Router()
JobsRouter.route('/').get(getAllJobs)

export default JobsRouter