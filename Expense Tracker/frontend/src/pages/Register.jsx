import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, ArrowRight, Wallet } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((form) => ({
      ...form,
      [name]: value,
    }));
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
    <main className="min-h-[calc(100vh-72px)] bg-stone-50 px-6 py-4  flex items-center justify-center">
      <div className="mx-auto flex  max-w-300 items-center justify-center">
        <div className="grid w-full max-w-250 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl md:grid-cols-2">
          <div className=" p-7 ">
            <div className="mb-7">
              <p className="text-sm font-semibold text-red-700">Get started</p>

              <h1 className="mt-2 text-3xl font-bold text-stone-800">
                Create your account
              </h1>

              <p className="mt-2 text-sm text-stone-500">
                Start keeping your expenses organized.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className={`${formError.name ? "mb-2" : "mb-4"}`}>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  Full Name
                </label>

                <input
                  name="name"
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                />
                {formError.name && (
                  <span className=" text-xs ml-3 font-semibold text-red-500">
                    {formError.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className={`${formError.email ? "mb-2" : "mb-4"}`}>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
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
              <div className={`${formError.password ? "mb-2" : "mb-4"}`}>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
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

              {/* Confirm Password */}

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-700 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Create Account
                <ArrowRight size={17} />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-red-700 hover:text-red-600"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Right Side */}
          <div className=" hidden bg-red-700 p-7 text-white  md:flex md:flex-col md:justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Wallet size={24} />
              </div>

              <h2 className="mt-8 text-4xl font-bold leading-tight">
                Your money,
                <br />
                your clarity.
              </h2>

              <p className="mt-4 max-w-sm leading-7 text-red-50">
                Create your account and get a simple view of your income,
                expenses, and spending habits.
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 p-5">
              <p className="text-sm font-medium text-red-50">Start small.</p>

              <p className="mt-1 text-lg font-semibold">
                Build better financial habits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
