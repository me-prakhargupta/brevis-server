import { createRateLimiter } from "../utils/rateLimiter.js";
import { rateLimitConfig } from "../config/rateLimit.js";

const userLimit = createRateLimiter(rateLimitConfig.auth);

const messageLimit = createRateLimiter(rateLimitConfig.message);

const thoughtLimit = createRateLimiter(rateLimitConfig.thought);

export {
    userLimit, 
    messageLimit, 
    thoughtLimit,
}