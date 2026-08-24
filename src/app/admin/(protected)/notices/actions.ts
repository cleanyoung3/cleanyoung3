"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSitePermission } from "@/lib/auth";

export async function createNotice(formData: FormData) {
  const session = await requireSitePermission();
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const isPinned = formData.get("isPinned") === "on";
  if (!title || !content) return;

  await prisma.notice.create({
    data: { title, content, isPinned, authorName: session.displayName || "운영자" },
  });
  revalidatePath("/admin/notices");
  revalidatePath("/notices");
  redirect("/admin/notices");
}

export async function updateNotice(id: string, formData: FormData) {
  await requireSitePermission();
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const isPinned = formData.get("isPinned") === "on";
  if (!title || !content) return;

  await prisma.notice.update({ where: { id }, data: { title, content, isPinned } });
  revalidatePath("/admin/notices");
  revalidatePath("/notices");
  revalidatePath(`/notices/${id}`);
  redirect("/admin/notices");
}

export async function deleteNotice(id: string) {
  await requireSitePermission();
  await prisma.notice.delete({ where: { id } });
  revalidatePath("/admin/notices");
  revalidatePath("/notices");
}
