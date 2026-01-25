import { Router } from "express";
import { signupUser, signinUser, logoutUser, verifyUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/signin").post(signinUser);
router.route("/verify").post(verifyUser);

//Secured Route
router.route('/logout').post(protect, logoutUser);

export default router;