import { Link, useNavigate } from "react-router";
import { Check, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

export default function Login() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((form) => ({
      ...form,
      [name]: value,
    }));

    setFormError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const checkFormValidation = () => {
    const email = form.email.trim();
    const password = form.password;

    const errors = {
      email: "",
      password: "",
    };

    if (!email) {
      errors.email = "Email is required.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    setFormError(errors);

    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkFormValidation()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      toast.success(data.message);
      setForm({
        email: "",
        password: "",
      });
      setFormError({
        email: "",
        password: "",
      });
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-50 px-6 py-12">
      <div className="mx-auto w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-600">
              <Check size={19} strokeWidth={4} className="text-white" />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              TaskFlow
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue to your TaskFlow account
            </p>
          </div>

          <form
            className={`mt-7 ${formError.email || formError.password ? " space-y-2" : " space-y-7"}`}
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  autoComplete="email"
                  disabled={loading}
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className={`h-11 w-full rounded-lg border bg-white pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${
                    formError.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-violet-500 focus:ring-violet-100"
                  }`}
                />
              </div>

              {formError.email && (
                <span className="text-xs ml-3 font-semibold text-red-500">
                  {formError.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-violet-600 hover:text-violet-700"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={form.password}
                  disabled={loading}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className={`h-11 w-full rounded-lg border pl-10 pr-10 text-sm outline-none transition placeholder:text-gray-400 ${
                    formError.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-violet-500 focus:ring-violet-100"
                  }`}
                />

         <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                  type="button"
                  onClick={handlePasswordToggle}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              {formError.password && (
                <span className="text-xs ml-3 font-semibold text-red-500">
                  {formError.password}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full cursor-pointer rounded-lg bg-[#111c2d] text-sm font-semibold text-white transition hover:bg-[#1b293d] hover:shadow-md disabled:opacity-60"
            >
              {loading ? "Signing In . . ." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-violet-600 hover:text-violet-700"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
