import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "관리자 로그인 | 청소청년" };

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session.userId) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center">
          <Image src="/images/logo-face.png" alt="청소청년" width={44} height={44} className="h-11 w-11" />
          <h1 className="mt-3 font-display text-lg font-bold text-primary">관리자 페이지</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
