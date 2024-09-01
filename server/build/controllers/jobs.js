"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menageApplicant = exports.deleteJob = exports.getJob = exports.applyToJob = exports.createJob = exports.getAllJobs = void 0;
const jobs_1 = require("../models/jobs");
const users_1 = require("../models/users");
const mongoose_1 = __importDefault(require("mongoose"));
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, city, range, sort, skip, limit } = req.query;
        const skipVal = parseInt(typeof skip === 'string' ? skip : '0', 10);
        const limitVal = parseInt(typeof limit === 'string' ? limit : '10', 10);
        const queryObject = {};
        if (title) {
            queryObject.title = { $regex: title, $options: "i" };
        }
        if (city) {
            queryObject['jobLocation.city'] = city;
        }
        if (range) {
            const minRange = parseInt(range, 10);
            queryObject['pay.amount'] = { $gte: minRange };
        }
        let sortOptions = {};
        if (sort === 'priceAscending') {
            sortOptions = { 'pay.amount': 1 };
        }
        else if (sort === 'priceDescending') {
            sortOptions = { 'pay.amount': -1 };
        }
        else if (sort === 'latest') {
            sortOptions = { createdAt: -1 };
        }
        else if (sort === 'earliest') {
            sortOptions = { createdAt: 1 };
        }
        const jobs = yield jobs_1.JobModel.find(queryObject)
            .populate("createdBy", "username email")
            .populate("applicants", "username email")
            .skip(skipVal)
            .limit(limitVal)
            .sort(sortOptions);
        res.status(200).json({ jobs, numOfJobs: jobs.length });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllJobs = getAllJobs;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(404).json({ messaage: "user  not logged in" });
        }
        req.body.createdBy = userId;
        const job = yield jobs_1.JobModel.create(req.body);
        const userObject = yield users_1.UserModel.findById(userId);
        if (!userObject) {
            return res.status(404).json({ messaage: "user  not found" });
        }
        userObject.jobsCreated.push(job.id);
        yield userObject.populate("jobsCreated");
        yield userObject.save();
        res.status(200).json({ job, createdJobs: userObject.jobsCreated });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createJob = createJob;
const applyToJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const jobId = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(404).json({ messaage: "user  not logged in" });
        }
        const user = yield users_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const job = yield jobs_1.JobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "job not found" });
        }
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const checkIfUserApplied = job.applicants
            .map((applicant) => applicant.applicant.toString())
            .includes(userId);
        if (checkIfUserApplied) {
            return res.status(400).json({ message: "User has alrady applied to this job" });
        }
        yield user.populate("jobsAppliedTo");
        job.applicants.push({ applicant: userObjectId, status: "pending" });
        user === null || user === void 0 ? void 0 : user.jobsAppliedTo.push(job._id);
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield job.save();
        res.status(200).json({ message: "Applied to job", job, user: user.jobsAppliedTo });
    }
    catch (error) {
        res.status(500).json({ message: "failed to apply", error });
    }
});
exports.applyToJob = applyToJob;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.id;
        const job = yield jobs_1.JobModel.findOne({ _id: jobId }).populate("createdBy", "username email");
        if (!job)
            return res.status(404).json({ message: "job not found" });
        res.status(200).json({ job });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getJob = getJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.id;
        const job = yield jobs_1.JobModel.deleteOne({ _id: jobId });
        if (!job)
            return res.status(404).json({ message: "job not found" });
        res.status(200).json({ job });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteJob = deleteJob;
const menageApplicant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(404).json({ messaage: "user  not logged in" });
        }
        const { jobId, applicantId } = req.params;
        const { action } = req.body;
        const job = yield jobs_1.JobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'job not found' });
        }
        if (job.createdBy._id.toString() !== userId) {
            res.status(400).json({ message: 'you are not authorized for thiss action' });
        }
        console.log(applicantId);
        const applicant = job.applicants.find(applicant => applicant.applicant.toString() === applicantId);
        if (!applicant) {
            return res.status(404).json({ message: 'applicant not found', test: job.applicants });
        }
        applicant.status = action === 'accepted' ? 'accepted' : 'declined';
        yield job.save();
        res.status(200).json({ message: `Applicant ${action}ed successfully`, job });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.menageApplicant = menageApplicant;
