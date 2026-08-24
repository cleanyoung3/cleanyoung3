"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireMainAdmin } from "@/lib/auth";

export type AccountFormState = { error?: string; success?: boolean };

export async function createSubAccount(
  _prev: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  await requireMainAdmin();

  const count = await prisma.adminUser.count();
  if (count >= 5) {
    return { error: "계정은 최대 5개까지만 생성할 수 있습니다." };
  }

  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const displayName = String(formData.get("displayName") || "").trim();
  const canManageSite = formData.get("canManageSite") === "on";
  const canManageWork = formData.get("canManageWork") === "on";

  if (!username || !password || !displayName) {
    return { error: "모든 항목을 입력해주세요." };
  }
  if (password.length < 6) {
    return { error: "비밀번호는 6자 이상이어야 합니다." };
  }

  const existing = await prisma.adminUser.findUnique({ where: { username } });
  if (existing) {
    return { error: "이미 사용중인 아이디입니다." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.create({
    data: { username, passwordHash, displayName, canManageSite, canManageWork },
  });

  revalidatePath("/admin/accounts");
  return { success: true };
}

export async function deleteSubAccount(id: string) {
  const session = await requireMainAdmin();
  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (!target || target.isMain || target.id === session.userId) return;
  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/accounts");
}

export async function togglePermission(id: string, field: "canManageSite" | "canManageWork") {
  await requireMainAdmin();
  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (!target || target.isMain) return;
  await prisma.adminUser.update({
    where: { id },
    data: { [field]: !target[field] },
  });
  revalidatePath("/admin/accounts");
}
