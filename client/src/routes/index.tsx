import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import { DocumentsPage } from "../pages/DocumentsPage";
import { DocumentDetailsPage } from "../pages/DocumentDetailsPage";
import { NewDocumentPage } from "../pages/NewDocumentPage";
import { EditDocumentPage } from "../pages/EditDocumentPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/documents",
        element: <DocumentsPage />,
      },
      {
        path: "/documents/new",
        element: <NewDocumentPage />,
      },
      {
        path: "/documents/:id",
        element: <DocumentDetailsPage />,
      },
      {
        path: "/documents/:id/edit",
        element: <EditDocumentPage />,
      },
    ],
  },
]);
