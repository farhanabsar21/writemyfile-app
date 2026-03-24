"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAiNoise = void 0;
const leadingPatterns = [
    /^sure[,\s!.-]*here(?:'s| is)\b.*?\n+/i,
    /^of course[,\s!.-]*\b.*?\n+/i,
    /^absolutely[,\s!.-]*\b.*?\n+/i,
    /^certainly[,\s!.-]*\b.*?\n+/i,
    /^here(?:'s| is)\s+(?:a|your)\b.*?\n+/i,
];
const trailingPatterns = [
    /\n+let me know if you(?:'d| would)? like.*$/i,
    /\n+i hope this helps.*$/i,
    /\n+feel free to ask if.*$/i,
    /\n+if you want,? i can.*$/i,
];
const removeAiNoise = (input) => {
    let output = input;
    for (const pattern of leadingPatterns) {
        output = output.replace(pattern, "");
    }
    for (const pattern of trailingPatterns) {
        output = output.replace(pattern, "");
    }
    return output.trim();
};
exports.removeAiNoise = removeAiNoise;
