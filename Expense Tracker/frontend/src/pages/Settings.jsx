import { useContext } from "react";
import { Link } from "react-router";
import {
  User,
  ShieldCheck,
  MailCheck,
  KeyRound,
  CalendarDays,
  Mail,
  ArrowRight,
} from "lucide-react";
import { AppContext } from "../context/AppContextProvider";

export default function Settings() {
  const { user, isVerified } = useContext(AppContext);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-stone-50">
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-stone-800 md:text-4xl">
            Settings
          </h1>

          <p className="mt-3 text-stone-500">
            Manage your profile and account security.
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile */}
          <section className="rounded-3xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center gap-4 border-b border-stone-200 p-6 md:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-700">
                <User size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-stone-800">Profile</h2>

                <p className="mt-1 text-sm text-stone-500">
                  Your account information.
                </p>
              </div>
            </div>

            <div className="divide-y divide-stone-100">
              {/* Name */}
              <div className="flex items-center justify-between gap-6 p-6 md:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                    <User size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                      Name
                    </p>

                    <p className="mt-1 font-semibold text-stone-700">
                      {user?.name || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between gap-6 p-6 md:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                    <Mail size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                      Email
                    </p>

                    <p className="mt-1 font-semibold text-stone-700">
                      {user?.email || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Created */}
              <div className="flex items-center justify-between gap-6 p-6 md:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                      Account Created
                    </p>

                    <p className="mt-1 font-semibold text-stone-700">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="rounded-3xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center gap-4 border-b border-stone-200 p-6 md:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-stone-800">Security</h2>

                <p className="mt-1 text-sm text-stone-500">
                  Manage your account security.
                </p>
              </div>
            </div>

            <div className="divide-y divide-stone-100">
              {/* Verify Email */}
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between md:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-700">
                    <MailCheck size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-stone-700">
                      Email Verification
                    </p>

                    <p className="mt-1 text-sm text-stone-500">
                      {isVerified
                        ? "Your email address is verified."
                        : "Verify your email address to secure your account."}
                    </p>
                  </div>
                </div>

                {!isVerified && (
                  <Link
                    to="/verify-email"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Verify Email
                    <ArrowRight size={16} />
                  </Link>
                )}

                {isVerified && (
                  <span className="text-sm font-semibold text-green-600">
                    Verified
                  </span>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between md:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                    <KeyRound size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-stone-700">
                      Forgot Password
                    </p>

                    <p className="mt-1 text-sm text-stone-500">
                      Reset your password using your email address.
                    </p>
                  </div>
                </div>

                <Link
                  to="/forgot-password"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
                >
                  Reset Password
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
