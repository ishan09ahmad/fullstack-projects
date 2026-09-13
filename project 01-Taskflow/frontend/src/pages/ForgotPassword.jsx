import { Link, useNavigate } from "react-router";
import { Check, Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
  });

  const [formError, setFormError] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setForm({ email: e.target.value });

    setFormError({ email: "" });
  };

  const checkFormValidation = () => {
    const email = form.email.trim();

    const errors = {
      email: "",
    };

    if (!email) {
      errors.email = "Email is required.";
    }

    setFormError(errors);

    return !errors.email;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkFormValidation()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/auth/forgot-password`, {
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
      });
      setFormError({
        email: "",
      });
      toast.success(data.message);
      navigate("/reset-password");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 px-6 py-12 flex items-center justify-center">
      <div className="mx-auto w-full max-w-md ">
        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <Mail size={23} />
          </div>

          <div className="mt-5 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Forgot your password?
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          <form className="mt-7" onSubmit={handleSubmit}>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={form.email}
                disabled={loading}
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border border-gray-200 pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                onChange={handleChange}
              />
            </div>
            {formError.email && (
              <span className="text-xs ml-3 font-semibold text-red-500">
                {formError.email}
              </span>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 h-11 w-full cursor-pointer rounded-lg bg-[#111c2d] text-sm font-semibold text-white transition hover:bg-[#1b293d] hover:shadow-md disabled:opacity-60"
            >
              {loading ? "Sending Otp . . ." : "Send Otp"}
            </button>
          </form>

          <Link
            to="/login"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-violet-600"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
