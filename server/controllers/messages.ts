import { MessageModel } from "../models/messages";
import { Request, Response } from "express";

export const getMessages = async(req:Request,res:Response) => {
    const {userId,receiverId} = req.params;
    try {
        const message = await MessageModel.find({
            $or: [
                { sender: userId, receiver: receiverId },
                { sender: receiverId, receiver: userId },
              ],
        })
        .sort({timestamp:1})
        res.status(200).json({message})
    } catch (error: any) {
        res.status(500).json({ message: error });
      }
}