"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app_constants_1 = require("../constants/app.constants");
exports.globalRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: app_constants_1.APP_CONSTANTS.RATE_LIMIT.GLOBAL_WINDOW_MS,
    max: app_constants_1.APP_CONSTANTS.RATE_LIMIT.GLOBAL_MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests, please try again later",
    },
});
