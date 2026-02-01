import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ThoughtModel from "../models/thought.model.js";
import UserModel from "../models/user.model.js";

export const shareThought = asyncHandler(async (req, res) => {
    
    const { content } = req.body;

    if(!content || !content.trim()) {
        throw new ApiError(400, "Thought cannot be empty or contain only whitespace.");
    }

    const contentInfo: any = {
        content: content.trim(),
    }

    if(req.user?._id) {
        contentInfo.author = req.user._id;
    }    

    await ThoughtModel.create(contentInfo);

    return res
        .status(201)
        .json(new ApiResponse(201, {}, "Your thought has been shared. Thank you for sharing."));
});

export const getThoughts = asyncHandler(async (req,res) => {
    const userId = req.user?._id;

    if(!userId) {
        throw new ApiError(401, "Please sign in to continue.")
    }

    const user = await UserModel.findById(userId);

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const thoughts = await ThoughtModel.find({author: userId})
        .sort({createdAt: -1});

    return res
        .status(200)
        .json(new ApiResponse(200, thoughts, "Thoughts retrieved successfully."));
});

export const getPublicThoughts = asyncHandler(async (req, res) => {

    const thoughts = await ThoughtModel
        .find({
            isPublic: true
        })
        .populate({
            path: "author",
            match: { isPrivate: false },
            select: "_id",
        })
        .sort({createdAt: -1});

    const visibleThoughts = thoughts.filter(
        thought => thought.author !== null
    );
    
    return res
        .status(200)
        .json(new ApiResponse(200, visibleThoughts, "Thoughts feed retrieved successfully"));
});

export const deleteThought = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const thought = await ThoughtModel.findByIdAndDelete(id);

  if (!thought) {
    throw new ApiError(404, "Thought not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Thought deleted"));
});