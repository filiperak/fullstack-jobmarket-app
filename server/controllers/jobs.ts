import { Request,Response } from "express"

export const getAllJobs = async (req:Request,res:Response) => {
    try {
        res.status(200).send('alljobs')
    } catch (error) {
        res.status(500).json({msg:error})
    }
}