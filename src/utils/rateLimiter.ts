import rateLimit from "express-rate-limit";

interface RateLimiterOptions {
    windowMs: number,
    max: number,
    message: string,
};

export const createRateLimiter = ({
    windowMs,
    max, 
    message
}: RateLimiterOptions) => {
    return rateLimit({  
        windowMs,
        max,
        message,
        legacyHeaders: false,
        standardHeaders: true,
    });
}