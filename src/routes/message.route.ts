import { Router } from "express";
import { requireAuth, optionalAuth } from "../middlewares/auth.middleware.js";
import { getMessages, sendMessage, messageStatus, deleteMessage } from "../controllers/message.controller.js";

const router = Router();

router.route("/get").get(requireAuth, getMessages);
router.route("/send").post(optionalAuth, sendMessage);
router.route("/:id").patch(requireAuth, messageStatus);
router.route("/:id").delete(requireAuth, deleteMessage);

export default router;