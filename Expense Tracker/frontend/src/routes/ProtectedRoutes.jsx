import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import Spinner from "../components/Spinner";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoutes() {
  const { isLoggedIn,appLoading } = useContext(AppContext);
  if (appLoading) return <Spinner />;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}
