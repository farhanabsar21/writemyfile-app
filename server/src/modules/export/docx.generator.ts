import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { ExportPayload, GeneratedFile } from "./export.types";

const sanitizeFileName = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
};

export const generateDocxBuffer = async (
  payload: ExportPayload,
): Promise<GeneratedFile> => {
  const { document, templateConfig } = payload;

  const { titleSize, headingSize, bodySize } = templateConfig.typography;

  const children: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 300,
      },
      children: [
        new TextRun({
          text: document.structuredContent.title,
          bold: true,
          size: titleSize * 2,
        }),
      ],
    }),
  ];

  for (const section of document.structuredContent.sections) {
    if (section.heading) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: {
            before: 160,
            after: 120,
          },
          children: [
            new TextRun({
              text: section.heading,
              bold: true,
              size: headingSize * 2,
            }),
          ],
        }),
      );
    }

    for (const paragraph of section.paragraphs) {
      children.push(
        new Paragraph({
          spacing: {
            after: 150,
          },
          children: [
            new TextRun({
              text: paragraph,
              size: bodySize * 2,
            }),
          ],
        }),
      );
    }

    if (section.bullets && section.bullets.length > 0) {
      for (const bullet of section.bullets) {
        children.push(
          new Paragraph({
            bullet: {
              level: 0,
            },
            spacing: {
              after: 80,
            },
            children: [
              new TextRun({
                text: bullet,
                size: bodySize * 2,
              }),
            ],
          }),
        );
      }
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const safeBaseName =
    sanitizeFileName(document.title || "document") || "document";

  return {
    buffer,
    fileName: `${safeBaseName}.docx`,
    contentType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
};
