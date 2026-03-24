import { Router } from "express";
import { login, me, register } from "./auth.controller";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { validate } from "../../common/middlewares/validate.middleware";
import { authRateLimiter } from "./auth.rate-limit";
import { loginSchema, registerSchema } from "./auth.validation";

const router = Router();

router.use(authRateLimiter);

router.post("/register", validate({ body: registerSchema }), register);
router.post("/login", validate({ body: loginSchema }), login);
router.get("/me", authMiddleware, me);

export default router;
