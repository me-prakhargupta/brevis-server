import { Router } from "express";
import { requireAuth, optionalAuth } from "../middlewares/auth.middleware.js";
import { getThoughts, shareThought, getPublicThoughts, deleteThought } from "../controllers/thought.controller.js";

const router = Router();

router.route("/get").get(requireAuth, getThoughts);
router.route("/share").post(optionalAuth, shareThought);
router.route("/public").get(requireAuth, getPublicThoughts);
router.route("/:id").delete(requireAuth, deleteThought);

export default router;