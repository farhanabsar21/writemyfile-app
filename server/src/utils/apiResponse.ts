import { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  options: {
    statusCode?: number;
    message: string;
    data?: T;
  },
): void => {
  const { statusCode = 200, message, data } = options;

  res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
  });
};

export const sendError = (
  res: Response,
  options: {
    statusCode?: number;
    message: string;
    errors?: unknown;
    details?: unknown;
  },
): void => {
  const { statusCode = 500, message, errors, details } = options;

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
    ...(details ? { details } : {}),
  });
};
