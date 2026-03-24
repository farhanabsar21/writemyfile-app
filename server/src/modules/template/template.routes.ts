import { Router } from "express";
import { getTemplatesHandler } from "./template.controller";

const router = Router();

router.get("/", getTemplatesHandler);

export default router;
