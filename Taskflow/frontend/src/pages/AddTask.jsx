import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, CalendarDays, Flag } from "lucide-react";
import { toast } from "react-toastify";

export default function AddTask() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    dueDate: "",
    priority: "medium",
    important: false,
    completed: false,
  });

  const [formError, setFormError] = useState({
    title: "",
    dueDate: "",
  });

  const formValidation = () => {
    const title = form.title.trim();
    const dueDate = form.dueDate;
    const dueDateMs = new Date(form.dueDate).getTime();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMs = today.getTime();

    const errors = {
      title: "",
      dueDate: "",
    };

    if (!title) {
      errors.title = "Task title is required.";
    }

    if (!dueDate) {
      errors.dueDate = "Due date is required.";
    } else if (dueDateMs < todayMs) {
      errors.dueDate = "Please choose today or a future date.";
    }

    setFormError(errors);

    return !errors.title && !errors.dueDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValidation()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/task/add-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-68px)] bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl">
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-violet-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Add New Task
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create a new task and stay organized.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Task
              </label>

              <input
                name="title"
                id="title"
                type="text"
                value={form.title}
                maxLength={120}
                disabled={loading}
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value });
                  setFormError({
                    ...formError,
                    title: "",
                  });
                }}
                placeholder="Enter task"
                className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                  formError.title
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-violet-500 focus:ring-violet-100"
                }`}
              />

              {formError.title && (
                <p className="ml-3 text-xs text-red-600">{formError.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Due date
              </label>

              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  name="dueDate"
                  id="dueDate"
                  type="date"
                  value={form.dueDate}
                  disabled={loading}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setForm({ ...form, dueDate: e.target.value });
                    setFormError({
                      ...formError,
                      dueDate: "",
                    });
                  }}
                  className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:ring-2 ${
                    formError.dueDate
                      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-violet-500 focus:ring-violet-100"
                  }`}
                />
              </div>

              {formError.dueDate && (
                <p className="ml-3 text-xs text-red-600">{formError.dueDate}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Priority
              </label>

              <select
                name="priority"
                id="priority"
                disabled={loading}
                value={form.priority}
                onChange={(e) => {
                  setForm({ ...form, priority: e.target.value });
                }}
                className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm capitalize text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  if (!loading) {
                    setForm({ ...form, important: !form.important });
                  }
                }}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-4 text-left transition ${
                  form.important
                    ? "border-violet-200 bg-violet-50"
                    : "border-gray-100 bg-gray-50 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Flag
                    className={`h-5 w-5 ${
                      form.important
                        ? "fill-violet-600 text-violet-600"
                        : "text-gray-400"
                    }`}
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Mark as important
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Add this task to your important tasks.
                    </p>
                  </div>
                </div>

                <span
                  className={`relative h-6 w-11 rounded-full transition ${
                    form.important ? "bg-violet-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      form.important ? "left-6" : "left-1"
                    }`}
                  />
                </span>
              </button>
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={loading}
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer rounded-lg bg-[#111c2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b293d] hover:shadow-md disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
