"use client";

import Image from "next/image";
import { useState } from "react";

type ProcessStep = { title: string; desc: string; image: string };

export function ServicePageForm({
  action,
  initial,
}: {
  action: (formData: FormData) => void;
  initial: {
    badge: string;
    headline: string;
    subCopy: string;
    bodyText: string;
    heroImage: string;
    worries: string[];
    processTitle: string;
    processSteps: ProcessStep[];
    featuresTitle: string;
    features: string[];
  };
}) {
  const [heroImage, setHeroImage] = useState(initial.heroImage);
  const [stepImages, setStepImages] = useState<string[]>([0, 1, 2].map((i) => initial.processSteps[i]?.image ?? ""));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "services");
    const res = await fetch("/api/uploads", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "업로드에 실패했습니다.");
    return data.url as string;
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      setHeroImage(await uploadFile(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  }

  async function handleStepFileChange(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file);
      setStepImages((prev) => prev.map((v, idx) => (idx === i ? url : v)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="heroImage" value={heroImage} />

      <div className="grid gap-4 sm:grid-cols-[100px_1fr]">
        <div>
          <p className="mb-1.5 text-xs font-semibold text-ink-soft">배지 번호</p>
          <input name="badge" defaultValue={initial.badge} className="input" />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold text-ink-soft">헤드라인</p>
          <input name="headline" required defaultValue={initial.headline} className="input" />
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-ink-soft">서브카피</p>
        <input name="subCopy" defaultValue={initial.subCopy} className="input" />
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-ink-soft">본문내용</p>
        <textarea name="bodyText" rows={3} defaultValue={initial.bodyText} className="input resize-none" />
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-ink-soft">히어로 이미지</p>
        {heroImage && (
          <Image src={heroImage} alt="" width={200} height={180} className="mb-2 h-32 w-auto rounded-lg border border-black/5 object-contain" />
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} className="input" />
        {uploading && <p className="mt-1 text-xs text-ink-soft">업로드 중...</p>}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-ink-soft">
          &ldquo;이런 고민을 하시는 고객님들께&rdquo; 항목 (한 줄에 하나씩)
        </p>
        <textarea
          name="worries"
          rows={3}
          defaultValue={initial.worries.join("\n")}
          className="input resize-none"
        />
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-ink-soft">서비스 과정 제목</p>
        <input name="processTitle" defaultValue={initial.processTitle} className="input" />
      </div>

      <div className="space-y-4 rounded-xl border border-black/5 bg-slate-50 p-4">
        <p className="text-xs font-semibold text-ink-soft">서비스 과정 3단계</p>
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2 rounded-lg border border-black/5 bg-white p-3">
            <input type="hidden" name={`processStep${i + 1}Image`} value={stepImages[i]} />
            <div className="grid gap-2 sm:grid-cols-[1fr_2fr]">
              <input
                name={`processStep${i + 1}Title`}
                placeholder={`${i + 1}단계 제목`}
                defaultValue={initial.processSteps[i]?.title ?? ""}
                className="input"
              />
              <input
                name={`processStep${i + 1}Desc`}
                placeholder={`${i + 1}단계 설명`}
                defaultValue={initial.processSteps[i]?.desc ?? ""}
                className="input"
              />
            </div>
            <div className="flex items-center gap-3">
              {stepImages[i] && (
                <Image
                  src={stepImages[i]}
                  alt=""
                  width={120}
                  height={90}
                  className="h-14 w-auto rounded-lg border border-black/5 object-contain"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleStepFileChange(i, e)}
                className="input"
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-ink-soft">특장점 제목</p>
        <input name="featuresTitle" defaultValue={initial.featuresTitle} className="input" />
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-ink-soft">특장점 목록 (한 줄에 하나씩)</p>
        <textarea
          name="features"
          rows={4}
          defaultValue={initial.features.join("\n")}
          className="input resize-none"
        />
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
