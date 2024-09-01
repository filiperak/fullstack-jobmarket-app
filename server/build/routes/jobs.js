"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobs_1 = require("../controllers/jobs");
const authentication_1 = require("../middleware/authentication");
const JobsRouter = express_1.default.Router();
JobsRouter.route('/').get(jobs_1.getAllJobs).post(authentication_1.auth, jobs_1.createJob);
JobsRouter.route('/:id').get(jobs_1.getJob).delete(authentication_1.auth, jobs_1.deleteJob).patch(authentication_1.auth, jobs_1.applyToJob);
JobsRouter.route('/:jobId/applicants/:applicantId').patch(authentication_1.auth, jobs_1.menageApplicant);
exports.default = JobsRouter;
