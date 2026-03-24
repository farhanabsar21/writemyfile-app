import { ProcessedDocumentContent } from "../document.types";
import { buildStructuredDocument } from "./build-structured-document";
import { detectSections } from "./detect-sections";
import { normalizeText } from "./normalize";
import { removeAiNoise } from "./remove-ai-noise";

export const processDocumentContent = (
  title: string,
  rawContent: string,
): ProcessedDocumentContent => {
  const normalized = normalizeText(rawContent);
  const cleaned = removeAiNoise(normalized);
  const sections = detectSections(cleaned);
  const structuredContent = buildStructuredDocument(title, sections);

  return {
    cleanedContent: cleaned,
    structuredContent,
  };
};
