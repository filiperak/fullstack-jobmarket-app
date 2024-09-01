"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const notifications_1 = require("../controllers/notifications");
const NotificationRouter = express_1.default.Router();
NotificationRouter.route('/').get(authentication_1.auth, notifications_1.getMyNotifications);
NotificationRouter.route('/send').post();
exports.default = NotificationRouter;
