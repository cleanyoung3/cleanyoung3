"use client";

import { useState } from "react";
import { updateSettings } from "./actions";

export function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [saved, setSaved] = useState(false);

  const fields: { key: string; label: string }[] = [
    { key: "phone_number", label: "대표 전화번호" },
    { key: "representative_name", label: "대표자명" },
    { key: "business_reg_no", label: "사업자등록번호" },
    { key: "address", label: "주소" },
    { key: "social_instagram_url", label: "인스타그램 URL" },
    { key: "social_threads_url", label: "스레드 URL" },
    { key: "social_band_url", label: "밴드 URL" },
    { key: "social_kakao_url", label: "카카오톡 채널 URL" },
  ];

  return (
    <form
      action={async (fd) => {
        await updateSettings(fd);
        setSaved(true);
        setTimeout(() => setSaved(false), 1800);
      }}
      className="grid gap-4 rounded-xl border border-black/5 bg-white p-4 sm:grid-cols-2"
    >
      {fields.map((f) => (
        <div key={f.key}>
          <p className="mb-1 text-xs font-semibold text-ink-soft">{f.label}</p>
          <input name={f.key} defaultValue={settings[f.key] ?? ""} className="input" />
        </div>
      ))}
      <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white sm:col-span-2 sm:w-fit">
        저장
      </button>
      {saved && <span className="text-xs text-secondary-dark sm:col-span-2">저장되었습니다.</span>}
    </form>
  );
}
