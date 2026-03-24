import rateLimit from "express-rate-limit";
import { APP_CONSTANTS } from "../constants/app.constants";

export const globalRateLimiter = rateLimit({
  windowMs: APP_CONSTANTS.RATE_LIMIT.GLOBAL_WINDOW_MS,
  max: APP_CONSTANTS.RATE_LIMIT.GLOBAL_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});
