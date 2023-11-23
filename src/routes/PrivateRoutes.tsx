import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { LANDINGPAGE } from "./paths";
import { useAuth0 } from "@auth0/auth0-react";

export const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return "Loading...";
  return isAuthenticated ? <>{children}</> : <Navigate to={LANDINGPAGE} />;
};
