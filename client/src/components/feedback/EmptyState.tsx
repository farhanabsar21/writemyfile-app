type Props = {
  title: string;
  description?: string;
};

export const EmptyState = ({ title, description }: Props) => {
  return (
    <div
      style={{
        border: "1px dashed #d1d5db",
        borderRadius: 12,
        padding: 24,
        textAlign: "center",
        background: "#fafafa",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {description ? (
        <p style={{ marginBottom: 0, color: "#6b7280" }}>{description}</p>
      ) : null}
    </div>
  );
};
