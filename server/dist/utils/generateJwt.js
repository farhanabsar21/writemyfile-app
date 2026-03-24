"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const app_constants_1 = require("../common/constants/app.constants");
const generateJwt = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, {
        expiresIn: app_constants_1.APP_CONSTANTS.AUTH.TOKEN_EXPIRES_IN,
    });
};
exports.generateJwt = generateJwt;
