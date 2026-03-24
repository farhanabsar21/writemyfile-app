"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStructuredDocument = void 0;
const buildStructuredDocument = (title, sections) => {
    const safeSections = sections.map((section) => ({
        heading: section.heading,
        paragraphs: section.paragraphs ?? [],
        bullets: section.bullets && section.bullets.length > 0
            ? section.bullets
            : undefined,
    }));
    return {
        title,
        sections: safeSections,
    };
};
exports.buildStructuredDocument = buildStructuredDocument;
