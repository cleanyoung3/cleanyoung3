"use client";

import { useActionState } from "react";
import { createSubAccount, type AccountFormState } from "./actions";

const initialState: AccountFormState = {};

export function NewAccountForm() {
  const [state, formAction, pending] = useActionState(createSubAccount, initialState);

  return (
    <form action={formAction} className="grid gap-3 sm:grid-cols-2">
      <input name="displayName" placeholder="이름" required className="input" />
      <input name="username" placeholder="아이디" required className="input" />
      <input name="password" type="password" placeholder="비밀번호 (6자 이상)" required className="input" />
      <div className="flex items-center gap-4 text-sm text-ink-soft">
        <label className="flex items-center gap-1.5">
          <input type="checkbox" name="canManageSite" className="h-4 w-4 accent-primary" /> 홈페이지관리
        </label>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" name="canManageWork" className="h-4 w-4 accent-primary" /> 업무관리
        </label>
      </div>
      {state.error && <p className="text-sm text-red-500 sm:col-span-2">{state.error}</p>}
      {state.success && <p className="text-sm text-secondary-dark sm:col-span-2">계정이 생성되었습니다.</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60 sm:col-span-2"
      >
        {pending ? "생성 중..." : "계정 추가"}
      </button>
    </form>
  );
}
