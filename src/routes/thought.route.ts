import { Router } from "express";
import { shareThought } from "../controllers/thought.controller.js";

const router = Router();

router.route("/share").post(shareThought);

export default router;