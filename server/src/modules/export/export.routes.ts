import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { validate } from "../../common/middlewares/validate.middleware";
import { exportDocxHandler, exportPdfHandler } from "./export.controller";
import { documentIdParamSchema } from "../document/document.validation";

const router = Router({ mergeParams: true });

router.use(authMiddleware);
router.use(validate({ params: documentIdParamSchema }));

router.post("/pdf", exportPdfHandler);
router.post("/docx", exportDocxHandler);

export default router;
