import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(AppContext);

  const [sendLoading, setSendLoading] = useState(false);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (userData?.isAccountVerified) {
    return (
      <main className="flex min-h-[calc(100vh-68px)] flex-1 justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
              <Mail className="h-7 w-7 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Email Already Verified
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Your email address has already been verified.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-8">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="mt-6 w-full cursor-pointer rounded-lg bg-[#111c2d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1b293d] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              Go to Dashboard
            </button>

            <Link
              to="/"
              className="mt-5 inline-block text-sm font-medium text-gray-500 transition hover:text-violet-600"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      return;
    }

    setOtp(value);
    setError("");
  };

  const handleSendOtp = async () => {
    setSendLoading(true);

    try {
      const response = await fetch(
        `${backendUrl}/api/auth/send-email-verification-otp`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setOtp("");
      setError("");

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSendLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError("OTP is required.");
      return;
    }

    if (!/^\d{4}$/.test(otp.trim())) {
      setError("OTP must be exactly 4 digits.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUserData((prev) => ({
        ...prev,
        isAccountVerified: true,
      }));

      toast.success(data.message);
      setOtp("");
      setError("");
      navigate("/dashboard");
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
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50">
            <Mail className="h-7 w-7 text-violet-600" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Verify your email
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Enter the verification code sent to your email address.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={sendLoading}
            className="mb-5 w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sendLoading ? "Sending OTP..." : "Send verification OTP"}
          </button>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Verification code
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={4}
                autoComplete="one-time-code"
                placeholder="Enter 4-digit OTP"
                disabled={loading}
                value={otp}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-center text-lg font-semibold tracking-[0.5em] text-gray-900 outline-none transition placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60 ${
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-violet-500 focus:ring-violet-100"
                }`}
              />

              {error && (
                <p className="ml-1 mt-1 text-xs text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-lg bg-[#111c2d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1b293d] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify email"}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-6 text-center">
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 transition hover:text-violet-600"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
