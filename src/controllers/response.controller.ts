import { asyncHandler } from "../utils/asyncHandler.js";
import ResponseModel from "../models/response.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const responseForm = asyncHandler(async (req, res) => {
    const { identifier, content } = req.body;

    if(!identifier || !content) {
        throw new ApiError(400, "Please provide a contact and a response to share.");
    }

    if (typeof identifier !== "string" || !identifier.trim()) {
        throw new ApiError(400, "Invalid contact identifier.");
    }

    const cleanContent = content.trim();
    if(!cleanContent) {
        throw new ApiError(400, "Please enter a message before sending.");
    }

    const responseInfo = {
        identifier,
        content: cleanContent,
    }

    await ResponseModel.create(responseInfo);

    return res
        .status(201)
        .json(new ApiResponse(201,{}, "Your message has been sent successfully."));
});