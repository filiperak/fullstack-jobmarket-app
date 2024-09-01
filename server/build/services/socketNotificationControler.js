"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketNotifications = void 0;
const notification_1 = require("../models/notification");
const messages_1 = require("../models/messages");
const conversations_1 = require("../models/conversations");
const userSocketMap = {};
const handleSocketNotifications = (io) => {
    const namespace = io.of("/api/v1");
    namespace.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);
        socket.on("joinRoom", ({ userId }) => {
            socket.join(userId);
            userSocketMap[userId] = socket.id;
        });
        socket.on("sendNotification", (_a) => __awaiter(void 0, [_a], void 0, function* ({ senderId, receiverId, content }) {
            console.log(`Notification content: ${content}, Sender: ${senderId}, Receiver: ${receiverId}`);
            try {
                const notification = new notification_1.NotificationModel({
                    sender: senderId,
                    receiver: receiverId,
                    content,
                });
                yield notification.save();
                socket.to(receiverId).emit("notification", notification);
            }
            catch (error) {
                console.log("Error:", error);
            }
        }));
        socket.on("sendMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ senderId, receiverId, content, conversationId }) {
            console.log(`Notification content: ${content}, Sender: ${senderId}, Receiver: ${receiverId}`);
            try {
                const message = new messages_1.MessageModel({
                    sender: senderId,
                    receiver: receiverId,
                    content,
                });
                yield message.save();
                socket.emit("receiveMessage", message);
                socket.to(receiverId).emit("receiveMessage", message);
                const conversation = yield conversations_1.ConversationModel.findById(conversationId);
                if (conversation) {
                    conversation.messages.push(message._id);
                    yield conversation.save();
                }
                else {
                    console.log("Conversation not found");
                }
            }
            catch (error) {
                console.log("Error:", error);
            }
        }));
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};
exports.handleSocketNotifications = handleSocketNotifications;
