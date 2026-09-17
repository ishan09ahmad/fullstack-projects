import { useContext } from "react";
import {
  BarChart3,
  Receipt,
  ShieldCheck,
  Wallet,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import { AppContext } from "../context/AppContextProvider";

export default function About() {
  const { isLoggedIn, appLoading } = useContext(AppContext);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-stone-50">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
            About Expense Tracker
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-stone-800 md:text-6xl">
            A simpler way to understand{" "}
            <span className="text-red-700">your money.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-500">
            Expense Tracker is designed to make managing your personal finances
            simple, organized, and easy to understand.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
                Why Expense Tracker
              </p>

              <h2 className="mt-3 text-3xl font-bold text-stone-800 md:text-4xl">
                Know where your money goes.
              </h2>

              <p className="mt-5 leading-7 text-stone-500">
                Managing expenses shouldn't feel complicated. Expense Tracker
                gives you a clear place to record transactions, track your
                income, and understand your spending habits.
              </p>

              <p className="mt-4 leading-7 text-stone-500">
                Instead of keeping track of everything manually, you can keep
                your financial information organized and accessible in one
                place.
              </p>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="mt-6 flex items-center gap-2 rounded-full bg-red-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600 w-50 h-12"
                  >
                    {appLoading ? " " : "Go to Dashboard"}
                    {appLoading ? " " : <ArrowRight size={17} />}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="mt-6 flex items-center gap-2 rounded-full bg-red-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600 w-40 h-12"
                  >
                    {appLoading ? " " : "Get Started"}
                    {appLoading ? " " : <ArrowRight size={17} />}
                  </Link>
                </>
              )}
            </div>

            {/* Balance Card */}
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-500">
                    Your finances
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-stone-800">
                    All in one place
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                  <Wallet size={23} />
                </div>
              </div>

              <div className="mt-7 space-y-4">
                <div className="rounded-2xl bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-700">
                      <Receipt size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-stone-700">
                        Track transactions
                      </p>
                      <p className="text-xs text-stone-500">
                        Keep your expenses organized
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                      <BarChart3 size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-stone-700">
                        Understand spending
                      </p>
                      <p className="text-xs text-stone-500">
                        View useful financial summaries
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-700">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-stone-700">
                        Stay organized
                      </p>
                      <p className="text-xs text-stone-500">
                        Keep everything together
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              What you can do
            </p>

            <h2 className="mt-3 text-3xl font-bold text-stone-800 md:text-4xl">
              Everything you need to stay organized.
            </h2>

            <p className="mt-4 text-stone-500">
              Simple tools that help you keep track of your financial activity
              without unnecessary complexity.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Receipt size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-stone-800">
                Manage Transactions
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Add and organize your income and expenses so you always have a
                clear record of your financial activity.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                <BarChart3 size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-stone-800">
                View Your Reports
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Get a clearer picture of your spending through summaries and
                useful financial data.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Wallet size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-stone-800">
                Track Your Finances
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Keep your financial information in one place and make it easier
                to understand how you're managing your money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-red-800">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to take control?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-red-100">
            Start organizing your expenses and get a clearer view of your
            finances.
          </p>

          {!isLoggedIn && (
            <div className="mt-7">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-red-800 transition hover:bg-red-50 w-45 h-12"
              >
                {appLoading ? "" : "Create Account"}
                {appLoading ? "" : <ArrowRight size={17} />}
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
