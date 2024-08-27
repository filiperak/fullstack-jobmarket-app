import mongoose, { Model, Schema } from "mongoose";

interface INotification extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
}

const NotificationSchema: Schema<INotification> = new Schema(
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

export const NotificationModel:Model<INotification> = mongoose.model("Notification",NotificationSchema)