import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = (props: Props) => {
  return (
    <textarea
      {...props}
      style={{
        width: "100%",
        minHeight: 260,
        padding: "12px 14px",
        borderRadius: 10,
        border: "1px solid #d1d5db",
        fontSize: 14,
        resize: "vertical",
        outline: "none",
        background: "#ffffff",
      }}
    />
  );
};
