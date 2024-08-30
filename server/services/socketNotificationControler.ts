import { Server as SocketIOServer, Socket } from "socket.io";
import { NotificationModel } from "../models/notification";
import { MessageModel } from "../models/messages";

interface UserSocketMap {
  [key: string]: string;
}

const userSocketMap: UserSocketMap = {};

export const handleSocketNotifications = (io: SocketIOServer) => {
    const namespace = io.of("/api/v1")

  namespace.on("connection", (socket: Socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("joinRoom", ({ userId }) => {
      socket.join(userId);
      userSocketMap[userId] = socket.id;
    });

    socket.on("sendNotification", async ({ senderId, receiverId, content }) => {
      console.log(
        `Notification content: ${content}, Sender: ${senderId}, Receiver: ${receiverId}`
      );

      try {
        const notification = new NotificationModel({
          sender: senderId,
          receiver: receiverId,
          content,
        });

        await notification.save();
        socket.to(receiverId).emit("notification", notification);
      } catch (error) {
        console.log("Error saving notification:", error);
      }
    });

    socket.on("sendMessage",async({senderId,receiverId,content}) => {
      console.log(
        `Notification content: ${content}, Sender: ${senderId}, Receiver: ${receiverId}`
      );
      try {
        const message = new MessageModel({
          sender: senderId,
          receiver: receiverId,
          content,
        })
        await message.save();
        //socket.to(senderId).emit("receiveMessage",message)
        socket.emit("receiveMessage",message)
        socket.to(receiverId).emit("receiveMessage",message)
        //socket.emit("receiveMessage",message)
      } catch (error) {
        console.log("Error saving notification:", error);
      }
    })
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
