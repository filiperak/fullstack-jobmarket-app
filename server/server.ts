import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect";
import JobsRouter from "./routes/jobs";
import cors from "cors";
import UserRouter from "./routes/users";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import NotificationRouter from "./routes/notification";
import { NotificationModel } from "./models/notification";

const app = express();

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", //promeni u locanhost300 ili port od fe
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.use("/api/v1/jobs", JobsRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/notifications", NotificationRouter);

interface UserSocketMap {
  [key: string]: string;
}

const userSocketMap: UserSocketMap = {};

io.on("connection", (socket) => {
  console.log(`new client joined ${socket.id}`);
  socket.on("joinRoom", ({ userId }) => {
    socket.join(userId);
  });

  socket.on("sendNotification", async ({ senderId, receiverId, content }) => {
    console.log(`$nessto se desava ${content} ${senderId} ${receiverId}`);

    const notification = new NotificationModel({
      sender: senderId,
      receiver: receiverId,
      content,
    });
    await notification.save();
    socket.to(receiverId).emit(`notification`, notification);
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    server.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
