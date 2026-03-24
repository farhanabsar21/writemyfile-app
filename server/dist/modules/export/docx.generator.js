"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocxBuffer = void 0;
const docx_1 = require("docx");
const sanitizeFileName = (value) => {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 80);
};
const generateDocxBuffer = async (payload) => {
    const { document, templateConfig } = payload;
    const { titleSize, headingSize, bodySize } = templateConfig.typography;
    const children = [
        new docx_1.Paragraph({
            alignment: docx_1.AlignmentType.CENTER,
            spacing: {
                after: 300,
            },
            children: [
                new docx_1.TextRun({
                    text: document.structuredContent.title,
                    bold: true,
                    size: titleSize * 2,
                }),
            ],
        }),
    ];
    for (const section of document.structuredContent.sections) {
        if (section.heading) {
            children.push(new docx_1.Paragraph({
                heading: docx_1.HeadingLevel.HEADING_1,
                spacing: {
                    before: 160,
                    after: 120,
                },
                children: [
                    new docx_1.TextRun({
                        text: section.heading,
                        bold: true,
                        size: headingSize * 2,
                    }),
                ],
            }));
        }
        for (const paragraph of section.paragraphs) {
            children.push(new docx_1.Paragraph({
                spacing: {
                    after: 150,
                },
                children: [
                    new docx_1.TextRun({
                        text: paragraph,
                        size: bodySize * 2,
                    }),
                ],
            }));
        }
        if (section.bullets && section.bullets.length > 0) {
            for (const bullet of section.bullets) {
                children.push(new docx_1.Paragraph({
                    bullet: {
                        level: 0,
                    },
                    spacing: {
                        after: 80,
                    },
                    children: [
                        new docx_1.TextRun({
                            text: bullet,
                            size: bodySize * 2,
                        }),
                    ],
                }));
            }
        }
    }
    const doc = new docx_1.Document({
        sections: [
            {
                properties: {},
                children,
            },
        ],
    });
    const buffer = await docx_1.Packer.toBuffer(doc);
    const safeBaseName = sanitizeFileName(document.title || "document") || "document";
    return {
        buffer,
        fileName: `${safeBaseName}.docx`,
        contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
};
exports.generateDocxBuffer = generateDocxBuffer;
