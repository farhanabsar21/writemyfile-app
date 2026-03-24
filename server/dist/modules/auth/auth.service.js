"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = require("../../common/errors/AppError");
const app_constants_1 = require("../../common/constants/app.constants");
const generateJwt_1 = require("../../utils/generateJwt");
const user_model_1 = require("../user/user.model");
const toSafeUser = (user) => {
    return {
        id: String(user._id),
        name: user.name,
        email: user.email,
        plan: user.plan,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
const registerUser = async (input) => {
    const existingUser = await user_model_1.UserModel.findOne({ email: input.email });
    if (existingUser) {
        throw new AppError_1.AppError("An account with this email already exists", 409);
    }
    const passwordHash = await bcryptjs_1.default.hash(input.password, app_constants_1.APP_CONSTANTS.AUTH.SALT_ROUNDS);
    const user = await user_model_1.UserModel.create({
        name: input.name,
        email: input.email,
        passwordHash,
    });
    const token = (0, generateJwt_1.generateJwt)({
        userId: String(user._id),
        email: user.email,
    });
    return {
        user: toSafeUser(user),
        token,
    };
};
exports.registerUser = registerUser;
const loginUser = async (input) => {
    const user = await user_model_1.UserModel.findOne({ email: input.email });
    if (!user) {
        throw new AppError_1.AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcryptjs_1.default.compare(input.password, user.passwordHash);
    if (!isPasswordValid) {
        throw new AppError_1.AppError("Invalid email or password", 401);
    }
    const token = (0, generateJwt_1.generateJwt)({
        userId: String(user._id),
        email: user.email,
    });
    return {
        user: toSafeUser(user),
        token,
    };
};
exports.loginUser = loginUser;
const getCurrentUser = async (userId) => {
    const user = await user_model_1.UserModel.findById(userId);
    if (!user) {
        throw new AppError_1.AppError("User not found", 404);
    }
    return toSafeUser(user);
};
exports.getCurrentUser = getCurrentUser;
