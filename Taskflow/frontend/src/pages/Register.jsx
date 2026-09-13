import { Link, useNavigate } from "react-router";
import { Check, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const checkFormValidation = () => {
    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password;

    const errors = {
      name: "",
      email: "",
      password: "",
    };

    if (!name) {
      errors.name = "Name is required.";
    } else if (name.length < 2) {
      errors.name = "Name must be at least 2 characters long.";
    } else if (!/^[A-Za-z]/.test(name)) {
      errors.name = "Name must start with a letter.";
    } else if (/[ '-]{2,}/.test(name)) {
      errors.name =
        "Name cannot contain consecutive spaces, hyphens, or apostrophes.";
    } else if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(name)) {
      errors.name =
        "Name can only contain letters, spaces, hyphens, or apostrophes.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!email.includes("@")) {
      errors.email = "Email must contain an '@' symbol.";
    } else if (!/^[a-zA-Z0-9._%+-]+@/.test(email)) {
      errors.email = "The username before the '@' contains invalid characters.";
    } else if (!/@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Use 1 uppercase, 1 lowercase, 1 number.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Use 1 uppercase, 1 lowercase, 1 number.";
    } else if (!/\d/.test(password)) {
      errors.password = "Use 1 uppercase, 1 lowercase, 1 number";
    }

    setFormError(errors);
    return !errors.name && !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkFormValidation()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        name: "",
        email: "",
        password: "",
      });
      setFormError({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 px-6 pt-10 pb-6">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Start organizing your tasks with TaskFlow
            </p>
          </div>

          <form
            className={`mt-7 ${formError.name ? "space-y-2" : "space-y-7"}`}
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  disabled={loading}
                  autoComplete="name"
                  placeholder="Your Name"
                  className={`h-11 w-full rounded-lg border pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 ${
                    formError.name
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-violet-500 focus:ring-violet-100"
                  }`}
                  onChange={handleChange}
                />
              </div>

              {formError.name && (
                <span className=" text-xs ml-3 font-semibold text-red-500">
                  {formError.name}
                </span>
              )}
            </div>

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
                  value={form.email}
                  disabled={loading}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`h-11 w-full rounded-lg border pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 ${
                    formError.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-violet-500 focus:ring-violet-100"
                  }`}
                  onChange={handleChange}
                />
              </div>

              {formError.email && (
                <span className=" text-xs ml-3 font-semibold text-red-500">
                  {formError.email}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

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
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className={`h-11 w-full rounded-lg border pl-10 pr-10 text-sm outline-none transition placeholder:text-gray-400 ${
                    formError.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-violet-500 focus:ring-violet-100"
                  }`}
                  onChange={handleChange}
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
                <span className=" text-xs ml-3 font-semibold text-red-500">
                  {formError.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 w-full cursor-pointer rounded-lg bg-[#111c2d] text-sm font-semibold text-white transition hover:bg-[#1b293d] hover:shadow-md disabled:opacity-60"
            >
              {loading ? "Creating Account . . ." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-600 hover:text-violet-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
