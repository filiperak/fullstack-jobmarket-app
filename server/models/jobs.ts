import mongoose, { Model, Schema } from "mongoose";

interface IJob extends Document {
    title: string;
    description: string;
    createdBy: mongoose.Types.ObjectId;
    applicants:mongoose.Types.ObjectId;
  }

const JobsSchema:Schema<IJob> = new Schema({
  title: {
    type: String,
    required: [true, "must provide job title"]
   },
   description: {
     type: String,
     required: [true, "must provide job description"],
   },
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   applicants:{type:mongoose.Schema.Types.ObjectId, ref : "User"},
},  
 {timestamps:true}
);

export const JobModel:Model<IJob> = mongoose.model("Job", JobsSchema);
