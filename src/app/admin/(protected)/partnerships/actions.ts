"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSitePermission } from "@/lib/auth";

export async function updatePartnershipStatus(id: string, status: string) {
  await requireSitePermission();
  await prisma.partnershipRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/partnerships");
}

export async function deletePartnershipRequest(id: string) {
  await requireSitePermission();
  await prisma.partnershipRequest.delete({ where: { id } });
  revalidatePath("/admin/partnerships");
}
