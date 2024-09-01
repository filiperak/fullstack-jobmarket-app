"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_1 = require("../controllers/messages");
const MessageRouter = express_1.default.Router();
MessageRouter.route('/:userId/:receiverId').get(messages_1.getMessages);
exports.default = MessageRouter;
