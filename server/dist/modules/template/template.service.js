"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTemplateConfigs = exports.getTemplateConfig = void 0;
const AppError_1 = require("../../common/errors/AppError");
const template_constants_1 = require("./template.constants");
const getTemplateConfig = (template) => {
    const config = template_constants_1.TEMPLATE_CONFIGS[template];
    if (!config) {
        throw new AppError_1.AppError("Template not found", 404);
    }
    return config;
};
exports.getTemplateConfig = getTemplateConfig;
const getAllTemplateConfigs = () => {
    return Object.values(template_constants_1.TEMPLATE_CONFIGS);
};
exports.getAllTemplateConfigs = getAllTemplateConfigs;
