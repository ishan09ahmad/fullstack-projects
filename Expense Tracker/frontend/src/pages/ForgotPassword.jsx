import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck, Wallet } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleSendOtp = () => {
    setOtpSent(true);
    setCountdown(60);
  };


  const checkFormValidation = () => {
    const e = email.trim();
    let err = "";

    if (!e) {
      err = "Email is required.";
    } else if (!e.includes("@")) {
      err = "Email must contain an '@' symbol.";
    } else if (!/^[a-zA-Z0-9._%+-]+@/.test(e)) {
      err = "The username before the '@' contains invalid characters.";
    } else if (!/@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)) {
      err = "Please enter a valid email address.";
    }

    setError(err);

    return !err;
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

  useEffect(() => {
    if (!otpSent) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setOtpSent(false);
          return 60;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent]);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-stone-50">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-300 items-center gap-10 px-4 sm:px-8 py-12 md:grid-cols-2 ">
        {/* Left */}
        <div className="w-full max-w-md mx-auto">
          <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm md:p-9">
            <h2 className="text-2xl font-bold text-stone-800">
              Forgot password?
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Enter your email address and we'll send you an OTP to reset your
              password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  id="email"
                  type="text"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
                />
              </div>
              {error && (
                <span className=" text-xs ml-3 font-semibold text-red-500">
                  {error}
                </span>
              )}
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpSent}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {otpSent ? `Resend OTP in ${countdown}s` : "Send OTP"}
              </button>

              <button
                type="submit"
                className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-700 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Continue
                <ArrowRight size={17} />
              </button>
            </form>

            <Link
              to="/login"
              className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-red-700"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="hidden md:block ">
          <div className="max-w-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
              <Wallet size={26} />
            </div>

            <h1 className="text-4xl font-bold leading-tight text-stone-800">
              Get back to managing your{" "}
              <span className="text-red-700">expenses.</span>
            </h1>

            <p className="mt-5 leading-7 text-stone-500">
              Don't worry if you've forgotten your password. Enter your email
              and we'll help you get back into your account.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm font-medium text-stone-600">
              <ShieldCheck size={19} className="text-red-600" />
              Your account remains secure.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
