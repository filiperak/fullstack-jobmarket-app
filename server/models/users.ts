import mongoose, { Model, Schema } from "mongoose";

interface IUser extends Document {
    username:string,
    email:string,
    password:string,
    createdJobs:mongoose.Types.ObjectId[],
    appliedJobs:mongoose.Types.ObjectId[],
}

const UsersSchema:Schema<IUser> = new Schema ({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
})

export const UserModel:Model<IUser> = mongoose.model('User',UsersSchema)