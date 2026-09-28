import { Navigate, Outlet } from "react-router";

import Spinner from "../components/Spinner";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function PublicRoutes() {
  const {appLoading,isLoggedIn}=useContext(AppContext);


  if (appLoading) {
    return <Spinner />;
  }

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
