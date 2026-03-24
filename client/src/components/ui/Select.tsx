import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = (props: Props) => {
  return (
    <select
      {...props}
      style={{
        width: "100%",
        padding: "12px 14px",
        borderRadius: 10,
        border: "1px solid #d1d5db",
        fontSize: 14,
        background: "#ffffff",
        outline: "none",
      }}
    />
  );
};
