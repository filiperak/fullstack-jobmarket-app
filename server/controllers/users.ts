import { JobModel } from "../models/jobs";
import { UserModel } from "../models/users";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    //vrv bespotrebno, nemoj da brises ipak
    const checkUserExists = await UserModel.findOne({
      $or: [
        { username: username },
         { email: email }
        ],
    });
    if (checkUserExists) {
      return res.status(400).json({ message: "user with email/username alrady exists" });
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

    res.status(201).json({ msg: "user created", user: user,token});
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) throw new Error();
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "user dosen't exist" });
        }
        const correctPassword = await bcryptjs.compare(password,user.password)
        if(!correctPassword){
            return res.status(400).json({ message: "wrong password" });
        }
        const token = jwt.sign(
            { userId: user._id, name: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: "30d" }
        );
        res.status(200).json({msg:'user logged in',user,token})
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};




//only for development
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    return res.status(201).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id).populate(
      "appliedJobs"
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
