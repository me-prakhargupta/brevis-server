import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import UserModel from "../models/user.model.js";
import MessageModel from "../models/message.model.js";
import type{ Request, Response } from "express";

interface AuthRequest extends Request {
    user?: {
        _id: string;
    };
}


export const sendMessage = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { username, content } = req.body;
    if(!username || !content) {
        throw new ApiError(400, "Please provide a username and a message to continue");
    }
    
    const cleanContent = content.trim();
    if(!cleanContent) {
        throw new ApiError(400, "Please enter a message before continuing.");
    }
    
    if(cleanContent?.length > 300) {
        throw new ApiError(400, "Please keep your message under 300 characters.");
    }

    const user = await UserModel.findOne({username});

    if(!user) {
        throw new ApiError(404, "User not found");
    }
     
    if(user.isPrivate) {
        return res
            .status(200)
            .json(
                new ApiResponse(200, { success: false }, "This space is quiet for now.")
            );
    }

    const contentInfo: any = {
        receiver: user._id,
        content: cleanContent,
    };
    
    if(req.user?._id) {
        contentInfo.sender = req.user._id;
    }

    await MessageModel.create(contentInfo);
    
    return res
        .status(201)
        .json(new ApiResponse(201,{}, "Your message has been sent successfully."));
});

export const getMessages = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if(!userId) {
        throw new ApiError(401, "Please sign in to continue.");
    }

    const user = await UserModel.findById(userId);

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const messages = await MessageModel.find({receiver: userId})
        .sort({createdAt: -1}).select("-sender");

    return res
        .status(200)
        .json(new ApiResponse(200, messages, "Messages retrieved successfully."));
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const message = await MessageModel.findByIdAndDelete(id);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  res.status(200).json(new ApiResponse(200, {}, "Message deleted"));
});

export const messageStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const message = await MessageModel.findByIdAndUpdate(
        id,
        { status: true },
        {
            new: true,
            runValidators: true,
        },
    );

    if(!message) {
        throw new ApiError(404, "Message not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Message status updated successfully"));
});