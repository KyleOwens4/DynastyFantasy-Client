import {
  Link,
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AccountForm, { AccountFormView } from "./pages/AccountForm";
import { AppShell } from "@mantine/core";
import Header from "./components/shell/Header";
import useAuthentication from "./hooks/auth/useAuthentication";
import App from "./App";

export default function FantasyReferenceRouter() {
  const { isAuthenticated } = useAuthentication();
  const router = buildRouter(isAuthenticated);

  return <RouterProvider router={router} />;
}

function buildRouter(isAuthenticated: boolean) {
  return createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <p>Oops! Cannot find page</p>,
      children: [
        {
          path: "auth",
          element: isAuthenticated ? <Navigate to={"/"} /> : <Outlet />,
          children: [
            {
              path: "signin",
              element: <AccountForm variant={AccountFormView.signin} />,
            },
            {
              path: "signup",
              element: <AccountForm variant={AccountFormView.signup} />,
            },
            {
              index: true,
              element: <Navigate to={"/auth/signin"} />,
            },
          ],
        },
      ],
    },
  ]);
}
