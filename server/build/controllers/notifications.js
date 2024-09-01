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
exports.getMyNotifications = void 0;
const notification_1 = require("../models/notification");
const getMyNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(404).json({ messaage: "user  not logged in" });
        }
        const notifications = yield notification_1.NotificationModel.find({ receiver: userId })
            .sort({ createdAt: -1 });
        res
            .status(200)
            .json({ notifications, notificationsNum: notifications.length });
    }
    catch (error) {
        res.status(500).json({ message: "failed to get notifications", error });
    }
});
exports.getMyNotifications = getMyNotifications;
