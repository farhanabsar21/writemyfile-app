"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_CONFIGS = void 0;
const document_enums_1 = require("../document/document.enums");
exports.TEMPLATE_CONFIGS = {
    [document_enums_1.DocumentTemplate.PROFESSIONAL]: {
        key: document_enums_1.DocumentTemplate.PROFESSIONAL,
        displayName: "Professional",
        page: {
            margin: 50,
        },
        typography: {
            titleSize: 20,
            headingSize: 15,
            bodySize: 11,
            lineGap: 6,
            paragraphGap: 10,
            sectionGap: 14,
        },
    },
    [document_enums_1.DocumentTemplate.ACADEMIC]: {
        key: document_enums_1.DocumentTemplate.ACADEMIC,
        displayName: "Academic",
        page: {
            margin: 60,
        },
        typography: {
            titleSize: 18,
            headingSize: 14,
            bodySize: 12,
            lineGap: 7,
            paragraphGap: 12,
            sectionGap: 16,
        },
    },
    [document_enums_1.DocumentTemplate.MINIMAL]: {
        key: document_enums_1.DocumentTemplate.MINIMAL,
        displayName: "Minimal",
        page: {
            margin: 40,
        },
        typography: {
            titleSize: 18,
            headingSize: 14,
            bodySize: 10,
            lineGap: 5,
            paragraphGap: 8,
            sectionGap: 12,
        },
    },
};
