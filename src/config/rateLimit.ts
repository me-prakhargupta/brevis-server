export const rateLimitConfig = ({
    auth: {
        windowMs:15 * 60 * 1000,
        max: 5,
        message: "Too many attemps. Try again later.",
    },

    message: {
        windowMs: 1 * 60 * 1000,
        max: 20,
        message: "Too many message sent.",
    },

    thought: {
        windowMs: 1 * 60 * 1000,
        max: 10,
        message: "You're posting to fast.",
    }
});