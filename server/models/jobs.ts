import mongoose, { Model, Schema } from "mongoose";

type payType = {
  amount:number;
  typeOfpay:string;
}
type jobLocationType = {
  country:string;
  city:string
}

interface IJob extends Document {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  applicants:mongoose.Types.ObjectId[];
  active:boolean;
  pay:payType;
  jobLocation:jobLocationType;
}

const JobsSchema:Schema<IJob> = new Schema({
  title: {
    type: String,
    required: [true, "must provide job title"],
    minlength:3,
   },
   description: {
     type: String,
     required: [true, "must provide job description"],
   },
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   applicants:{type:[mongoose.Schema.Types.ObjectId], ref : "User",default:[]},
   active:{
    type:Boolean,
    default:true
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
      required: [true, "Must provide country"],
    },
    city: {
      type: String,
      required: [true, "Must provide city"],
    },
  },
},  
 {timestamps:true}
);

export const JobModel:Model<IJob> = mongoose.model("Job", JobsSchema);
