import { Router } from "express";
import { 
    signupUser, 
    signinUser, 
    getUser, 
    signoutUser, 
    getUserProfile, 
    toggleVisibility 
} from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { userLimit } from "../middlewares/rateLimiter.js";


const router = Router();

router.route("/signup")
    .post(userLimit, 
        signupUser);

router.route("/signin")
    .post(userLimit, 
        signinUser);

router.route("/signout")
    .post(userLimit, 
        requireAuth, 
        signoutUser);

router.route("/me")
    .get(userLimit, 
        requireAuth, 
        getUser);

router.route("/visibility")
    .patch(userLimit, 
        requireAuth, 
        toggleVisibility);

router.route("/username")
    .post(userLimit,
        getUserProfile);

export default router;