"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const UserRouter = express_1.default.Router();
UserRouter.route('/register').post(users_1.register);
UserRouter.route('/login').post(users_1.login);
UserRouter.route('/getUsers').get(users_1.getUserByUsername);
//for development
UserRouter.route('/all').get(users_1.getAllUsers);
UserRouter.route('/:id').get(users_1.getUser);
exports.default = UserRouter;
