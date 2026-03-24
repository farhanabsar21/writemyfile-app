import { Request, Response } from "express";
import { AppError } from "../../common/errors/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { exportDocumentAsDocx, exportDocumentAsPdf } from "./export.service";

const getAuthenticatedUserId = (req: Request): string => {
  if (!req.user?.userId) {
    throw new AppError("Unauthorized", 401);
  }

  return req.user.userId;
};

export const exportPdfHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getAuthenticatedUserId(req);
    const id = getRouteParam(req.params.id, "document id");

    const generatedFile = await exportDocumentAsPdf(userId, id);

    res.setHeader("Content-Type", generatedFile.contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${generatedFile.fileName}"`,
    );

    res.status(200).send(generatedFile.buffer);
  },
);

export const exportDocxHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getAuthenticatedUserId(req);
    const id = getRouteParam(req.params.id, "document id");

    const generatedFile = await exportDocumentAsDocx(userId, id);

    res.setHeader("Content-Type", generatedFile.contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${generatedFile.fileName}"`,
    );

    res.status(200).send(generatedFile.buffer);
  },
);

const getRouteParam = (
  value: string | string[] | undefined,
  name: string,
): string => {
  if (!value || Array.isArray(value)) {
    throw new AppError(`Invalid ${name}`, 400);
  }

  return value;
};
