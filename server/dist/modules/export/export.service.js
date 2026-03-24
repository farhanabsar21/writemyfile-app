"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExportFormatMeta = exports.exportDocumentAsDocx = exports.exportDocumentAsPdf = void 0;
const AppError_1 = require("../../common/errors/AppError");
const document_service_1 = require("../document/document.service");
const template_service_1 = require("../template/template.service");
const docx_generator_1 = require("./docx.generator");
const pdf_generator_1 = require("./pdf.generator");
const exportDocumentAsPdf = async (userId, documentId) => {
    const document = await (0, document_service_1.getDocumentById)(userId, documentId);
    const templateConfig = (0, template_service_1.getTemplateConfig)(document.template);
    return (0, pdf_generator_1.generatePdfBuffer)({
        document,
        templateConfig,
    });
};
exports.exportDocumentAsPdf = exportDocumentAsPdf;
const exportDocumentAsDocx = async (userId, documentId) => {
    const document = await (0, document_service_1.getDocumentById)(userId, documentId);
    const templateConfig = (0, template_service_1.getTemplateConfig)(document.template);
    return (0, docx_generator_1.generateDocxBuffer)({
        document,
        templateConfig,
    });
};
exports.exportDocumentAsDocx = exportDocumentAsDocx;
const getExportFormatMeta = (format) => {
    if (format === "pdf") {
        return { contentType: "application/pdf" };
    }
    if (format === "docx") {
        return {
            contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        };
    }
    throw new AppError_1.AppError("Unsupported export format", 400);
};
exports.getExportFormatMeta = getExportFormatMeta;
