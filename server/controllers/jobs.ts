import { Request, Response } from "express";
import { JobModel } from "../models/jobs";
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
    const { title,city,range,sort } = req.query;
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
      .sort(sortOptions);
    res.status(200).json({ jobs, numOfJobs: jobs.length });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const createJob = async (req: JobRequest, res: Response) => {
  try {
    req.body.createdBy = req.user?.userId;
    const job = await JobModel.create(req.body);
    res.status(200).json({ job });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const applyToJob = async (req: JobRequest, res: Response) => {
  try {
    const jobId = req.params.id;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ messaage: "user  not logged in" });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(400).json({ messaage: "job not found" });
    }
    const checkIfUserApplied = job.applicants.includes(userObjectId);
    if (checkIfUserApplied)
      return res
        .status(400)
        .json({ message: "User has alrady applied to this job" });

    job.applicants.push(userObjectId);
    await job.save();
    res.status(200).json({ message: "Applied to job", job });
  } catch (error: any) {
    res.status(500).json({ message: "failed to apply", error });
  }
};
// export const applyToJob = async (req:JobRequest,res:Response) => {
//   try {
//     const jobId = req.params.id;
//     const userId = req.user?.userId
//     if(!userId){return res.status(400).json({messaage:'user  not logged in'})}

//     const job = await JobModel.findByIdAndUpdate(
//       jobId,
//       {$push: {applicants:userId}},
//       {new: true}
//     )
//     if(!jobId){return res.status(400).json({messaage:'job not found'})}
//     res.status(200).json({message:'Applied to job',job})
//   } catch (error:any) {
//     res.status(500).json({ message:'failed to apply' ,error });
//   }
// }

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
