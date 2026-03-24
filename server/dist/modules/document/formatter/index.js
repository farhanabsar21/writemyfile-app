"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processDocumentContent = void 0;
const build_structured_document_1 = require("./build-structured-document");
const detect_sections_1 = require("./detect-sections");
const normalize_1 = require("./normalize");
const remove_ai_noise_1 = require("./remove-ai-noise");
const processDocumentContent = (title, rawContent) => {
    const normalized = (0, normalize_1.normalizeText)(rawContent);
    const cleaned = (0, remove_ai_noise_1.removeAiNoise)(normalized);
    const sections = (0, detect_sections_1.detectSections)(cleaned);
    const structuredContent = (0, build_structured_document_1.buildStructuredDocument)(title, sections);
    return {
        cleanedContent: cleaned,
        structuredContent,
    };
};
exports.processDocumentContent = processDocumentContent;
