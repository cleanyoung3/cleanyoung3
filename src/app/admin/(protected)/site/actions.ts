"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSitePermission } from "@/lib/auth";

export async function updateHeroSlide(id: string, formData: FormData) {
  await requireSitePermission();
  const presetKeyRaw = String(formData.get("presetKey") || "");
  const presetKey = presetKeyRaw === "custom" ? null : presetKeyRaw;
  const headline = String(formData.get("headline") || "").trim();
  const subCopy = String(formData.get("subCopy") || "").trim();
  const bodyText = String(formData.get("bodyText") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const statKey = presetKey || null;

  await prisma.heroSlide.update({
    where: { id },
    data: { presetKey, headline, subCopy, bodyText, imageUrl: imageUrl || null, statKey },
  });
  revalidatePath("/admin/site");
  revalidatePath("/");
}

export async function updateStat(key: string, formData: FormData) {
  await requireSitePermission();
  const value = Number(formData.get("value"));
  const label = String(formData.get("label") || "").trim();
  if (Number.isNaN(value) || !label) return;

  await prisma.siteStat.update({ where: { key }, data: { value, label } });
  revalidatePath("/admin/site");
  revalidatePath("/");
  revalidatePath("/services/aircon");
  revalidatePath("/services/sofa-mattress");
  revalidatePath("/services/movein");
}

export async function updateSettings(formData: FormData) {
  await requireSitePermission();
  const keys = [
    "phone_number",
    "representative_name",
    "business_reg_no",
    "address",
    "social_instagram_url",
    "social_threads_url",
    "social_band_url",
    "social_kakao_url",
  ];
  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value === "string") {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
  }
  revalidatePath("/admin/site");
  revalidatePath("/", "layout");
}
