import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    otp: "",
    newPassword: "",
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
    const otp = form.otp.trim();
    const password = form.newPassword;

    const errors = {
      email: "",
      otp: "",
      newPassword: "",
    };

    if (!email) {
      errors.email = "Email is required.";
    }

    if (!otp) {
      errors.otp = "OTP is required.";
    }

    if (!password) {
      errors.newPassword = "Password is required.";
    } else if (password.length < 8) {
      errors.newPassword = "Password must be at least 8 characters.";
    } else if (!/[a-z]/.test(password)) {
      errors.newPassword = "Use 1 uppercase, 1 lowercase, and 1 number.";
    } else if (!/[A-Z]/.test(password)) {
      errors.newPassword = "Use 1 uppercase, 1 lowercase, and 1 number.";
    } else if (!/\d/.test(password)) {
      errors.newPassword = "Use 1 uppercase, 1 lowercase, and 1 number.";
    }

    setFormError(errors);

    return !errors.email && !errors.otp && !errors.newPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!checkFormValidation()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/auth/reset-password`, {
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
      setForm({
        email: "",
        otp: "",
        newPassword: "",
      });
      setFormError({
        email: "",
        otp: "",
        newPassword: "",
      });
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-68px)] flex-1 justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Enter your email, verification code, and your new password.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="you@example.com"
                  className={`h-11 w-full rounded-lg border bg-white pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                    formError.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-violet-500 focus:ring-violet-100"
                  }`}
                />
              </div>

              {formError.email && (
                <p className="ml-1 mt-1 text-xs text-red-600">
                  {formError.email}
                </p>
              )}
            </div>

            {/* OTP */}
            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Verification code
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength={4}
                autoComplete="one-time-code"
                value={form.otp}
                disabled={loading}
                onChange={(e) => {
                  if (!/^\d*$/.test(e.target.value)) return;
                  handleChange(e);
                }}
                placeholder="Enter 4-digit OTP"
                className={`h-11 w-full rounded-lg border bg-white px-4 text-center text-lg font-semibold tracking-[0.5em] text-gray-900 outline-none transition placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 focus:ring-2 ${
                  formError.otp
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-violet-500 focus:ring-violet-100"
                }`}
              />

              {formError.otp && (
                <p className="ml-1 mt-1 text-xs text-red-600">
                  {formError.otp}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                New password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  autoComplete="new-password"
                  value={form.newPassword}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Enter new password"
                  className={`h-11 w-full rounded-lg border bg-white pl-10 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 disabled:opacity-60 ${
                    formError.newPassword
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

              {formError.newPassword && (
                <p className="ml-1 mt-1 text-xs text-red-600">
                  {formError.newPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full cursor-pointer rounded-lg bg-[#111c2d] text-sm font-semibold text-white transition hover:bg-[#1b293d] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-violet-600"
            >
              <ArrowLeft size={16} />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
