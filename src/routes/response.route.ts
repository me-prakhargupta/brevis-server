import { Router } from "express";
import { responseForm } from "../controllers/response.controller.js";

const router = Router();

router.route("/response").post(responseForm);

export default router;