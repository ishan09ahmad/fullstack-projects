import { Link } from "react-router";
import { Check, CheckCircle2, Calendar, Star, ArrowRight,Plus,CalendarDays,Flag,MoreVertical } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Home() {
  const {isLoggedIn} =useContext(AppContext) 

  return (
    <div className="min-h-[calc(100vh-70px)] bg-white">
      <section className="relative overflow-hidden px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-125 w-175 -translate-x-1/2 rounded-full bg-violet-100/50 blur-3xl" />

        <div className="mx-auto max-w-4xl text-center">
          {/* Small badge */}
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-600 sm:text-sm">
            <CheckCircle2 size={16} />
            Simple task management
          </div>

          {/* Heading */}
          <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Get things done.
            <span className="block text-violet-600">Stay organized.</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            TaskFlow helps you organize your tasks, focus on what matters, and
            stay productive without unnecessary complexity.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111c2d] px-7 text-sm font-semibold text-white transition-all hover:bg-[#1b293d] hover:shadow-md sm:w-auto"
              >
                Go to Dashboard
                <ArrowRight size={17} />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex h-11 w-full items-center justify-center rounded-full bg-[#111c2d] px-7 text-sm font-semibold text-white transition-all hover:bg-[#1b293d] hover:shadow-md sm:w-auto"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex h-11 w-full items-center justify-center rounded-full border border-gray-200 bg-white px-7 text-sm font-semibold text-gray-700 transition-all hover:border-violet-200 hover:text-violet-600 sm:w-auto"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

    <section className="bg-gray-50 px-6 py-16 sm:py-20">
  <div className="mx-auto max-w-250">
    <div className="mb-10 text-center">
      <p className="text-sm font-semibold text-violet-600">
        Everything in one place
      </p>

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        A workspace built around your tasks
      </h2>
    </div>

    {/* Dashboard preview */}
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
      {/* Dashboard header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-7">
        <div>
          <h3 className="text-base font-bold text-gray-900">
            All Tasks
          </h3>

          <p className="mt-0.5 text-xs text-gray-400">
            Stay organized and get things done.
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white">
          <Plus size={14} />
          Add Task
        </button>
      </div>

      <div className="space-y-0 p-5 sm:p-7">
        {/* Task 1 */}
        <div className="group flex items-center gap-3 border-b border-gray-100 px-1 py-5 sm:gap-4">
          <div className="h-5 w-5 shrink-0 rounded-full border-2 border-gray-300" />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">
              Complete React project
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
              <CalendarDays size={14} />
              <span>Today</span>
            </div>
          </div>

          <span className="hidden rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 sm:block">
            High
          </span>

          <Flag
            size={16}
            className="shrink-0 fill-red-500 text-red-500"
          />

          <MoreVertical
            size={18}
            className="shrink-0 text-gray-300"
          />
        </div>

        {/* Task 2 */}
        <div className="group flex items-center gap-3 border-b border-gray-100 px-1 py-5 sm:gap-4">
          <div className="h-5 w-5 shrink-0 rounded-full border-2 border-gray-300" />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">
              Practice JavaScript
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
              <CalendarDays size={14} />
              <span>Tomorrow</span>
            </div>
          </div>

          <span className="hidden rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-semibold text-yellow-600 sm:block">
            Medium
          </span>

          <Flag
            size={16}
            className="shrink-0 text-gray-300"
          />

          <MoreVertical
            size={18}
            className="shrink-0 text-gray-300"
          />
        </div>

        {/* Task 3 */}
        <div className="group flex items-center gap-3 border-b border-gray-100 px-1 py-5 sm:gap-4">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-violet-500">
            <Check size={13} className="text-violet-600" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-400 line-through">
              Read documentation
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
              <CalendarDays size={14} />
              <span>Sep 15</span>
            </div>
          </div>

          <span className="hidden rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500 sm:block">
            Low
          </span>

          <Flag
            size={16}
            className="shrink-0 text-gray-300"
          />

          <MoreVertical
            size={18}
            className="shrink-0 text-gray-300"
          />
        </div>

        {/* Task 4 */}
        <div className="group flex items-center gap-3 px-1 py-5 sm:gap-4">
          <div className="h-5 w-5 shrink-0 rounded-full border-2 border-gray-300" />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">
              Build authentication system
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
              <CalendarDays size={14} />
              <span>Sep 13</span>
            </div>
          </div>

          <span className="hidden rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 sm:block">
            High
          </span>

          <Flag
            size={16}
            className="shrink-0 fill-red-500 text-red-500"
          />

          <MoreVertical
            size={18}
            className="shrink-0 text-gray-300"
          />
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-250">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <CheckCircle2 size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Manage Tasks
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Create and manage your tasks from one clean workspace.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Calendar size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Stay Organized
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Keep track of today's tasks and everything coming next.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Star size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Prioritize
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Mark important tasks so your priorities are always clear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#111c2d] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get things done?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-300">
            Keep your tasks organized and focus on what matters most.
          </p>

          <div className="mt-7">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111c2d] transition hover:bg-gray-100"
              >
                Go to Dashboard
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111c2d] transition hover:bg-gray-100"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
