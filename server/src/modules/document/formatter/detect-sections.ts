type ParsedSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

const bulletRegex = /^(\-|\*|•)\s+/;
const numberedBulletRegex = /^\d+\.\s+/;

const isLikelyHeading = (line: string): boolean => {
  const trimmed = line.trim();

  if (!trimmed) return false;
  if (trimmed.length > 80) return false;
  if (bulletRegex.test(trimmed) || numberedBulletRegex.test(trimmed))
    return false;

  const headingLikePatterns = [
    /^[A-Z][A-Za-z0-9\s/&(),:-]{1,79}$/,
    /^\d+(\.\d+)*\s+[A-Z].*$/,
    /^[A-Z][A-Za-z\s]+:$/,
  ];

  return headingLikePatterns.some((pattern) => pattern.test(trimmed));
};

export const detectSections = (input: string): ParsedSection[] => {
  const blocks = input
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection = {
    paragraphs: [],
    bullets: [],
  };

  const pushCurrentSection = (): void => {
    const hasContent =
      Boolean(currentSection.heading) ||
      currentSection.paragraphs.length > 0 ||
      (currentSection.bullets?.length ?? 0) > 0;

    if (!hasContent) return;

    if (currentSection.bullets?.length === 0) {
      delete currentSection.bullets;
    }

    sections.push(currentSection);
    currentSection = {
      paragraphs: [],
      bullets: [],
    };
  };

  for (const block of blocks) {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) continue;

    if (lines.length === 1 && isLikelyHeading(lines[0])) {
      pushCurrentSection();
      currentSection.heading = lines[0].replace(/:$/, "");
      continue;
    }

    const bulletLines = lines.filter(
      (line) => bulletRegex.test(line) || numberedBulletRegex.test(line),
    );

    if (bulletLines.length === lines.length) {
      currentSection.bullets = [
        ...(currentSection.bullets ?? []),
        ...bulletLines.map((line) =>
          line.replace(bulletRegex, "").replace(numberedBulletRegex, "").trim(),
        ),
      ];
      continue;
    }

    currentSection.paragraphs.push(lines.join(" "));
  }

  pushCurrentSection();

  if (sections.length === 0) {
    return [
      {
        paragraphs: [input],
      },
    ];
  }

  return sections;
};
