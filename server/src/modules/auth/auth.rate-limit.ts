import rateLimit from "express-rate-limit";
import { APP_CONSTANTS } from "../../common/constants/app.constants";

export const authRateLimiter = rateLimit({
  windowMs: APP_CONSTANTS.RATE_LIMIT.AUTH_WINDOW_MS,
  max: APP_CONSTANTS.RATE_LIMIT.AUTH_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many auth requests, please try again later",
  },
});
