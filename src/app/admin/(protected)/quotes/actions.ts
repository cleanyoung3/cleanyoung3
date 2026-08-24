"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSitePermission } from "@/lib/auth";

export async function updateQuoteStatus(id: string, status: string) {
  await requireSitePermission();
  await prisma.quoteRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/quotes");
}

export async function deleteQuoteRequest(id: string) {
  await requireSitePermission();
  await prisma.quoteRequest.delete({ where: { id } });
  revalidatePath("/admin/quotes");
}
