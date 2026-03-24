import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: Props) => {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "12px 14px",
        borderRadius: 10,
        border: "1px solid #d1d5db",
        fontSize: 14,
        outline: "none",
        background: "#ffffff",
      }}
    />
  );
};
