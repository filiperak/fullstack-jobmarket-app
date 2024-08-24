import { Request, Response } from "express";
import { IApplicants, JobModel } from "../models/jobs";
import { UserModel } from "../models/users";
import mongoose from "mongoose";

interface JobRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}
export interface IqueryObject {
  title?: { $regex: string; $options: string };
  'jobLocation.city'?: string;
  'pay.amount'?: { $gte: number };
}


export const getAllJobs = async (req: JobRequest, res: Response) => {
  try {
    const { title,city,range,sort,skip,limit } = req.query;
    const skipVal = parseInt(typeof skip === 'string' ? skip : '0', 10);
    const limitVal = parseInt(typeof limit === 'string' ? limit : '10', 10);

    const queryObject: IqueryObject = {};
    if (title) {
      queryObject.title = { $regex: title as string, $options: "i" };
    }
    if(city){
      queryObject['jobLocation.city'] = city as string
    }
    if(range){
      const minRange = parseInt(range as string,10)
      queryObject['pay.amount'] = {$gte:minRange}
    }
    let sortOptions:any = {}
    if (sort === 'priceAscending') {
      sortOptions = { 'pay.amount': 1 };
    } else if (sort === 'priceDescending') {
      sortOptions = { 'pay.amount': -1 };
    } else if (sort === 'latest') {
      sortOptions = { createdAt: -1 };
    } else if (sort === 'earliest') {
      sortOptions = { createdAt: 1 };
    }
    const jobs = await JobModel.find(queryObject)
      .populate("createdBy", "username email")
      .populate("applicants","username email")
      .skip(skipVal)
      .limit(limitVal)
      .sort(sortOptions);
    res.status(200).json({ jobs, numOfJobs: jobs.length });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const createJob = async (req: JobRequest, res: Response) => {
  try {
    const userId = req.user?.userId
    if (!userId) {
      return res.status(404).json({ messaage: "user  not logged in" });
    }
    req.body.createdBy = userId;
    const job = await JobModel.create(req.body);
    const userObject = await UserModel.findById(userId)
    if (!userObject) {
      return res.status(404).json({ messaage: "user  not found" });
    }
    userObject.jobsCreated.push(job.id)
    await userObject.populate("jobsCreated")
    await userObject.save()
    res.status(200).json({ job , createdJobs:userObject.jobsCreated });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const applyToJob = async (req: JobRequest, res: Response) => {
  try {
    const jobId = req.params.id;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(404).json({ messaage: "user  not logged in" });
    }
    
    const user = await UserModel.findById(userId)
    if(!user){
      return res.status(404).json({message:'user not found'})
    }
    
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "job not found" });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const checkIfUserApplied = job.applicants
    .map((applicant:IApplicants) => applicant.applicant.toString())
    .includes(userId);
    if (checkIfUserApplied){
      return res.status(400).json({ message: "User has alrady applied to this job" });
    }
    await user.populate("jobsAppliedTo")

    job.applicants.push({ applicant: userObjectId, status: "pending" });
    user?.jobsAppliedTo.push(job._id)
    
    await user?.save()
    await job.save();

    res.status(200).json({ message: "Applied to job", job ,user :user.jobsAppliedTo});
  } catch (error: any) {
    res.status(500).json({ message: "failed to apply", error });
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.findOne({ _id: jobId }).populate(
      "createdBy",
      "username email"
    );
    if (!job) return res.status(404).json({ message: "job not found" });
    res.status(200).json({ job });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.deleteOne({ _id: jobId });
    if (!job) return res.status(404).json({ message: "job not found" });
    res.status(200).json({ job });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};
export const menageApplicant = async(req:JobRequest,res:Response) => {

  try {
    const userId = req.user?.userId
    if (!userId) {
      return res.status(404).json({ messaage: "user  not logged in" });
    }
    const {jobId,applicantId} = req.params;
    const {action} = req.body;


    const job = await JobModel.findById(jobId);
    if(!job){
      return res.status(404).json({message:'job not found'})
    }

    if(job.createdBy._id.toString() !== userId){
      res.status(400).json({message:'you are not authorized for thiss action'})
    }
    console.log(applicantId);
    
    const applicant = job.applicants.find(applicant => 
      applicant.applicant.toString() === applicantId
    
    )
    if (!applicant) {
      return res.status(404).json({ message: 'applicant not found', test:job.applicants});
    }
    applicant.status = action === 'accepted' ? 'accepted':'declined'
    await job.save()

    res.status(200).json({ message: `Applicant ${action}ed successfully`, job });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
}