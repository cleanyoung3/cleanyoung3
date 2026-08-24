"use client";

import Image from "next/image";
import { useState } from "react";
import { uploadFile } from "@/lib/upload-client";

export function TestimonialForm({
  action,
  initial,
}: {
  action: (formData: FormData) => void;
  initial?: {
    name: string;
    tag: string;
    reviewDate: string;
    rating: number;
    text: string;
    photoUrl: string | null;
  };
}) {
  const [photoUrl, setPhotoUrl] = useState(initial?.photoUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      setPhotoUrl(await uploadFile(file, "testimonials"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="photoUrl" value={photoUrl} />

      <div>
        <p className="mb-1.5 text-sm font-semibold text-ink">사진</p>
        {photoUrl && (
          <Image
            src={photoUrl}
            alt=""
            width={160}
            height={160}
            className="mb-2 h-32 w-32 rounded-lg object-cover"
          />
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} className="input" />
        {uploading && <p className="mt-1 text-xs text-ink-soft">업로드 중...</p>}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-sm font-semibold text-ink">고객명</p>
          <input name="name" required defaultValue={initial?.name} placeholder="김 * 현" className="input" />
        </div>
        <div>
          <p className="mb-1.5 text-sm font-semibold text-ink">서비스 태그</p>
          <input name="tag" required defaultValue={initial?.tag} placeholder="에어컨 청소" className="input" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-sm font-semibold text-ink">날짜</p>
          <input type="date" name="reviewDate" required defaultValue={initial?.reviewDate} className="input" />
        </div>
        <div>
          <p className="mb-1.5 text-sm font-semibold text-ink">별점</p>
          <select name="rating" defaultValue={initial?.rating ?? 5} className="input">
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n}점
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-sm font-semibold text-ink">후기 내용</p>
        <textarea name="text" required rows={4} defaultValue={initial?.text} className="input resize-none" />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        저장
      </button>
    </form>
  );
}
