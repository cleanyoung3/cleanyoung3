"use client";

import { useState } from "react";
import { uploadFile } from "@/lib/upload-client";

export function BannerForm({
  action,
  label,
  initial,
}: {
  action: (formData: FormData) => void;
  label: string;
  initial: {
    eyebrow: string;
    lead: string | null;
    titleLine1: string;
    titleLine2: string | null;
    mediaType: string;
    mediaUrl: string | null;
  };
}) {
  const [mediaType, setMediaType] = useState(initial.mediaType || "none");
  const [mediaUrl, setMediaUrl] = useState(initial.mediaUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file, "banners");
      setMediaUrl(url);
      setMediaType(isVideo ? "video" : "image");
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <h2 className="mb-4 font-display text-base font-bold text-primary">{label}</h2>
      <form action={action} className="space-y-4">
        <input type="hidden" name="mediaType" value={mediaType} />
        <input type="hidden" name="mediaUrl" value={mediaUrl} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-xs font-semibold text-ink-soft">상단 라벨 (예: 청년 스토리)</p>
            <input name="eyebrow" required defaultValue={initial.eyebrow} className="input" />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-semibold text-ink-soft">리드 문구 (선택)</p>
            <input name="lead" defaultValue={initial.lead ?? ""} className="input" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-xs font-semibold text-ink-soft">헤드라인 첫째 줄</p>
            <input name="titleLine1" required defaultValue={initial.titleLine1} className="input" />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-semibold text-ink-soft">헤드라인 둘째 줄 (선택)</p>
            <input name="titleLine2" defaultValue={initial.titleLine2 ?? ""} className="input" />
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold text-ink-soft">배경 종류</p>
          <div className="flex gap-3 text-sm">
            {[
              { value: "none", label: "기본(그라데이션)" },
              { value: "image", label: "이미지" },
              { value: "video", label: "동영상" },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-1.5">
                <input
                  type="radio"
                  name="mediaTypeRadio"
                  checked={mediaType === opt.value}
                  onChange={() => setMediaType(opt.value)}
                  className="h-4 w-4 accent-primary"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {mediaType !== "none" && (
          <div>
            <p className="mb-1.5 text-xs font-semibold text-ink-soft">
              배경 {mediaType === "video" ? "동영상" : "이미지"} 업로드
            </p>
            {mediaUrl && (
              <p className="mb-2 truncate text-xs text-secondary-dark">현재 파일: {mediaUrl}</p>
            )}
            <input
              type="file"
              accept={mediaType === "video" ? "video/*" : "image/*"}
              onChange={handleFileChange}
              className="input"
            />
            {uploading && <p className="mt-1 text-xs text-ink-soft">업로드 중...</p>}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          저장
        </button>
      </form>
    </div>
  );
}
