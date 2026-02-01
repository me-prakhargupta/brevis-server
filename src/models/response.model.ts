import mongoose, {Schema, Document} from "mongoose";

interface IResponse extends Document {
    identider: string;
    content: string;
}

const responseSchema = new Schema({
    identifier: {
        type: String,
        required: true,
        trim: true,
    }, 
    content: {
        type: String,
        require: true,
        trim: true
    }
},
    {
        timestamps: true
    }
);

const ResponseModel = mongoose.model<IResponse>("Response", responseSchema);

export default ResponseModel;