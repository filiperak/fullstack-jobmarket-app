import mongoose, { Model, Schema } from "mongoose";

interface IUser extends Document {
    username:string,
    email:string,
    password:string,
    jobsCreated:mongoose.Types.ObjectId[];
    jobsAppliedTo:mongoose.Types.ObjectId[];
}

const UsersSchema:Schema<IUser> = new Schema ({
    username:{
        type:String,
        required:[true,'provide name'],
        minlength:3,
        maxlength:30,
    },
    email:{
        type:String,
        required:[true,'provide name'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },
    
    password:{
        type:String,
        required:[true,'provide password'],
        minlength:3,
    },
    jobsCreated:{type:[mongoose.Schema.Types.ObjectId],ref:'Job',default:[]},
    jobsAppliedTo:{type:[mongoose.Schema.Types.ObjectId],ref:'Job',default:[]},
})

export const UserModel:Model<IUser> = mongoose.model('User',UsersSchema)