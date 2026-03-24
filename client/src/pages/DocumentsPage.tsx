import { useEffect, useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { getDocuments } from "../features/documents/api/getDocuments";
import type { DocumentListItem } from "../features/documents/types/document.types";
import { DocumentCard } from "../features/documents/components/DocumentCard";
import { Loader } from "../components/feedback/Loader";
import { EmptyState } from "../components/feedback/EmptyState";
import { ErrorState } from "../components/feedback/ErrorState";

export const DocumentsPage = () => {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await getDocuments();
        setDocuments(response);
      } catch {
        setErrorMessage("Failed to load documents");
      } finally {
        setIsLoading(false);
      }
    };

    void loadDocuments();
  }, []);

  return (
    <DashboardLayout>
      <div style={{ display: "grid", gap: 20 }}>
        <div>
          <h1>My documents</h1>
          <p style={{ color: "#6b7280" }}>
            View and manage your generated documents.
          </p>
        </div>

        {isLoading ? <Loader /> : null}
        {errorMessage ? <ErrorState message={errorMessage} /> : null}

        {!isLoading && !errorMessage && documents.length === 0 ? (
          <EmptyState
            title="No documents yet"
            description="Create your first document to see it here."
          />
        ) : null}

        <div style={{ display: "grid", gap: 16 }}>
          {documents.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
