import { prisma } from "@/lib/prisma";
import Link from "next/link";
import TaskList from "@/components/TaskList";

export default async function Home() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="flex flex-col gap-4 mx-auto w-[calc(100%-2rem)] max-w-5xl py-10 sm:w-[calc(100%-2.5rem)] sm:py-14">
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        Your tasks
      </h1>

      {tasks.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Nothing on your list yet
          </h2>
          <p className="mx-auto mt-2 mb-6 text-sm text-slate-500">
            Create your first task to get started.
          </p>
          <Link
            href="/tasks/new"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-300"
          >
            Create a task
          </Link>
        </div>
      ) : (
        <>
          <TaskList tasks={tasks} />
        </>
      )}
    </section>
  );
}
