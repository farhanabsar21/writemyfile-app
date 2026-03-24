import { Router } from "express";
import { env } from "../config/env";
import { sendSuccess } from "../utils/apiResponse";
import authRoutes from "../modules/auth/auth.routes";
import documentRoutes from "../modules/document/document.routes";
import templateRoutes from "../modules/template/template.routes";

const router = Router();

router.get("/health", (_req, res) => {
  sendSuccess(res, {
    message: "Server is running",
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    },
  });
});

router.use("/auth", authRoutes);
router.use("/documents", documentRoutes);
router.use("/templates", templateRoutes);

export default router;
