type TaskStatusBadgeProps = {
  status: string;
};

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const color =
    status === "COMPLETED"
      ? "bg-green-50 text-green-700"
      : status === "IN_PROGRESS"
        ? "bg-blue-50 text-blue-700"
        : "bg-slate-100 text-slate-600";

  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${color}`}>
      {status.replaceAll("_", " ").toLowerCase()}
    </span>
  );
}
