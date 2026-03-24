import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { getDocumentById } from "../features/documents/api/getDocumentById";
import type { DocumentItem } from "../features/documents/types/document.types";
import { DocumentForm } from "../features/documents/components/DocumentForm";
import { Loader } from "../components/feedback/Loader";
import { ErrorState } from "../components/feedback/ErrorState";

export const EditDocumentPage = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<DocumentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDocument = async () => {
      if (!id) {
        setErrorMessage("Document id is missing");
        setIsLoading(false);
        return;
      }

      try {
        const response = await getDocumentById(id);
        setDocument(response);
      } catch {
        setErrorMessage("Failed to load document");
      } finally {
        setIsLoading(false);
      }
    };

    void loadDocument();
  }, [id]);

  return (
    <DashboardLayout>
      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <h1>Edit document</h1>
          <p style={{ color: "#6b7280" }}>
            Update your title, content, type, or template.
          </p>
        </div>

        {isLoading ? <Loader /> : null}
        {errorMessage ? <ErrorState message={errorMessage} /> : null}

        {document && id ? (
          <DocumentForm mode="edit" documentId={id} initialValues={document} />
        ) : null}
      </div>
    </DashboardLayout>
  );
};
