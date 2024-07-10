import { Navigate, Outlet } from "react-router-dom";
import useAuthentication from "../../hooks/auth/useAuthentication";

interface IProps {
  children?: React.ReactNode;
}

export function RequireAuth({ children }: IProps) {
  const { isAuthenticated } = useAuthentication();

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return children ? children : <Outlet />;
}
