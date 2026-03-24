import type { StructuredDocument } from "../types/document.types";

type Props = {
  document: StructuredDocument;
};

export const DocumentPreview = ({ document }: Props) => {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 32,
        background: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <h1 style={{ marginTop: 0 }}>{document.title}</h1>

      {document.sections.map((section, index) => (
        <section key={index} style={{ marginBottom: 28 }}>
          {section.heading ? <h2>{section.heading}</h2> : null}

          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} style={{ lineHeight: 1.7 }}>
              {paragraph}
            </p>
          ))}

          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex} style={{ marginBottom: 8 }}>
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
};
