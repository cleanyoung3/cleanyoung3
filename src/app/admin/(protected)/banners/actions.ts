"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSitePermission } from "@/lib/auth";

export async function updatePageBanner(pageKey: string, formData: FormData) {
  await requireSitePermission();

  const eyebrow = String(formData.get("eyebrow") || "").trim();
  const lead = String(formData.get("lead") || "").trim();
  const titleLine1 = String(formData.get("titleLine1") || "").trim();
  const titleLine2 = String(formData.get("titleLine2") || "").trim();
  const mediaType = String(formData.get("mediaType") || "none");
  const mediaUrl = String(formData.get("mediaUrl") || "").trim();

  if (!eyebrow || !titleLine1) return;

  await prisma.pageBanner.update({
    where: { pageKey },
    data: {
      eyebrow,
      lead: lead || null,
      titleLine1,
      titleLine2: titleLine2 || null,
      mediaType: mediaType === "image" || mediaType === "video" ? mediaType : "none",
      mediaUrl: mediaType === "none" ? null : mediaUrl || null,
    },
  });

  revalidatePath("/admin/banners");
  revalidatePath("/story");
  revalidatePath("/notices");
  revalidatePath("/support");
  revalidatePath("/partnership");
  revalidatePath("/services/aircon");
  revalidatePath("/services/sofa-mattress");
  revalidatePath("/services/movein");
}
