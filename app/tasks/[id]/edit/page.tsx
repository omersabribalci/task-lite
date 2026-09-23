import { updateTask } from "@/app/actions";
import { TaskForm } from "@/components/TaskForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type EditTaskPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTaskPage({ params }: EditTaskPageProps) {
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
    <TaskForm
      action={updateTask.bind(null, task.id)}
      title="Edit task"
      description="Update the details of your task."
      submitLabel="Save changes"
      cancelHref={`/tasks/${task.id}`}
      task={task}
    />
  );
}
