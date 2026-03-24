type Props = {
  message: string;
};

export const ErrorState = ({ message }: Props) => {
  return (
    <div
      style={{
        border: "1px solid #fecaca",
        background: "#fef2f2",
        color: "#991b1b",
        borderRadius: 12,
        padding: 16,
      }}
    >
      {message}
    </div>
  );
};
