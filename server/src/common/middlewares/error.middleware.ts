import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";
import { env } from "../../config/env";

type MongoDuplicateKeyError = {
  code?: number;
  keyValue?: Record<string, unknown>;
};

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.flatten().fieldErrors,
    });
    return;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as MongoDuplicateKeyError).code === 11000
  ) {
    res.status(409).json({
      success: false,
      message: "A record with this value already exists",
      details: (error as MongoDuplicateKeyError).keyValue ?? null,
    });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: "Invalid resource identifier",
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.details ? { details: error.details } : {}),
    });
    return;
  }

  console.error("Unhandled error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(env.NODE_ENV !== "production" ? { details: error } : {}),
  });
};
