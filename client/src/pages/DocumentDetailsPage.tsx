import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { getDocumentById } from "../features/documents/api/getDocumentById";
import type { DocumentItem } from "../features/documents/types/document.types";
import { DocumentPreview } from "../features/documents/components/DocumentPreview";
import { Loader } from "../components/feedback/Loader";
import { ErrorState } from "../components/feedback/ErrorState";
import { Button } from "../components/ui/Button";
import { exportPdf } from "../features/documents/api/exportPdf";
import { exportDocx } from "../features/documents/api/exportDocx";
import { deleteDocument } from "../features/documents/api/deleteDocument";
import { downloadBlob } from "../utils/downloadBlob";

export const DocumentDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [document, setDocument] = useState<DocumentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDownloadPdf = async () => {
    if (!id) return;

    try {
      setErrorMessage("");
      setIsDownloadingPdf(true);
      const file = await exportPdf(id);
      downloadBlob(file.blob, file.fileName);
    } catch {
      setErrorMessage("Failed to export PDF");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadDocx = async () => {
    if (!id) return;

    try {
      setErrorMessage("");
      setIsDownloadingDocx(true);
      const file = await exportDocx(id);
      downloadBlob(file.blob, file.fileName);
    } catch {
      setErrorMessage("Failed to export DOCX");
    } finally {
      setIsDownloadingDocx(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this document?",
    );

    if (!confirmed) return;

    try {
      setErrorMessage("");
      setIsDeleting(true);
      await deleteDocument(id);
      navigate("/documents");
    } catch {
      setErrorMessage("Failed to delete document");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DashboardLayout>
      {isLoading ? <Loader /> : null}
      {errorMessage ? <ErrorState message={errorMessage} /> : null}

      {document ? (
        <div style={{ display: "grid", gap: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1 style={{ marginBottom: 6 }}>{document.title}</h1>
              <p style={{ margin: 0, color: "#6b7280" }}>
                Type: {document.documentType} • Template: {document.template}
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to={`/documents/${document.id}/edit`}>
                <Button variant="secondary">Edit</Button>
              </Link>

              <Button
                variant="secondary"
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
              >
                {isDownloadingPdf ? "Downloading PDF..." : "Download PDF"}
              </Button>

              <Button onClick={handleDownloadDocx} disabled={isDownloadingDocx}>
                {isDownloadingDocx ? "Downloading DOCX..." : "Download DOCX"}
              </Button>

              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>

          <DocumentPreview document={document.structuredContent} />
        </div>
      ) : null}
    </DashboardLayout>
  );
};
