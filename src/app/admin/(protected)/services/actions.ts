"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSitePermission } from "@/lib/auth";

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function updateServicePage(slug: string, formData: FormData) {
  await requireSitePermission();

  const badge = String(formData.get("badge") || "").trim();
  const headline = String(formData.get("headline") || "").trim();
  const subCopy = String(formData.get("subCopy") || "").trim();
  const bodyText = String(formData.get("bodyText") || "").trim();
  const heroImage = String(formData.get("heroImage") || "").trim();
  const worries = linesToArray(String(formData.get("worries") || ""));
  const processTitle = String(formData.get("processTitle") || "").trim();
  const featuresTitle = String(formData.get("featuresTitle") || "").trim();
  const features = linesToArray(String(formData.get("features") || ""));

  const processSteps = [1, 2, 3].map((i) => ({
    title: String(formData.get(`processStep${i}Title`) || "").trim(),
    desc: String(formData.get(`processStep${i}Desc`) || "").trim(),
    image: String(formData.get(`processStep${i}Image`) || "").trim(),
  }));

  if (!headline || !heroImage) return;

  await prisma.servicePage.update({
    where: { slug },
    data: {
      badge,
      headline,
      subCopy,
      bodyText,
      heroImage,
      worries: JSON.stringify(worries),
      processTitle,
      processSteps: JSON.stringify(processSteps),
      featuresTitle,
      features: JSON.stringify(features),
    },
  });

  revalidatePath("/admin/services");
  revalidatePath(`/services/${slug}`);
  redirect("/admin/services");
}
