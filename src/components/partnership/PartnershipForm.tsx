"use client";

import { useActionState } from "react";
import { SERVICE_LINKS } from "@/lib/nav";
import { submitPartnershipRequest, type PartnershipFormState } from "@/app/partnership/actions";

const initialState: PartnershipFormState = { success: false };

export function PartnershipForm() {
  const [state, formAction, pending] = useActionState(submitPartnershipRequest, initialState);

  if (state.success) {
    return (
      <div className="rounded-2xl border border-secondary/30 bg-secondary/5 px-6 py-16 text-center">
        <h3 className="font-display text-[24px] font-bold text-primary">문의가 접수되었습니다.</h3>
        <p className="mt-2 text-[16.8px] text-ink-soft">담당자가 확인 후 빠르게 연락드리겠습니다. 감사합니다.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="담당자님의 소속회사명을 알려주세요.">
          <input name="companyName" placeholder="회사명" required className="input" />
        </Field>
        <Field label="담당자님의 성함을 알려주세요">
          <input name="contactName" placeholder="이름" required className="input" />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="담당자님의 연락처를 알려주세요">
          <input name="phone" placeholder="휴대전화번호" required className="input" />
        </Field>
        <Field label="이메일">
          <input type="email" name="email" placeholder="이메일" required className="input" />
        </Field>
      </div>

      <Field label="서비스 종류를 선택해주세요">
        <select name="serviceType" defaultValue={SERVICE_LINKS[0].label} className="input">
          {SERVICE_LINKS.map((s) => (
            <option key={s.key} value={s.label}>
              {s.label}
            </option>
          ))}
          <option value="기타">기타</option>
        </select>
      </Field>

      <Field label="상세 내용">
        <textarea
          name="message"
          required
          rows={5}
          placeholder="서비스 또는 관련 제휴 내용을 상세하게 적어주세요."
          className="input resize-none"
        />
      </Field>

      <div className="space-y-1 text-[14.4px] text-ink-soft">
        <p>※ 문의하신 내용은 최대한 빠른시일 내 연락드리도록 하겠습니다.</p>
        <p>※ 상세 내용을 자세히 써주시면 빠르게 답변이 가능해요.</p>
      </div>

      <label className="flex items-center justify-end gap-2 text-[16.8px] text-ink">
        [개인 정보활용 동의] 개인정보 활용에 동의합니다
        <input type="checkbox" name="agree" className="h-4 w-4 accent-primary" />
      </label>

      {state.error && <p className="text-right text-[16.8px] text-red-500">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-primary py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {pending ? "전송 중..." : "문의하기"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[16.8px] font-semibold text-ink">{label}</p>
      {children}
    </div>
  );
}
