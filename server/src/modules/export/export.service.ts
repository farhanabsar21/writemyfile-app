import { AppError } from "../../common/errors/AppError";
import { getDocumentById } from "../document/document.service";
import { getTemplateConfig } from "../template/template.service";
import { GeneratedFile } from "./export.types";
import { generateDocxBuffer } from "./docx.generator";
import { generatePdfBuffer } from "./pdf.generator";

export const exportDocumentAsPdf = async (
  userId: string,
  documentId: string,
): Promise<GeneratedFile> => {
  const document = await getDocumentById(userId, documentId);
  const templateConfig = getTemplateConfig(document.template);

  return generatePdfBuffer({
    document,
    templateConfig,
  });
};

export const exportDocumentAsDocx = async (
  userId: string,
  documentId: string,
): Promise<GeneratedFile> => {
  const document = await getDocumentById(userId, documentId);
  const templateConfig = getTemplateConfig(document.template);

  return generateDocxBuffer({
    document,
    templateConfig,
  });
};

export const getExportFormatMeta = (
  format: "pdf" | "docx",
): { contentType: string } => {
  if (format === "pdf") {
    return { contentType: "application/pdf" };
  }

  if (format === "docx") {
    return {
      contentType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
  }

  throw new AppError("Unsupported export format", 400);
};
