import { DashboardLayout } from "../layouts/DashboardLayout";
import { DocumentForm } from "../features/documents/components/DocumentForm";

export const NewDocumentPage = () => {
  return (
    <DashboardLayout>
      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <h1>New document</h1>
          <p style={{ color: "#6b7280" }}>
            Paste your AI-generated text, choose a template, and generate a
            clean document.
          </p>
        </div>
        <DocumentForm />
      </div>
    </DashboardLayout>
  );
};
