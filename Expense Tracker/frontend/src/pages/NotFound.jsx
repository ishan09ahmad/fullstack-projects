import { Link } from "react-router";
import { ArrowLeft, Home, Receipt, Wallet } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-stone-50">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-10 px-4 sm:px-8 py-12 md:grid-cols-2">
        {/* Left */}
        <div className="hidden md:block">
          <div className="max-w-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
              <Wallet size={26} />
            </div>

            <h1 className="text-4xl font-bold leading-tight text-stone-800">
              Looks like this page{" "}
              <span className="text-red-700">got lost.</span>
            </h1>

            <p className="mt-5 leading-7 text-stone-500">
              The page you're looking for doesn't exist or may have been moved.
              Let's get you back to your expenses.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm font-medium text-stone-600">
              <Receipt size={19} className="text-red-600" />
              Keep your finances organized.
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full max-w-md md:mx-0 mx-auto">
          <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm md:p-10">
            <div className="text-7xl font-bold tracking-tight text-red-700 md:text-8xl">
              404
            </div>

            <h2 className="mt-5 text-2xl font-bold text-stone-800">
              Page not found
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Sorry, we couldn't find the page you're looking for.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-red-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              <Home size={17} />
              Back to Home
            </Link>

            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-red-700"
              >
                <ArrowLeft size={16} />
                Return to Expense Tracker
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
