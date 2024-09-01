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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect_1 = __importDefault(require("./db/connect"));
const jobs_1 = __importDefault(require("./routes/jobs"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const notification_1 = __importDefault(require("./routes/notification"));
const socketNotificationControler_1 = require("./services/socketNotificationControler");
const messages_1 = __importDefault(require("./routes/messages"));
const conversations_1 = __importDefault(require("./routes/conversations"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", //promeni u locanhost300 ili port od fe
        methods: ["GET", "POST"],
    },
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 5000;
app.use("/api/v1/jobs", jobs_1.default);
app.use("/api/v1/users", users_1.default);
app.use("/api/v1/notifications", notification_1.default);
app.use("/api/v1/messages", messages_1.default);
app.use("/api/v1/conversations", conversations_1.default);
(0, socketNotificationControler_1.handleSocketNotifications)(io);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)(process.env.MONGO_URI);
        server.listen(port, () => {
            console.log(`server is running on ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
