import { Link, createBrowserRouter } from "react-router-dom";
import AccountForm, { AccountFormView } from "./pages/AccountForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Link to={"/signin"}>Sign in</Link>,
    errorElement: <p>Oops! Cannot find page</p>,
  },
  {
    path: "signin",
    element: <AccountForm variant={AccountFormView.signin} />,
  },
  {
    path: "signup",
    element: <AccountForm variant={AccountFormView.signup} />,
  },
]);
