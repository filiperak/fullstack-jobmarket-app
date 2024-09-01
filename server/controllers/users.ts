import { JobModel } from "../models/jobs";
import { UserModel } from "../models/users";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const checkUserExists = await UserModel.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (checkUserExists) {
      return res
        .status(400)
        .json({ message: "user with email/username alrady exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const tempUser = { username, email, password: hashedPassword };
    const user = await UserModel.create({ ...tempUser });

    const token = jwt.sign(
      { userId: user._id, name: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    res.status(201).json({ message: "user created", user: user, token });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password){
      return res.status(400).json({message:"provide username/password"})
    }
    const user = await UserModel.findOne({ username })
      .populate({
        path: "jobsCreated",
        populate: [
          {
            path: "applicants",
            select: "username email",
          },
          {
            path: "createdBy",
            select: "username email",
          },
        ],
      })
      .populate("jobsAppliedTo");
    if (!user) {
      return res.status(400).json({ message: "user dosen't exist" });
    }
    const correctPassword = await bcryptjs.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ message: "wrong password" });
    }
    const token = jwt.sign(
      { userId: user._id, name: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );
    res.status(200).json({ message: "user logged in", user, token });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

interface IqueryObject {
  username?:{$regex:string ; $options:string}
}
export const getUserByUsername = async(req:Request,res:Response) => {
  try {
    const {username} = req.query
    const queryObject:IqueryObject = {};
    if(username){
      queryObject.username = {$regex:username as string , $options: "i"}
    }
    const users = await UserModel.find(queryObject)
    res.status(200).json({users})
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
}

//only for development
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    return res.status(201).json({ users });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  //dodaj auth middelware
  try {
    const user = await UserModel.findById(req.params.id)
      .populate({
        path: "jobsCreated",
        populate: [
          {
            path: "applicants.applicant",
            select: "username email",
          },
          {
            path: "createdBy",
            select: "username email",
          },
        ],
      })
      .populate({
        path: "jobsAppliedTo",
        select: "title jobLocation pay applicants",
        populate: [
          {
            path: "createdBy",
            select: "username email",
          },
          {
            path: "applicants.applicant",
           // match: {_id: req.params.id },
            select: "username email status",
          },
 
        ],
      })
      .lean();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res
      .status(200)
      .json({
        user,
        jobsCreated: user.jobsCreated,
        jobsAppliedTo: user.jobsAppliedTo,
      });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};
