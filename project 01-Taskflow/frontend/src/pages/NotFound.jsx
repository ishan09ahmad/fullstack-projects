import { Link } from "react-router";
import { ArrowLeft, Check, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600">
            <Check className="h-5 w-5 text-white" strokeWidth={3} />
          </div>

          <span className="text-xl font-extrabold tracking-tight text-[#111c2d]">
            TaskFlow
          </span>
        </div>

        {/* 404 */}
        <p className="text-8xl font-extrabold tracking-tight text-violet-600 sm:text-9xl">
          404
        </p>

        <h1 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#111c2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b293d] hover:shadow-md"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}