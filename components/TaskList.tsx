"use client";
import Link from "next/link";
import SearchFilter from "./SearchFilter";
import { TaskStatusBadge } from "./TaskStatusBadge";
import type { Task } from "@/generated/prisma/client";
import { useEffect, useState } from "react";

type ApiTask = Omit<Task, "dueDate" | "createdAt" | "updatedAt"> & {
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterTerm, setFilterTerm] = useState<string>("all");
  const [gorevler, setGorevler] = useState(tasks);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Client-side filtering example, kept for comparison with the API approach:
  // const formattedSearchTerm = searchTerm.trim().toLowerCase();
  // const filteredTasks = tasks.filter((task) => {
  //   if (
  //     task.title.toLowerCase().includes(formattedSearchTerm) &&
  //     (filterTerm === "all" || filterTerm === task.status)
  //   ) {
  //     return true;
  //   }
  //   return false;
  // });

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      const fetchTasks = async () => {
        const params = new URLSearchParams({
          search: searchTerm,
          status: filterTerm,
        });

        try {
          const res = await fetch(`/api/tasks?${params.toString()}`, {
            signal: controller.signal,
          });
          if (!res.ok) throw new Error("Failed to fetch tasks");

          const data = (await res.json()) as { tasks: ApiTask[] };
          if (controller.signal.aborted) return;

          setGorevler(
            data.tasks.map((task) => ({
              ...task,
              dueDate: task.dueDate ? new Date(task.dueDate) : null,
              createdAt: new Date(task.createdAt),
              updatedAt: new Date(task.updatedAt),
            })),
          );
          setFetchError(null);
        } catch {
          if (!controller.signal.aborted) {
            setFetchError("Could not load tasks. Please try again.");
          }
        }
      };

      void fetchTasks();
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchTerm, filterTerm]);

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-10 mb-4 flex items-center justify-between gap-4">
        <h2 className="font-semibold text-slate-900">All tasks</h2>
        <span className="text-sm text-slate-500">
          {gorevler.length} {gorevler.length === 1 ? "task" : "tasks"}
        </span>
      </div>
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterTerm={filterTerm}
        setFilterTerm={setFilterTerm}
      />
      {fetchError && <p role="alert" className="text-sm text-red-700">{fetchError}</p>}
      {gorevler.length === 0 ? (
        <div>No matching tasks!</div>
      ) : (
        <ul className="grid gap-3">
          {gorevler.map((task) => (
            <li
              className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus-within:border-blue-200 focus-within:shadow-md"
              key={task.id}
            >
              <Link
                className="block rounded-2xl px-6 py-5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-300"
                href={`/tasks/${task.id}`}
              >
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
                  <h3 className="text-base font-semibold tracking-tight text-slate-900">
                    {task.title}
                  </h3>
                  <TaskStatusBadge status={task.status} />
                </div>
                {task.description && (
                  <p className="mt-2 truncate text-sm text-slate-500">
                    {task.description}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span>
                    Priority:{" "}
                    <span className="capitalize">
                      {task.priority.toLowerCase()}
                    </span>
                  </span>
                  {task.dueDate && (
                    <span>
                      Due{" "}
                      {task.dueDate.toLocaleDateString("en-US", {
                        dateStyle: "medium",
                        timeZone: "UTC",
                      })}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
