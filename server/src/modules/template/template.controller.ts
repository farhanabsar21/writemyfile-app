import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/apiResponse";
import { getAllTemplateConfigs } from "./template.service";

export const getTemplatesHandler = asyncHandler(
  async (_req: Request, res: Response) => {
    const templates = getAllTemplateConfigs();

    sendSuccess(res, {
      message: "Templates fetched successfully",
      data: {
        templates,
      },
    });
  },
);
