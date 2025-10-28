import Layout from "@/components/ui/Layout";
import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const Planner = lazy(() => import("./pages/planner"));
const HistoryPage = lazy(() => import("./pages/history"));
const HistoryDetails = lazy(() => import("./pages/history/historyDetails"));
const ErrorBoundary = lazy(() => import("./components/ErrorBoundary"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <Layout />,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: "/",
        Component: Planner,
      },
      {
        path: "/history",
        Component: HistoryPage,
      },
      {
        path: "/history/:id",
        Component: HistoryDetails,
      },
    ],
  },
]);

export default router;
