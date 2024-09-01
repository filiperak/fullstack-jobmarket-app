"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const conversations_1 = require("../controllers/conversations");
const ConversationRouter = express_1.default.Router();
ConversationRouter.route('/').get(authentication_1.auth, conversations_1.getMyConversations);
ConversationRouter.route('/').post(authentication_1.auth, conversations_1.createConversation);
ConversationRouter.route('/').patch();
exports.default = ConversationRouter;
