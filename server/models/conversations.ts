import mongoose, { Model, Schema } from "mongoose";

interface IConversations extends Document {
  participants: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
}
const ConversationSchema: Schema<IConversations> = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default:[]
      },
    ],
  },
  { timestamps: true }
);

export const ConversationModel:Model<IConversations> = mongoose.model("Conversation",ConversationSchema)