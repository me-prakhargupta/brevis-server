import { Router } from "express";
import { signupUser, signinUser, getMeUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/signin").post(signinUser);
// router.route("/verify").post(verifyUser);

//Secured (Protected) Route

router.route("/me").get(verifyToken)
// router.route("/logout").post(protect, logoutUser);
// router.route("/accept-message").patch(protect, acceptMessage);

export default router;