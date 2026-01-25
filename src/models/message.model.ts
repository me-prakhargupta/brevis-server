import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    messageContent: string;
    from: mongoose.Types.ObjectId;
    to: mongoose.Types.ObjectId;
};

const messageSchema = new Schema<IMessage>({
    messageContent: {
        type: String,
        required: true,
        minlength: [10, "Message must be at least 10 characters long"],
        maxlength: [300, "Message must be at most 300 characters long"]
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    to: {
        type:Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true});

const MessageModel = mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;