import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { AppError } from "../errors/AppError";

type DecodedToken = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
};
