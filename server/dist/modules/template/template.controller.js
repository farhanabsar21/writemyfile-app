"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplatesHandler = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponse_1 = require("../../utils/apiResponse");
const template_service_1 = require("./template.service");
exports.getTemplatesHandler = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const templates = (0, template_service_1.getAllTemplateConfigs)();
    (0, apiResponse_1.sendSuccess)(res, {
        message: "Templates fetched successfully",
        data: {
            templates,
        },
    });
});
