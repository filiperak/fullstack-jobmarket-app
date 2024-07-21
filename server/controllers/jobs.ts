import { Request, Response } from "express";
import { JobModel } from "../models/jobs";

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await JobModel.find({});
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await JobModel.create(req.body);
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.findOne({ _id: jobId });
    if (!job) return res.status(404).json({ msg: "job not found" });
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.deleteOne({ _id: jobId });
    if (!job) return res.status(404).json({ msg: "job not found" });
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};



