import { prisma } from "@/lib/prisma";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createTask = async (formData: FormData) => {
  "use server";

  const title = String(formData.get("title") ?? "").trim();
  const descriptionRaw = String(formData.get("description") ?? "").trim();
  const status = String(formData.get("status") ?? "");
  const priority = String(formData.get("priority") ?? "");
  const dueDateRaw = String(formData.get("dueDate") ?? "");

  const description = descriptionRaw ? descriptionRaw : null;
  const dueDate = dueDateRaw ? new Date(dueDateRaw) : null;

  if (title === "") return;

  await prisma.task.create({
    data: {
      title,
      description,
      status,
      priority,
      dueDate,
    },
  });

  revalidatePath("/");
  updateTag("tasks");
  redirect("/");
};

export const updateTask = async (id: number, formData: FormData) => {
  "use server";

  const title = String(formData.get("title") ?? "").trim();
  const descriptionRaw = String(formData.get("description") ?? "").trim();
  const status = String(formData.get("status") ?? "");
  const priority = String(formData.get("priority") ?? "");
  const dueDateRaw = String(formData.get("dueDate") ?? "");

  const description = descriptionRaw ? descriptionRaw : null;
  const dueDate = dueDateRaw ? new Date(dueDateRaw) : null;

  if (title === "") return;

  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      status,
      priority,
      dueDate,
    },
  });

  revalidatePath("/");
  revalidatePath(`/tasks/${id}`);
  updateTag("tasks");
  redirect(`/tasks/${id}`);
};

export const deleteTask = async (id: number) => {
  "use server";
  await prisma.task.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/");
  updateTag("tasks");
  redirect("/");
};
