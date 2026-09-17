import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, ArrowRight, Wallet } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((form) => ({
      ...form,
      [name]: value,
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
    } else if (!email.includes("@")) {
      errors.email = "Email must contain an '@' symbol.";
    } else if (!/^[a-zA-Z0-9._%+-]+@/.test(email)) {
      errors.email = "The username before the '@' contains invalid characters.";
    } else if (!/@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    setFormError(errors);

    return !errors.email && !errors.password;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkFormValidation()) {
      return;
    }
    try {
    } catch (error) {}

    console.log(form);
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-stone-50 px-6 py-12 b flex items-center justify-center">
      <div className="mx-auto flex  max-w-300 items-center justify-center ">
        <div className="grid w-full max-w-250 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl md:grid-cols-2">
          <div className="p-7 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold text-red-700">Welcome back</p>

              <h2 className="mt-2 text-3xl font-bold text-stone-800">
                Sign in to your account
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Enter your details to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className={`${formError.email ? "mb-3" : "mb-5"}`}>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  Email
                </label>

                <input
                  name="email"
                  id="email"
                  type="text"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                />
                {formError.email && (
                  <span className=" text-xs ml-3 font-semibold text-red-500">
                    {formError.email}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className={`${formError.password ? "mb-3" : "mb-5"}`}>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-stone-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-red-700 hover:text-red-600"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    name="password"
                    id="password"
                    autoComplete="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 pr-11 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-stone-400 hover:text-stone-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                  {formError.password && (
                    <span className=" text-xs ml-3 font-semibold text-red-500">
                      {formError.password}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-700 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Sign In
                <ArrowRight size={17} />
              </button>
            </form>

            {/* Register */}
            <p className="mt-7 text-center text-sm text-stone-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-red-700 hover:text-red-600"
              >
                Create one
              </Link>
            </p>
          </div>

          <div className="hidden bg-red-700 p-10 text-white md:flex md:flex-col md:justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Wallet size={24} />
              </div>

              <h1 className="mt-8 text-4xl font-bold leading-tight">
                Welcome back.
              </h1>

              <p className="mt-4 max-w-sm leading-7 text-red-50">
                Keep track of your spending and stay in control of your finances
                with Expense Tracker.
              </p>
            </div>

            <p className="text-sm text-red-100">
              Track today, better tomorrow.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
