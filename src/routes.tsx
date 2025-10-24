import Layout from "@/components/ui/Layout";
import { createBrowserRouter } from "react-router";
import HistoryPage from "./pages/history";
import HistoryDetails from "./pages/history/historyDetails";
import Planner from "./pages/planner";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <Layout />,
    ErrorBoundary: () => <ErrorBoundary />,
    children: [
      {
        path: "/",
        Component: () => <Planner />,
      },
      {
        path: "/history",
        Component: () => <HistoryPage />,
      },
      {
        path: "/history/:id",
        Component: () => <HistoryDetails />,
      },
    ],
  },
]);

export default router;
