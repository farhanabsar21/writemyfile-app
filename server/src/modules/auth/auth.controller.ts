import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../common/errors/AppError";
import { sendSuccess } from "../../utils/apiResponse";
import { getCurrentUser, loginUser, registerUser } from "./auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);

  sendSuccess(res, {
    statusCode: 201,
    message: "Registration successful",
    data: result,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body);

  sendSuccess(res, {
    message: "Login successful",
    data: result,
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new AppError("Unauthorized", 401);
  }

  const user = await getCurrentUser(req.user.userId);

  sendSuccess(res, {
    message: "Current user fetched successfully",
    data: {
      user,
    },
  });
});
