import type { PropsWithChildren } from "react";
import { Navbar } from "../components/common/Navbar";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <Navbar />
      <main
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: 24,
        }}
      >
        {children}
      </main>
    </div>
  );
};
