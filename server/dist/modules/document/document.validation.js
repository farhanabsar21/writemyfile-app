"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentIdParamSchema = exports.updateDocumentSchema = exports.createDocumentSchema = void 0;
const zod_1 = require("zod");
const document_enums_1 = require("./document.enums");
const app_constants_1 = require("../../common/constants/app.constants");
exports.createDocumentSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(app_constants_1.APP_CONSTANTS.DOCUMENT.TITLE_MAX_LENGTH, `Title must be at most ${app_constants_1.APP_CONSTANTS.DOCUMENT.TITLE_MAX_LENGTH} characters`),
    rawContent: zod_1.z
        .string()
        .trim()
        .min(1, "Raw content is required")
        .max(app_constants_1.APP_CONSTANTS.DOCUMENT.CONTENT_MAX_LENGTH, `Raw content must be at most ${app_constants_1.APP_CONSTANTS.DOCUMENT.CONTENT_MAX_LENGTH} characters`),
    documentType: zod_1.z.nativeEnum(document_enums_1.DocumentType, {
        errorMap: () => ({ message: "Invalid document type" }),
    }),
    template: zod_1.z.nativeEnum(document_enums_1.DocumentTemplate, {
        errorMap: () => ({ message: "Invalid template" }),
    }),
});
exports.updateDocumentSchema = zod_1.z
    .object({
    title: zod_1.z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(app_constants_1.APP_CONSTANTS.DOCUMENT.TITLE_MAX_LENGTH, `Title must be at most ${app_constants_1.APP_CONSTANTS.DOCUMENT.TITLE_MAX_LENGTH} characters`)
        .optional(),
    rawContent: zod_1.z
        .string()
        .trim()
        .min(1, "Raw content is required")
        .max(app_constants_1.APP_CONSTANTS.DOCUMENT.CONTENT_MAX_LENGTH, `Raw content must be at most ${app_constants_1.APP_CONSTANTS.DOCUMENT.CONTENT_MAX_LENGTH} characters`)
        .optional(),
    documentType: zod_1.z
        .nativeEnum(document_enums_1.DocumentType, {
        errorMap: () => ({ message: "Invalid document type" }),
    })
        .optional(),
    template: zod_1.z
        .nativeEnum(document_enums_1.DocumentTemplate, {
        errorMap: () => ({ message: "Invalid template" }),
    })
        .optional(),
})
    .refine((data) => data.title !== undefined ||
    data.rawContent !== undefined ||
    data.documentType !== undefined ||
    data.template !== undefined, {
    message: "At least one field must be provided for update",
});
exports.documentIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().trim().min(1, "Document id is required"),
});
