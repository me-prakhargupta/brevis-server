import { Router } from "express";
import { signupUser, signinUser, getUser, signoutUser, getUserProfile, toggleVisibility } from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/signin").post(signinUser);
router.route("/signout").post(requireAuth, signoutUser);
router.route("/me").get(requireAuth, getUser);
router.route("/visibility").patch(requireAuth, toggleVisibility);
router.route("/username").post(getUserProfile);

export default router;