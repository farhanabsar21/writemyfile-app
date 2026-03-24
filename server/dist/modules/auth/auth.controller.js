"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const AppError_1 = require("../../common/errors/AppError");
const apiResponse_1 = require("../../utils/apiResponse");
const auth_service_1 = require("./auth.service");
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await (0, auth_service_1.registerUser)(req.body);
    (0, apiResponse_1.sendSuccess)(res, {
        statusCode: 201,
        message: "Registration successful",
        data: result,
    });
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await (0, auth_service_1.loginUser)(req.body);
    (0, apiResponse_1.sendSuccess)(res, {
        message: "Login successful",
        data: result,
    });
});
exports.me = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user?.userId) {
        throw new AppError_1.AppError("Unauthorized", 401);
    }
    const user = await (0, auth_service_1.getCurrentUser)(req.user.userId);
    (0, apiResponse_1.sendSuccess)(res, {
        message: "Current user fetched successfully",
        data: {
            user,
        },
    });
});
