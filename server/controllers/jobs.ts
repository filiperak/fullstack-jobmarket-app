import { Request, Response } from "express";
import { JobModel } from "../models/jobs";
import { UserModel } from "../models/users";

interface JobRequest extends Request{
  user?: {
    userId: string;
    username: string;
};
}

export const getAllJobs = async (req: JobRequest, res: Response) => {    
  try {
    const jobs = await JobModel
    .find({})
    .populate('createdBy', 'username email');
    res.status(200).json({ jobs , numOfJobs:jobs.length,user:req.user});
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createJob = async (req: JobRequest, res: Response) => {
  try {
    req.body.createdBy = req.user?.userId
    const job = await JobModel.create(req.body)
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error });    
  }
};

export const applyToJob = async (req:JobRequest,res:Response) => {
  try {
    const jobId = req.params.id;
    const userId = req.user?.userId

    const job = await JobModel.findByIdAndUpdate(
      jobId,
      {$push: {applicants:userId}},
      {new: true}
    )
    res.status(200).json({message:'applied to job',job})
  } catch (error) {
    res.status(500).json({ message: error });    
  }
}



export const getJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.findOne({ _id: jobId });
    if (!job) return res.status(404).json({ message: "job not found" });
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.deleteOne({ _id: jobId });
    if (!job) return res.status(404).json({ message: "job not found" });
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



