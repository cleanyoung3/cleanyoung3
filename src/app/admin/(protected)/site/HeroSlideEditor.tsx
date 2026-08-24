"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { updateHeroSlide, deleteHeroSlide } from "./actions";
import { uploadFile } from "@/lib/upload-client";

const PRESETS = [
  { value: "custom", label: "직접입력" },
  { value: "aircon", label: "에어컨 분해 청소" },
  { value: "sofa_mattress", label: "소파・매트리스 케어" },
  { value: "movein", label: "입주・이사 청소" },
];

export function HeroSlideEditor({
  index,
  id,
  presetKey,
  headline,
  subCopy,
  bodyText,
  imageUrl: imageUrlProp,
}: {
  index: number;
  id: string;
  presetKey: string | null;
  headline: string;
  subCopy: string;
  bodyText: string;
  imageUrl: string | null;
}) {
  const [open, setOpen] = useState(index === 0);
  const [saved, setSaved] = useState(false);
  const [imageUrl, setImageUrl] = useState(imageUrlProp ?? "");
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const boundUpdate = updateHeroSlide.bind(null, id);

  async function handleDelete() {
    if (!confirm("이 슬라이드를 삭제할까요?")) return;
    setDeleting(true);
    await deleteHeroSlide(id);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      setImageUrl(await uploadFile(file, "hero"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-xl border border-black/5 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-bold text-ink"
      >
        메인 페이지 상단 {index + 1}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <form
          action={async (fd) => {
            await boundUpdate(fd);
            setSaved(true);
            setTimeout(() => setSaved(false), 1800);
          }}
          className="space-y-3 border-t border-black/5 px-4 py-4"
        >
          <div>
            <p className="mb-1 text-xs font-semibold text-ink-soft">문구 및 이미지 프리셋</p>
            <select name="presetKey" defaultValue={presetKey ?? "custom"} className="input">
              {PRESETS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-ink-soft">헤드라인</p>
            <input name="headline" defaultValue={headline} className="input" />
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-ink-soft">서브카피</p>
            <input name="subCopy" defaultValue={subCopy} className="input" />
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-ink-soft">본문내용</p>
            <textarea name="bodyText" defaultValue={bodyText} rows={3} className="input resize-none" />
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-ink-soft">
              이미지 (URL 직접입력 또는 파일 업로드, 비워두면 기본 이미지)
            </p>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt=""
                width={160}
                height={100}
                className="mb-2 h-20 w-auto rounded-lg border border-black/5 object-contain"
              />
            )}
            <input
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/images/... 또는 https://..."
              className="input"
            />
            <input type="file" accept="image/*" onChange={handleFileChange} className="input mt-2" />
            {uploading && <p className="mt-1 text-xs text-ink-soft">업로드 중...</p>}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white">
              저장
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 disabled:opacity-60"
            >
              {deleting ? "삭제 중..." : "슬라이드 삭제"}
            </button>
            {saved && <span className="text-xs text-secondary-dark">저장되었습니다.</span>}
          </div>
        </form>
      )}
    </div>
  );
}
