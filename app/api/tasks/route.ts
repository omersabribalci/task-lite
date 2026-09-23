import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";
import { unstable_cache } from "next/cache";

const getCachedTasks = unstable_cache(
  async (search: string, status: string | null) => {
    console.log("[TaskLite] Prisma query (cache miss)");

    return prisma.task.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        title: search ? { contains: search } : undefined,
        status: status && status !== "all" ? status : undefined,
      },
    });
  },
  ["tasks-list"],
  { tags: ["tasks"], revalidate: 60 },
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchRaw = searchParams.get("search");
  const search = searchRaw ? searchRaw.trim() : "";
  const status = searchParams.get("status");

  const tasks = await getCachedTasks(search, status);

  return Response.json({ tasks });
}
