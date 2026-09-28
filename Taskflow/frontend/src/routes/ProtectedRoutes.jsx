import { Navigate, Outlet } from "react-router";
import Spinner from "../components/Spinner";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
export default function ProtectedRoutes() {
  const { appLoading, isLoggedIn } = useContext(AppContext);
  if (appLoading) {
    return <Spinner />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
