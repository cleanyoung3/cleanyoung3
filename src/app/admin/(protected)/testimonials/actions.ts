"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSitePermission } from "@/lib/auth";

function readFields(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const tag = String(formData.get("tag") || "").trim();
  const reviewDate = String(formData.get("reviewDate") || "").trim();
  const rating = Math.min(5, Math.max(1, Number(formData.get("rating")) || 5));
  const text = String(formData.get("text") || "").trim();
  const photoUrl = String(formData.get("photoUrl") || "").trim() || null;
  return { name, tag, reviewDate, rating, text, photoUrl };
}

export async function createTestimonial(formData: FormData) {
  await requireSitePermission();
  const fields = readFields(formData);
  if (!fields.name || !fields.tag || !fields.text) return;

  const count = await prisma.testimonial.count();
  await prisma.testimonial.create({ data: { ...fields, order: count } });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireSitePermission();
  const fields = readFields(formData);
  if (!fields.name || !fields.tag || !fields.text) return;

  await prisma.testimonial.update({ where: { id }, data: fields });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireSitePermission();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
