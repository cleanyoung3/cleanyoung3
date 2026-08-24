import { redirect } from "next/navigation";
import { getSession } from "./session";

export async function requireAdminSession() {
  const session = await getSession();
  if (!session.userId) {
    redirect("/admin/login");
  }
  return session;
}

export async function requireSitePermission() {
  const session = await requireAdminSession();
  if (!session.isMain && !session.canManageSite) {
    redirect("/admin");
  }
  return session;
}

export async function requireMainAdmin() {
  const session = await requireAdminSession();
  if (!session.isMain) {
    redirect("/admin");
  }
  return session;
}
