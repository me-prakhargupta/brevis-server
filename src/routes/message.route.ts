import { Router } from "express";
import { 
    requireAuth, 
    optionalAuth 
} from "../middlewares/auth.middleware.js";
import { 
    getMessages, 
    sendMessage, 
    messageStatus, 
    deleteMessage 
} from "../controllers/message.controller.js";
import { 
    userLimit, 
    messageLimit 
} from "../middlewares/rateLimiter.js";

const router = Router();

router.route("/get")
    .get(userLimit, 
        requireAuth,
        getMessages);

router.route("/send")
    .post(messageLimit,
        optionalAuth, 
        sendMessage);

router.route("/:id")
    .patch(userLimit, 
        requireAuth,
        messageStatus);

router.route("/:id")
    .delete(userLimit, 
        requireAuth,
        deleteMessage);

export default router;