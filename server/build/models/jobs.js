"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const JobsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "must provide job title"],
        minlength: 3,
    },
    description: {
        type: String,
        required: [true, "must provide job description"],
    },
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    //applicants:{type:[mongoose.Schema.Types.ObjectId], ref : "User",default:[]},
    applicants: [
        {
            applicant: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
            status: {
                type: String,
                enum: ["pending", "accepted", "declined"],
                default: "pending",
            },
        },
    ],
    active: {
        type: Boolean,
        default: true
    },
    pay: {
        amount: {
            type: Number,
            required: [true, "Must provide pay amount"],
        },
        typeOfPay: {
            type: String,
            enum: ["hourly", "daily", "weekly", "monthly", "yearly"],
            required: [true, "Must provide the type of pay"],
        },
    },
    jobLocation: {
        country: {
            type: String,
            default: 'Serbia',
        },
        city: {
            type: String,
            required: [true, "Must provide city"],
        },
    },
}, { timestamps: true });
exports.JobModel = mongoose_1.default.model("Job", JobsSchema);
