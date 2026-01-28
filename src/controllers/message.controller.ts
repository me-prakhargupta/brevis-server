import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import UserModel from "../models/user.model.js";
import MessageModel from "../models/message.model.js";

export const sendMessage = asyncHandler(async (req, res) => {
    const { username, content } = req.body;

    try {
        if(!username || !content) {
            throw new ApiError(400, "Please provide a username and a message to continue");
        }

        if(!content?.trim()) {
            throw new ApiError(400, "Please enter a message before continuing.");
        }

        if(content?.length > 300) {
            throw new ApiError(400, "Please keep your message under 300 characters.");
        }
        
        const user = await UserModel.findOne({username});

        if(!user) {
            throw new ApiError(404, "User not found");
        }

        const newMessage = await MessageModel.create({
            receiverId: user._id,
            content,
            isAnonymous: true
        });

        if(!newMessage) {
            throw new ApiError(500, "Failed to send the message. Please try again.");
        }

        return res.json(new ApiResponse(200,{}, "Your message has been sent successfully."));

    } catch(error) {
        if(error instanceof ApiError) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
            })
        }
        return res.status(500).json(new ApiError(500, "Failed to send the message. Please try again."));
    }
});