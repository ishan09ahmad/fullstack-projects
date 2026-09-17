import { Link } from "react-router";
import {
  ArrowRight,
  BarChart3,
  Wallet,
  ShieldCheck,
  Receipt,
} from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";

export default function Home() {
  const { isLoggedIn, appLoading } = useContext(AppContext);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-stone-50">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="mb-5 inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
              Simple. Smart. Financial.
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-stone-800 md:text-6xl">
              Take control of your{" "}
              <span className="text-red-700">expenses.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-500">
              Track your income, manage your expenses, and understand where your
              money goes — all in one simple place.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 rounded-full bg-red-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600 w-50 h-12"
                  >
                    {appLoading ? " " : "Go to Dashboard"}
                    {appLoading ? " " : <ArrowRight size={17} />}
                  </Link>

                  <Link
                    to="/transactions"
                    className="rounded-full border border-stone-200 bg-white px-6 py-3.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 w-45 h-12"
                  >
                    {appLoading ? " " : "View Transactions"}
                    
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 rounded-full bg-red-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600 w-40 h-12"
                  >
                    {appLoading ? " " : "Get Started"}
                    {appLoading ? " " : <ArrowRight size={17} />}
                  </Link>

                  <Link
                    to="/login"
                    className="flex items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-3.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 w-23 h-12"
                  >
                    {appLoading ? " " : "Login"}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right - Preview Card */}
          <div className="relative">
            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-lg md:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-500">
                    Total Balance
                  </p>

                  <h2 className="mt-1 text-3xl font-bold text-stone-800">
                    ₹45,250
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                  <Wallet size={23} />
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-stone-50 p-4">
                  <p className="text-sm text-stone-500">Income</p>

                  <p className="mt-1 text-xl font-bold text-stone-800">
                    ₹60,000
                  </p>

                  <p className="mt-1 text-xs font-medium text-green-600">
                    This month
                  </p>
                </div>

                <div className="rounded-2xl bg-red-50 p-4">
                  <p className="text-sm text-stone-500">Expenses</p>

                  <p className="mt-1 text-xl font-bold text-stone-800">
                    ₹14,750
                  </p>

                  <p className="mt-1 text-xs font-medium text-red-600">
                    This month
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div className="mt-6 rounded-2xl bg-stone-50 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-stone-800">
                    Spending Overview
                  </p>

                  <p className="text-xs font-medium text-stone-500">
                    This Month
                  </p>
                </div>

                <div className="mt-6 flex h-40 items-end justify-between gap-3">
                  {[45, 70, 55, 85, 60, 95, 65, 78, 50, 72, 58, 88].map(
                    (height, index) => (
                      <div key={index} className="flex h-full flex-1 items-end">
                        <div
                          className="w-full rounded-t-lg bg-red-600"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-stone-800">
                    Recent Transactions
                  </p>

                  <Receipt size={18} className="text-stone-400" />
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                        <Receipt size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-stone-700">
                          Groceries
                        </p>

                        <p className="text-xs text-stone-500">Food</p>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-red-600">
                      -₹2,500
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                        <Receipt size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-stone-700">
                          Netflix
                        </p>

                        <p className="text-xs text-stone-500">Entertainment</p>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-red-600">-₹649</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Everything in one place
            </p>

            <h2 className="mt-3 text-3xl font-bold text-stone-800 md:text-4xl">
              Make your money easier to understand.
            </h2>

            <p className="mt-4 text-stone-500">
              Keep track of your finances with simple tools designed to give you
              a clear picture of your spending.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Wallet size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-stone-800">
                Track Expenses
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Record your daily expenses and keep everything organized in one
                place.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                <BarChart3 size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-stone-800">
                Understand Spending
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                See where your money goes through clear summaries and useful
                financial data.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <ShieldCheck size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-stone-800">
                Stay Organized
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Keep your financial information organized so you always know
                what is happening with your money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-red-800">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-red-300" />

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Take control of where your money goes.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-red-100 md:text-lg">
            Understand your spending, stay organized, and make better decisions
            about your finances with a clearer picture of every expense.
          </p>
        </div>
      </section>
    </main>
  );
}
