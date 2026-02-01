import mongoose, {Schema, Document} from "mongoose";

export interface IThought extends Document {
    author?: mongoose.Types.ObjectId;
    content: string;
    isPublic?: boolean;
};

const thoughtSchema = new Schema<IThought>({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    },
    isPublic: {
        type: Boolean,
        default: true,
    }
}, {timestamps: true});


const ThoughtModel = mongoose.model<IThought>("Thought", thoughtSchema);

export default ThoughtModel;