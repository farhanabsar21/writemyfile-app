import { z } from "zod";
import { DocumentTemplate, DocumentType } from "./document.enums";
import { APP_CONSTANTS } from "../../common/constants/app.constants";

export const createDocumentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(
      APP_CONSTANTS.DOCUMENT.TITLE_MAX_LENGTH,
      `Title must be at most ${APP_CONSTANTS.DOCUMENT.TITLE_MAX_LENGTH} characters`,
    ),
  rawContent: z
    .string()
    .trim()
    .min(1, "Raw content is required")
    .max(
      APP_CONSTANTS.DOCUMENT.CONTENT_MAX_LENGTH,
      `Raw content must be at most ${APP_CONSTANTS.DOCUMENT.CONTENT_MAX_LENGTH} characters`,
    ),
  documentType: z.nativeEnum(DocumentType, {
    errorMap: () => ({ message: "Invalid document type" }),
  }),
  template: z.nativeEnum(DocumentTemplate, {
    errorMap: () => ({ message: "Invalid template" }),
  }),
});

export const updateDocumentSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(
        APP_CONSTANTS.DOCUMENT.TITLE_MAX_LENGTH,
        `Title must be at most ${APP_CONSTANTS.DOCUMENT.TITLE_MAX_LENGTH} characters`,
      )
      .optional(),
    rawContent: z
      .string()
      .trim()
      .min(1, "Raw content is required")
      .max(
        APP_CONSTANTS.DOCUMENT.CONTENT_MAX_LENGTH,
        `Raw content must be at most ${APP_CONSTANTS.DOCUMENT.CONTENT_MAX_LENGTH} characters`,
      )
      .optional(),
    documentType: z
      .nativeEnum(DocumentType, {
        errorMap: () => ({ message: "Invalid document type" }),
      })
      .optional(),
    template: z
      .nativeEnum(DocumentTemplate, {
        errorMap: () => ({ message: "Invalid template" }),
      })
      .optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.rawContent !== undefined ||
      data.documentType !== undefined ||
      data.template !== undefined,
    {
      message: "At least one field must be provided for update",
    },
  );

export const documentIdParamSchema = z.object({
  id: z.string().trim().min(1, "Document id is required"),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
export type DocumentIdParamInput = z.infer<typeof documentIdParamSchema>;
