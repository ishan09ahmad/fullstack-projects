import { useContext, useEffect, useState } from "react";
import { CheckCircle, MailCheck, ShieldCheck, Wallet } from "lucide-react";

export default function VerifyEmail() {
  const isVerified = false;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleSendOtp = () => {
    setOtpSent(true);
    setCountdown(60);
  };

  const handleChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setOtp(e.target.value);
    }
  };

  const checkFormValidation = () => {
    const e = otp.trim();
    let err = "";

    if (!e) {
      err = "OTP is required.";
    } else if (e.length !== 6) {
      err = "6-digit OTP is required.";
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
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-10 px-6  py-12 sm:px-8 md:grid-cols-2">
        {/* Left */}
        <div className="hidden md:block">
          <div className="max-w-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
              <Wallet size={26} />
            </div>

            <h1 className="text-4xl font-bold leading-tight text-stone-800">
              {isVerified ? (
                <>
                  Your email is{" "}
                  <span className="text-green-600">verified.</span>
                </>
              ) : (
                <>
                  Verify your <span className="text-red-700">email.</span>
                </>
              )}
            </h1>

            <p className="mt-5 leading-7 text-stone-500">
              {isVerified
                ? "Your email address has already been verified. Your account is secure and ready to use."
                : "Verify your email address to keep your Expense Tracker account secure and access all features."}
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm font-medium text-stone-600">
              {isVerified ? (
                <>
                  <CheckCircle size={19} className="text-green-600" />
                  Email verification completed.
                </>
              ) : (
                <>
                  <ShieldCheck size={19} className="text-red-600" />
                  Secure account verification.
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="mx-auto w-full max-w-md md:mx-0">
          <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm md:p-9">
            {isVerified ? (
              /* Already Verified */
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                  <CheckCircle size={28} />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-stone-800">
                  Email already verified
                </h2>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Your email address has already been verified. You don't need
                  to verify it again.
                </p>
              </div>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                  <MailCheck size={23} />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-stone-800">
                  Verify your email
                </h2>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                  We'll send a verification code to your registered email
                  address.
                </p>

                <form onSubmit={handleSubmit} className="mt-8">
                  <label
                    htmlFor="otp"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    Verification code
                  </label>

                  <div className="relative">
                    <ShieldCheck
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />

                    <input
                      name="otp"
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={handleChange}
                      disabled={!otpSent}
                      placeholder={
                        otpSent ? "Enter 6-digit OTP" : "Send OTP first"
                      }
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm tracking-widest text-stone-700 outline-none transition placeholder:text-stone-400 placeholder:tracking-normal focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
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
                    className="mt-4 w-full cursor-pointer rounded-xl border border-red-200 bg-red-50 py-3.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {otpSent ? `Resend OTP in ${countdown}s` : "Send OTP"}
                  </button>

                  <button
                    type="submit"
                    disabled={!otpSent}
                    className="mt-3 w-full cursor-pointer rounded-xl bg-red-700 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Verify Email
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
