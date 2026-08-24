"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSitePermission } from "@/lib/auth";

export async function createFaq(formData: FormData) {
  await requireSitePermission();
  const question = String(formData.get("question") || "").trim();
  const answer = String(formData.get("answer") || "").trim();
  if (!question || !answer) return;

  const count = await prisma.faqItem.count();
  await prisma.faqItem.create({ data: { question, answer, order: count } });
  revalidatePath("/admin/faq");
  revalidatePath("/support");
}

export async function updateFaq(id: string, formData: FormData) {
  await requireSitePermission();
  const question = String(formData.get("question") || "").trim();
  const answer = String(formData.get("answer") || "").trim();
  if (!question || !answer) return;

  await prisma.faqItem.update({ where: { id }, data: { question, answer } });
  revalidatePath("/admin/faq");
  revalidatePath("/support");
}

export async function deleteFaq(id: string) {
  await requireSitePermission();
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/admin/faq");
  revalidatePath("/support");
}
