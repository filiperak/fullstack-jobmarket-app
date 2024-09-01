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
exports.getMessages = void 0;
const messages_1 = require("../models/messages");
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, receiverId } = req.params;
    try {
        const message = yield messages_1.MessageModel.find({
            $or: [
                { sender: userId, receiver: receiverId },
                { sender: receiverId, receiver: userId },
            ],
        })
            .sort({ timestamp: 1 });
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getMessages = getMessages;
