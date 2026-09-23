import { createTask } from "@/app/actions";
import { TaskForm } from "@/components/TaskForm";

export default function NewTaskPage() {
  return (
    <TaskForm
      action={createTask}
      title="New task"
      description="Add the details, then save your task."
      submitLabel="Create task"
      cancelHref="/"
    />
  );
}
