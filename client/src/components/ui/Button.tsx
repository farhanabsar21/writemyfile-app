import type {
  ButtonHTMLAttributes,
  CSSProperties,
  PropsWithChildren,
} from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

type Props = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    fullWidth?: boolean;
  }
>;

const getVariantStyles = (variant: Variant): CSSProperties => {
  switch (variant) {
    case "secondary":
      return {
        background: "#f3f4f6",
        color: "#111827",
        border: "1px solid #d1d5db",
      };
    case "ghost":
      return {
        background: "transparent",
        color: "#111827",
        border: "1px solid transparent",
      };
    case "danger":
      return {
        background: "#dc2626",
        color: "#ffffff",
        border: "1px solid #dc2626",
      };
    case "primary":
    default:
      return {
        background: "#111827",
        color: "#ffffff",
        border: "1px solid #111827",
      };
  }
};

export const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  disabled,
  style,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        padding: "10px 16px",
        borderRadius: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: 14,
        fontWeight: 600,
        width: fullWidth ? "100%" : undefined,
        opacity: disabled ? 0.7 : 1,
        transition: "all 0.2s ease",
        ...getVariantStyles(variant),
        ...style,
      }}
    >
      {children}
    </button>
  );
};
