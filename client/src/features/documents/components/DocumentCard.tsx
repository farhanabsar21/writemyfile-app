import { Link } from "react-router-dom";
import type { DocumentListItem } from "../types/document.types";
import { formatDate } from "../../../utils/formatDate";

type Props = {
  document: DocumentListItem;
};

export const DocumentCard = ({ document }: Props) => {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 18,
        background: "#ffffff",
        display: "grid",
        gap: 8,
      }}
    >
      <h3 style={{ margin: 0 }}>{document.title}</h3>
      <p style={{ margin: 0, color: "#4b5563" }}>
        Type: {document.documentType}
      </p>
      <p style={{ margin: 0, color: "#4b5563" }}>
        Template: {document.template}
      </p>
      <p style={{ margin: 0, color: "#6b7280" }}>
        Created: {formatDate(document.createdAt)}
      </p>

      <div style={{ display: "flex", gap: 12 }}>
        <Link to={`/documents/${document.id}`}>View details</Link>
        <Link to={`/documents/${document.id}/edit`}>Edit</Link>
      </div>
    </div>
  );
};
