import { useContext, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Flag,
  ListTodo,
  MoreVertical,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

import { quotes } from "../utils/data.js";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";


export default function Dashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { tasks, setTasks, getTasks } = useContext(AppContext);

  const [filter, setFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const quote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname, location.search]);

  const filters = [
    {
      id: "all",
      label: "All Tasks",
      icon: ListTodo,
      count: tasks.length,
    },

    {
      id: "active",
      label: "Active",
      icon: CheckCircle2,
      count: tasks.filter((task) => !task.completed).length,
    },

    {
      id: "completed",
      label: "Completed",
      icon: Check,
      count: tasks.filter((task) => task.completed).length,
    },

    {
      id: "important",
      label: "Important",
      icon: Star,
      count: tasks.filter((task) => task.important).length,
    },

    {
      id: "overdue",
      label: "Overdue",
      icon: CalendarDays,
      count: tasks.filter(
        (task) =>
          !task.completed &&
          new Date(task.dueDate).getTime() < new Date().setHours(0, 0, 0, 0),
      ).length,
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    if (filter === "overdue") {
      return (
        !task.completed &&
        new Date(task.dueDate).getTime() < new Date().setHours(0, 0, 0, 0)
      );
    }

    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "important") {
      return task.important;
    }

    return true;
  });


  const toggleCompleted = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/task/toggleCompleted`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setTasks(
        tasks.map((task) => {
          if (task._id === id) {
            return { ...task, completed: !task.completed };
          }

          return task;
        }),
      );
    } catch (error) {
      toast.error(error.message);
    }
  };


  const toggleImportant = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/task/toggleImportant`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setTasks(
        tasks.map((task) => {
          if (task._id === id) {
            return { ...task, important: !task.important };
          }

          return task;
        }),
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/task/deleteTask`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
     toast.success(data.message)
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDueDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getPriorityStyle = (priority) => {
    if (priority === "high") {
      return "bg-red-50 text-red-600";
    }

    if (priority === "medium") {
      return "bg-yellow-50 text-yellow-600";
    }

    return "bg-gray-100 text-gray-500";
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50">
      <div className="min-h-[calc(100vh-70px)]">
        <aside className="fixed left-0 top-17 hidden h-[calc(100vh-70px)] w-64 shrink-0 border-r border-gray-100 bg-white lg:block">
          <div className="flex h-full flex-col">
            <nav className="space-y-1 p-4">
              {filters.map((item) => {
                const Icon = item.icon;
                const isActive = filter === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm transition ${
                      isActive
                        ? "bg-violet-50 font-semibold text-gray-900"
                        : "font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? "text-violet-600" : "text-gray-400"
                        }`}
                      />

                      {item.label}
                    </span>

                    <span className="text-xs text-gray-400">{item.count}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto p-6">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm italic leading-6 text-gray-500">
                  "{quote.text}"
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-6 pb-24 sm:px-6 lg:ml-64 lg:px-10 lg:py-8 lg:pb-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {filters.find((item) => item.id === filter)?.label}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Stay organized and get things done.
                </p>
              </div>

              <Link
                to="/add-task"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
              >
                <Plus className="h-4 w-4" />

                <span className="hidden sm:inline">Add Task</span>

                <span className="sm:hidden">Add</span>
              </Link>
            </div>

            <div className="mb-4 flex items-center gap-1 overflow-x-auto border-b border-gray-100">
              {["all", "active", "completed", "important", "overdue"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`relative shrink-0 cursor-pointer rounded-t-lg px-5 py-3 text-sm capitalize transition ${
                      filter === item
                        ? "font-semibold text-gray-900"
                        : "font-medium text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {item}

                    {filter === item && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-violet-600" />
                    )}
                  </button>
                ),
              )}
            </div>

            {/* Tasks */}
            {filteredTasks.length > 0 ? (
              <div className="overflow-visible rounded-2xl border border-gray-100 bg-white shadow-sm">
                {filteredTasks.map((task) => (
                  <div
                    key={task._id}
                    className="group flex items-center gap-3 border-b border-gray-100 px-4 py-5 last:border-b-0 sm:gap-4 sm:px-5"
                  >
                    {/* Complete */}
                    <button
                      type="button"
                      onClick={() => toggleCompleted(task._id)}
                      className="shrink-0 cursor-pointer"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <span className="block h-5 w-5 rounded-full border-2 border-gray-300 transition group-hover:border-violet-500" />
                      )}
                    </button>

                    {/* Title + Due Date */}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-sm font-medium ${
                          task.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                        <CalendarDays className="h-3.5 w-3.5" />

                        <span
                          className={`${
                            !task.completed &&
                            new Date(task.dueDate).getTime() <
                              new Date().setHours(0, 0, 0, 0) &&
                            "text-red-500 font-semibold"
                          }`}
                        >
                          {getDueDate(task.dueDate)}
                        </span>
                      </div>
                    </div>

                    {/* Priority */}
                    <span
                      className={`hidden rounded-full px-2.5 py-1 text-xs font-semibold capitalize sm:block ${getPriorityStyle(
                        task.priority,
                      )}`}
                    >
                      {task.priority}
                    </span>

                    {/* Important */}
                    <button
                      type="button"
                      onClick={() => toggleImportant(task._id)}
                      className="shrink-0 cursor-pointer"
                    >
                      <Flag
                        className={`h-4 w-4 ${
                          task.important
                            ? "fill-red-500 text-red-500"
                            : "text-gray-300 hover:text-gray-400"
                        }`}
                      />
                    </button>

                    {/* Three Dot Menu */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(openMenu === task._id ? null : task._id)
                        }
                        className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-50 hover:text-gray-700"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>

                      {openMenu === task._id && (
                        <div className="absolute right-0 top-10 z-30 w-36 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenu(null);
                              navigate(`/tasks/${task._id}`);
                            }}
                            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                          >
                            <Pencil className="h-4 w-4" />
                            Update
                          </button>

                         
                          <button
                            type="button"
                            onClick={() => deleteTask(task._id)}
                            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50">
                  <ListTodo className="h-7 w-7 text-violet-600" />
                </div>

                <h2 className="mt-5 text-lg font-bold text-gray-900">
                  No tasks yet
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  You don't have any tasks in this list. Create your first task
                  and start getting things done.
                </p>

                <Link
                  to="/add-task"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#111c2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b293d] hover:shadow-md"
                >
                  <Plus className="h-4 w-4" />
                  Add Task
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white lg:hidden">
        <div className="grid grid-cols-3">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`flex cursor-pointer flex-col items-center gap-1 py-3 ${
              filter === "all" ? "text-violet-600" : "text-gray-500"
            }`}
          >
            <ListTodo className="h-5 w-5" />

            <span className="text-[11px] font-semibold">All Tasks</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("overdue")}
            className={`flex cursor-pointer flex-col items-center gap-1 py-3 ${
              filter === "overdue" ? "text-violet-600" : "text-gray-500"
            }`}
          >
            <CalendarDays className="h-5 w-5" />

            <span className="text-[11px] font-semibold">Overdue</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("important")}
            className={`flex cursor-pointer flex-col items-center gap-1 py-3 ${
              filter === "important" ? "text-violet-600" : "text-gray-500"
            }`}
          >
            <Star className="h-5 w-5" />

            <span className="text-[11px] font-semibold">Important</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
