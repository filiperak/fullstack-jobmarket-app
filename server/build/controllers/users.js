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
exports.getUser = exports.getAllUsers = exports.getUserByUsername = exports.login = exports.register = void 0;
const users_1 = require("../models/users");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const checkUserExists = yield users_1.UserModel.findOne({
            $or: [{ username: username }, { email: email }],
        });
        if (checkUserExists) {
            return res
                .status(400)
                .json({ message: "user with email/username alrady exists" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const tempUser = { username, email, password: hashedPassword };
        const user = yield users_1.UserModel.create(Object.assign({}, tempUser));
        const token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.username }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.status(201).json({ message: "user created", user: user, token });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "provide username/password" });
        }
        const user = yield users_1.UserModel.findOne({ username })
            .populate({
            path: "jobsCreated",
            populate: [
                {
                    path: "applicants",
                    select: "username email",
                },
                {
                    path: "createdBy",
                    select: "username email",
                },
            ],
        })
            .populate("jobsAppliedTo");
        if (!user) {
            return res.status(400).json({ message: "user dosen't exist" });
        }
        const correctPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!correctPassword) {
            return res.status(400).json({ message: "wrong password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.username }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.status(200).json({ message: "user logged in", user, token });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.login = login;
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        const queryObject = {};
        if (username) {
            queryObject.username = { $regex: username, $options: "i" };
        }
        const users = yield users_1.UserModel.find(queryObject);
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getUserByUsername = getUserByUsername;
//only for development
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.UserModel.find({});
        return res.status(201).json({ users });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //dodaj auth middelware
    try {
        const user = yield users_1.UserModel.findById(req.params.id)
            .populate({
            path: "jobsCreated",
            populate: [
                {
                    path: "applicants.applicant",
                    select: "username email",
                },
                {
                    path: "createdBy",
                    select: "username email",
                },
            ],
        })
            .populate({
            path: "jobsAppliedTo",
            select: "title jobLocation pay applicants",
            populate: [
                {
                    path: "createdBy",
                    select: "username email",
                },
                {
                    path: "applicants.applicant",
                    // match: {_id: req.params.id },
                    select: "username email status",
                },
            ],
        })
            .lean();
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res
            .status(200)
            .json({
            user,
            jobsCreated: user.jobsCreated,
            jobsAppliedTo: user.jobsAppliedTo,
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getUser = getUser;
