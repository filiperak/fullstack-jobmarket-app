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
exports.getMyConversations = exports.createConversation = void 0;
const conversations_1 = require("../models/conversations");
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(404).json({ messaage: "user  not logged in" });
        }
        const { receiverId } = req.body;
        const conversation = yield conversations_1.ConversationModel.create({
            participants: [userId, receiverId],
        });
        res.status(200).json({ conversation });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createConversation = createConversation;
const getMyConversations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(404).json({ messaage: "user  not logged in" });
        }
        const conversations = yield conversations_1.ConversationModel.find({
            participants: { $in: [userId] },
        })
            .populate("participants", "username")
            .populate({
            path: "messages",
            options: { sort: { createdAt: -1 } }
        })
            .sort({ updatedAt: -1 })
            .exec();
        res.status(200).json({ conversations });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getMyConversations = getMyConversations;
