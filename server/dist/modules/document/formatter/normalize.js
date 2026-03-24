"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeText = void 0;
const normalizeText = (input) => {
    return input
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .replace(/[ \t]+$/gm, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
};
exports.normalizeText = normalizeText;
