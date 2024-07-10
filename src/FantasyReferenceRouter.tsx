import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Authentication, { AuthenticationView } from "./pages/Authentication";
import App from "./App";
import { DisallowAuth } from "./components/auth/DisallowAuth";

export default function FantasyReferenceRouter() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>Oops! Cannot find page</p>,
    children: [
      {
        path: "auth",
        element: <DisallowAuth />,
        children: [
          {
            path: "signin",
            element: (
              <DisallowAuth>
                <Authentication variant={AuthenticationView.signin} />
              </DisallowAuth>
            ),
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
