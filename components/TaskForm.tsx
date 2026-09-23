import type { Task } from "@/generated/prisma/client";
import Link from "next/link";
import { TaskFormFields } from "./TaskFormFields";

type TaskFormProps = {
  action: (formData: FormData) => Promise<void>;
  title: string;
  description: string;
  submitLabel: string;
  cancelHref: string;
  task?: Task;
};

export function TaskForm({
  action,
  title,
  description,
  submitLabel,
  cancelHref,
  task,
}: TaskFormProps) {
  return (
    <section className="mx-auto flex w-[calc(100%-2rem)] max-w-4xl flex-1 flex-col justify-center py-10 sm:w-[calc(100%-2.5rem)] sm:pb-16">
      <form action={action} className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">TaskLite</span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <TaskFormFields task={task} />
        <div className="flex justify-end gap-3 pt-1">
          <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-300" href={cancelHref}>
            Cancel
          </Link>
          <button className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-300" type="submit">
            {submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
