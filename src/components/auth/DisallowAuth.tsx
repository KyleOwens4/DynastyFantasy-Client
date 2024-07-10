import { Navigate, Outlet } from "react-router-dom";
import useAuthentication from "../../hooks/auth/useAuthentication";
import { Loader } from "@mantine/core";

interface IProps {
  children?: React.ReactNode;
}

export function DisallowAuth({ children }: IProps) {
  const { fetching, isAuthenticated } = useAuthentication();

  console.log(fetching, isAuthenticated);
  if (fetching) return <Loader />;
  if (isAuthenticated) return <Navigate to={"/"} replace />;

  return children ? children : <Outlet />;
}
