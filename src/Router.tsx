import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AccountDetailsPage from "./pages/AccountDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/details",
    element: <AccountDetailsPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
