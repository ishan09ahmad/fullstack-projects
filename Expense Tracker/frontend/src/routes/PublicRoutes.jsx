import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import Spinner from "../components/Spinner";
import { Navigate, Outlet } from "react-router";

export default function PublicRoutes() {
  const { isLoggedIn, appLoading } = useContext(AppContext);
  if (appLoading) return <Spinner />;

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
