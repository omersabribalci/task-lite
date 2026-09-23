import type { Task } from "@/generated/prisma/client";

type TaskFormFieldsProps = {
  task?: Task;
};

export function TaskFormFields({ task }: TaskFormFieldsProps) {
  const controlClass =
    "min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-3 focus:outline-blue-100";
  const fieldClass = "grid gap-2";
  const labelClass = "text-sm font-semibold text-slate-700";

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-10">
      <div className="grid content-start gap-5">
        <div className={fieldClass}>
          <label className={labelClass} htmlFor="title">Title</label>
          <input
            className={controlClass}
            id="title"
            name="title"
            type="text"
            placeholder="What needs to be done?"
            defaultValue={task?.title ?? ""}
            required
          />
        </div>
        <div className={fieldClass}>
          <label className={labelClass} htmlFor="description">Description</label>
          <textarea
            className={`${controlClass} min-h-32 resize-y`}
            id="description"
            name="description"
            placeholder="Add a few details (optional)"
            defaultValue={task?.description ?? ""}
            rows={6}
          />
        </div>
      </div>

      <div className="grid content-start gap-5">
        <div className={fieldClass}>
          <label className={labelClass} htmlFor="status">Status</label>
          <select
            className={controlClass}
            id="status"
            name="status"
            defaultValue={task?.status ?? "PENDING"}
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div className={fieldClass}>
          <label className={labelClass} htmlFor="priority">Priority</label>
          <select
            className={controlClass}
            id="priority"
            name="priority"
            defaultValue={task?.priority ?? "MEDIUM"}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div className={fieldClass}>
          <label className={labelClass} htmlFor="dueDate">Due date</label>
          <input
            className={controlClass}
            id="dueDate"
            name="dueDate"
            type="date"
            defaultValue={task?.dueDate?.toISOString().slice(0, 10) ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
