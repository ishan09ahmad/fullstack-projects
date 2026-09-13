import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router";
import Home from "../pages/Home";
import RootLayout from "../layouts/RootLayout";
import Features from "../pages/Features";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AddTask from "../pages/AddTask";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyEmail from "../pages/verifyEmail";
import ResetPassword from "../pages/ResetPassword";
import NotFound from "../pages/NotFound";
import UpdateTask from "../pages/UpdateTask";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/features" element={<Features />} />

      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/tasks/:id" element={<UpdateTask />} />
        <Route path="/tasks" element={<Navigate to="/dashboard" replace />} />
        <Route path="verify-email" element={<VerifyEmail />} />
      </Route>

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default router;
