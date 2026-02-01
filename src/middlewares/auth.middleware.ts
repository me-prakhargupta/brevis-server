import jwt, { type JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";

declare global {
    namespace Express {
        interface Request {
            user?: { _id: string };
        }
    }
}

export const requireAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken;

    if(!token) {
        throw new ApiError(401, "Unauthorized.");
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload & {_id: string};

    if (!decoded || typeof decoded !== "object" || !("_id" in decoded)) {
        throw new ApiError(401, "Unauthorized.");
    }

    req.user = { _id: decoded._id };
    return next();
});

export const optionalAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken;

    if(!token) return next();

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload & { _id: string };

        if (decoded && decoded._id) {
            req.user = { _id: decoded._id };
        }
    } catch(err) {
        // silently ignore invalid token for optional auth
    }

     return next();
})