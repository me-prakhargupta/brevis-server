import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    sender?: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    content: string;
    status: boolean;
};

const messageSchema = new Schema<IMessage>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 500
    },
    status: {
        type: Boolean,
        default: false //Default false -> unread
    }
}, {timestamps: true});

const MessageModel = mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;