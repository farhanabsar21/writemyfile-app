import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { APP_CONSTANTS } from "../common/constants/app.constants";

type JwtPayload = {
  userId: string;
  email: string;
};

export const generateJwt = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: APP_CONSTANTS.AUTH.TOKEN_EXPIRES_IN,
  });
};
