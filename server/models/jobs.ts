import mongoose, { Model, Schema } from "mongoose";

interface IJob extends Document {
    title: string;
    description: string;
    numOfWorkers: number;
    typeOfPay: 'perHour' | 'perDay' | 'perJob';
    price: string | number;
    country: string;
    city?: string;
    created_at: Date;
    expires?: Date;
    active: boolean;
    postedBy: mongoose.Types.ObjectId;
    applicants: mongoose.Types.ObjectId[];
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
   numOfWorkers:{
     type:Number,
     required: [true, "must provide number of workers needed"],
   },
   typeOfPay:{
     type:String,
     enum:['perHour','perDay','perJob'],
   },
   price:{
     type:Schema.Types.Mixed,
     default:'no price listed'
   },
   country: {
     type: String,
     default: "worldwide",
   },
   city: {
     type: String,
   },
   created_at: {
     type: Date,
     default: Date.now(),
   },
   expires: {
    type: Date,
    default: Date.now(),
   },
   active: {
     type: Boolean,
     default: true,
   },
   postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const JobModel:Model<IJob> = mongoose.model("Job", JobsSchema);
