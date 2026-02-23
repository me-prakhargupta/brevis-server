import { Router } from "express";
import { 
    requireAuth, 
    optionalAuth 
} from "../middlewares/auth.middleware.js";
import { 
    getThoughts, 
    shareThought, 
    getPublicThoughts, 
    deleteThought 
} from "../controllers/thought.controller.js";
import { 
    thoughtLimit,
    userLimit
} from "../middlewares/rateLimiter.js";

const router = Router();

router.route("/get")
    .get(userLimit, 
        requireAuth,
        getThoughts);

router.route("/share")
    .post(thoughtLimit, 
        optionalAuth,
        shareThought);

router.route("/public")
    .get(userLimit, 
        requireAuth,
        getPublicThoughts);

router.route("/:id")
    .delete(userLimit, 
        requireAuth,
        deleteThought);

export default router;