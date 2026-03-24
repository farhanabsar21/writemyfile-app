import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { validate } from "../../common/middlewares/validate.middleware";
import {
  createDocumentHandler,
  deleteDocumentHandler,
  getDocumentByIdHandler,
  getDocumentsHandler,
  updateDocumentHandler,
} from "./document.controller";
import exportRoutes from "../export/export.routes";
import {
  createDocumentSchema,
  documentIdParamSchema,
  updateDocumentSchema,
} from "./document.validation";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate({ body: createDocumentSchema }),
  createDocumentHandler,
);
router.get("/", getDocumentsHandler);
router.get(
  "/:id",
  validate({ params: documentIdParamSchema }),
  getDocumentByIdHandler,
);
router.put(
  "/:id",
  validate({ params: documentIdParamSchema, body: updateDocumentSchema }),
  updateDocumentHandler,
);
router.delete(
  "/:id",
  validate({ params: documentIdParamSchema }),
  deleteDocumentHandler,
);

router.use("/:id/export", exportRoutes);

export default router;
