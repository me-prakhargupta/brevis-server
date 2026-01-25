import jwt, { type JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";

declare global {
    namespace Express {
        interface Request {
            user?: { _id: string };
        }
    }
}

export const protect = asyncHandler(async (req, res, next) => {
    
    const token = req.cookies?.accessToken;

    if(!token) throw new ApiError(401, "Access token missing!");

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

    req.user = {_id: decoded._id};
    next();
});