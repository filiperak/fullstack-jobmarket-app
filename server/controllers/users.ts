import { JobModel } from "../models/jobs";
import { UserModel } from "../models/users";
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'

export const register = async (req:Request,res:Response) => {
    try {
        const {username,email,password} = req.body
        const checkUserExists = await UserModel.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })
        if(checkUserExists){
            return res.status(400).json({message:'user with email/username alrady exists'})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const tempUser = ({username,email,password:hashedPassword})
        const user = await UserModel.create({...tempUser})
        res.status(201).json({msg:'user created',user:user})
    } catch (error) {
        res.status(500).json({ msg: error });    
    }
}

//only for development
export const getAllUsers = async (req:Request,res:Response) => {
    try {
        const users = await UserModel.find({})
        return res.status(201).json({users})
    } catch (error) {
        res.status(500).json({ msg: error });    

    }
}

export const getUser = async (req:Request,res:Response) => {
    try {
        const user = await UserModel.findById(req.params.id).populate('appliedJobs');
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ msg: error });   
    }
}
