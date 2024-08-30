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
import { handleSocketNotifications } from "./services/socketNotificationControler";
import MessageRouter from "./routes/messages";
import ConversationRouter from "./routes/conversations";

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
app.use("api/v1/messages",MessageRouter)
app.use("api/v1/conversations",ConversationRouter)

handleSocketNotifications(io)


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
