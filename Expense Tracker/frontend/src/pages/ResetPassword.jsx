import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, Wallet } from "lucide-react";

export default function ResetPassword() {
  const [form, setForm] = useState({
    otp: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    otp: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };
  const checkFormValidation = () => {
    const otp = form.otp.trim();
    const password = form.password;

    const errors = {
      otp: "",
      password: "",
    };

    if (!otp) {
      errors.otp = "OTP is required.";
    } else if (otp.length !== 6) {
      errors.otp = "6-digit OTP is required.";
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

    return !errors.otp && !errors.password;
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
    <main className="min-h-[calc(100vh-72px)] bg-stone-50">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-300 items-center gap-10 px-4 sm:px-8 py-12 md:grid-cols-2">
        <div className="hidden md:block">
          <div className="max-w-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
              <Wallet size={26} />
            </div>

            <h1 className="text-4xl font-bold leading-tight text-stone-800">
              Create a new <span className="text-red-700">password.</span>
            </h1>

            <p className="mt-5 leading-7 text-stone-500">
              Choose a strong password to keep your Expense Tracker account
              protected.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm font-medium text-stone-600">
              <ShieldCheck size={19} className="text-red-600" />
              Keep your account secure.
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto md:mx-0">
          <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm md:p-9">
            <h2 className="text-2xl font-bold text-stone-800">
              Reset password
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Enter the OTP and create your new password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 ">
              {/* OTP */}
              <div className={`${formError.otp ? "mb-3" : "mb-5"}`}>
                <label
                  htmlFor="otp"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  OTP
                </label>

                <div className="relative">
                  <ShieldCheck
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    name="otp"
                    value={form.otp}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        handleChange(e);
                      }
                    }}
                    placeholder="Enter 6-digit OTP"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm tracking-widest text-stone-700 outline-none transition placeholder:text-stone-400 placeholder:tracking-normal focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                </div>
                {formError.otp && (
                  <span className=" text-xs ml-3 font-semibold text-red-500">
                    {formError.otp}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className={`${formError.password ? "mb-3" : "mb-5"}`}>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  New password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    autoComplete="new-password"
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-11 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                className="w-full cursor-pointer rounded-xl bg-red-700 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
