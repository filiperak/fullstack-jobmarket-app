import mongoose, { Model, Schema } from "mongoose";

interface IMessages extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
}
const MessageSchema: Schema<IMessages> = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "must provide sender"],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "must provide reciver"],
    },
    content: {
      type: String,
      required: [true, "must provide content"],
    },
  },
  { timestamps: true }
);

export const MessageModel:Model<IMessages> = mongoose.model("Message",MessageSchema)