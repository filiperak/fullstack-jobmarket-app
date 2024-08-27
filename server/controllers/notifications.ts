import { Request, Response } from "express";
import { NotificationModel } from "../models/notification";

interface UserRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}

export const getMyNotifications = async (req: UserRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(404).json({ messaage: "user  not logged in" });
    }
    const notifications = await NotificationModel.find({ receiver: userId })
    .sort({createdAt:-1})

    res
      .status(200)
      .json({ notifications, notificationsNum: notifications.length });
  } catch (error: any) {
    res.status(500).json({ message: "failed to get notifications", error });
  }
};
