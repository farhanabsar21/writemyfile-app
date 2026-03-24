"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, options) => {
    const { statusCode = 200, message, data } = options;
    res.status(statusCode).json({
        success: true,
        message,
        data: data ?? null,
    });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, options) => {
    const { statusCode = 500, message, errors, details } = options;
    res.status(statusCode).json({
        success: false,
        message,
        ...(errors ? { errors } : {}),
        ...(details ? { details } : {}),
    });
};
exports.sendError = sendError;
