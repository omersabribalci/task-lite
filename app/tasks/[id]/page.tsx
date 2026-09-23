import { prisma } from "@/lib/prisma";
import { TaskStatusBadge } from "@/components/TaskStatusBadge";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteTask } from "@/app/actions";

type TaskDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = await params;
  const taskId = Number(id);

  if (!Number.isInteger(taskId)) {
    notFound();
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    notFound();
  }

  return (
    <section className="mx-auto w-[calc(100%-2rem)] max-w-5xl py-10 sm:w-[calc(100%-2.5rem)] sm:py-14">
      <Link
        className="mb-6 inline-block text-sm font-medium text-slate-500 hover:text-blue-700 focus-visible:rounded focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-300"
        href="/"
      >
        ← Back to tasks
      </Link>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
              Task details
            </span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              {task.title}
            </h1>
          </div>
          <TaskStatusBadge status={task.status} />
        </div>
        <p className="mt-5 whitespace-pre-wrap leading-7 text-slate-600">
          {task.description || "No description added."}
        </p>
        <dl className="mt-8 grid gap-7 border-t border-slate-200 pt-7 sm:grid-cols-2 [&_dd]:mt-1 [&_dd]:font-semibold [&_dd]:text-slate-800 [&_dt]:text-xs [&_dt]:text-slate-500">
          <div>
            <dt>Status</dt>
            <dd className="capitalize">
              {task.status.replaceAll("_", " ").toLowerCase()}
            </dd>
          </div>
          <div>
            <dt>Priority</dt>
            <dd className="capitalize">{task.priority.toLowerCase()}</dd>
          </div>
          <div>
            <dt>Due date</dt>
            <dd>
              {task.dueDate?.toLocaleDateString("en-US", {
                dateStyle: "medium",
                timeZone: "UTC",
              }) ?? "Not set"}
            </dd>
          </div>
          <div>
            <dt>Created</dt>
            <dd>
              {task.createdAt.toLocaleDateString("en-US", {
                dateStyle: "medium",
              })}
            </dd>
          </div>
        </dl>
        <div className="mt-8 flex gap-3">
          <Link
            href={`/tasks/${task.id}/edit`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-300"
          >
            Edit task
          </Link>
          <form action={deleteTask.bind(null, task.id)}>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-300 cursor-pointer"
            >
              Delete
            </button>
          </form>
        </div>
      </article>
    </section>
  );
}
