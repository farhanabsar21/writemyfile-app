import PDFDocument from "pdfkit";
import { ExportPayload, GeneratedFile } from "./export.types";

const sanitizeFileName = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
};

export const generatePdfBuffer = async (
  payload: ExportPayload,
): Promise<GeneratedFile> => {
  const { document, templateConfig } = payload;

  return new Promise((resolve, reject) => {
    const pdf = new PDFDocument({
      margin: templateConfig.page.margin,
      size: "A4",
    });

    const chunks: Buffer[] = [];

    pdf.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    pdf.on("end", () => {
      const safeBaseName =
        sanitizeFileName(document.title || "document") || "document";

      resolve({
        buffer: Buffer.concat(chunks),
        fileName: `${safeBaseName}.pdf`,
        contentType: "application/pdf",
      });
    });

    pdf.on("error", reject);

    const {
      titleSize,
      headingSize,
      bodySize,
      lineGap,
      paragraphGap,
      sectionGap,
    } = templateConfig.typography;

    pdf
      .font("Helvetica-Bold")
      .fontSize(titleSize)
      .text(document.structuredContent.title, {
        align: "center",
      });

    pdf.moveDown(1.5);

    for (const section of document.structuredContent.sections) {
      if (section.heading) {
        pdf.font("Helvetica-Bold").fontSize(headingSize).text(section.heading, {
          align: "left",
        });

        pdf.moveDown(0.5);
      }

      for (const paragraph of section.paragraphs) {
        pdf.font("Helvetica").fontSize(bodySize).text(paragraph, {
          align: "left",
          lineGap,
        });

        pdf.moveDown(paragraphGap / 10);
      }

      if (section.bullets && section.bullets.length > 0) {
        for (const bullet of section.bullets) {
          pdf.font("Helvetica").fontSize(bodySize).text(`• ${bullet}`, {
            align: "left",
            indent: 14,
            lineGap,
          });
        }

        pdf.moveDown(0.5);
      }

      pdf.moveDown(sectionGap / 10);
    }

    pdf.end();
  });
};
