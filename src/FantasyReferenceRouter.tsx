import {
  Link,
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Authentication, { AuthenticationView } from "./pages/Authentication";
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
              element: <Authentication variant={AuthenticationView.signin} />,
            },
            {
              path: "signup",
              element: <Authentication variant={AuthenticationView.signup} />,
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
