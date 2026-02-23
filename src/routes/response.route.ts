import { Router } from "express";
import { responseForm } from "../controllers/response.controller.js";
import { messageLimit } from "../middlewares/rateLimiter.js";

const router = Router();

router.route("/response")
    .post(messageLimit,
        responseForm);

export default router;