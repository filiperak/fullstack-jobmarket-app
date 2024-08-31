import { Request, Response } from "express";
import { ConversationModel } from "../models/conversations";
interface ConversationRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}
export const createConversation = async (req: ConversationRequest,res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(404).json({ messaage: "user  not logged in" });
    }
    const { receiverId } = req.body;
    
    const conversation = await ConversationModel.create({
      participants: [userId, receiverId],
    });    
    res.status(200).json({ conversation });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const getMyConversations = async(req:ConversationRequest,res:Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(404).json({ messaage: "user  not logged in" });
        }
        const conversations = await ConversationModel.find({
            participants: { $in: [userId] },
          })
          .populate("participants", "username") 
          .populate("messages") 
          .exec()
          res.status(200).json({ conversations });
    } catch (error: any) {
        res.status(500).json({ message: error });
      }
}