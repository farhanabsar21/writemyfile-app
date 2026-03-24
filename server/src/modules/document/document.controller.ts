import { Request, Response } from "express";
import { AppError } from "../../common/errors/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/apiResponse";
import {
  createDocument,
  deleteDocument,
  getDocumentById,
  getDocuments,
  updateDocument,
} from "./document.service";

const getAuthenticatedUserId = (req: Request): string => {
  if (!req.user?.userId) {
    throw new AppError("Unauthorized", 401);
  }

  return req.user.userId;
};

export const createDocumentHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getAuthenticatedUserId(req);
    const document = await createDocument(userId, req.body);

    sendSuccess(res, {
      statusCode: 201,
      message: "Document created successfully",
      data: {
        document,
      },
    });
  },
);

export const getDocumentsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getAuthenticatedUserId(req);
    const documents = await getDocuments(userId);

    sendSuccess(res, {
      message: "Documents fetched successfully",
      data: {
        documents,
      },
    });
  },
);

export const getDocumentByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getAuthenticatedUserId(req);

    const id = getRouteParam(req.params.id, "document id");
    const document = await getDocumentById(userId, id);

    sendSuccess(res, {
      message: "Document fetched successfully",
      data: {
        document,
      },
    });
  },
);

export const updateDocumentHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getAuthenticatedUserId(req);
    const id = getRouteParam(req.params.id, "document id");

    const document = await updateDocument(userId, id, req.body);

    sendSuccess(res, {
      message: "Document updated successfully",
      data: {
        document,
      },
    });
  },
);

export const deleteDocumentHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getAuthenticatedUserId(req);
    const id = getRouteParam(req.params.id, "document id");

    await deleteDocument(userId, id);

    sendSuccess(res, {
      message: "Document deleted successfully",
    });
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
