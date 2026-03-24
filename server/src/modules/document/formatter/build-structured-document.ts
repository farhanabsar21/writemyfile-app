import { StructuredDocument } from "../document.types";

type ParsedSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export const buildStructuredDocument = (
  title: string,
  sections: ParsedSection[],
): StructuredDocument => {
  const safeSections = sections.map((section) => ({
    heading: section.heading,
    paragraphs: section.paragraphs ?? [],
    bullets:
      section.bullets && section.bullets.length > 0
        ? section.bullets
        : undefined,
  }));

  return {
    title,
    sections: safeSections,
  };
};
