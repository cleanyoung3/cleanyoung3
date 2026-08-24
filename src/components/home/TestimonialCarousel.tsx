"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";

export type TestimonialItem = {
  id: string;
  name: string;
  tag: string;
  reviewDate: string;
  rating: number;
  text: string;
  photoUrl: string | null;
};

const PAGE_SIZE = 3;

export function TestimonialCarousel({ items: allItems }: { items: TestimonialItem[] }) {
  const pageCount = Math.max(1, Math.ceil(allItems.length / PAGE_SIZE));
  const [page, setPage] = useState(0);

  const items = allItems.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  if (allItems.length === 0) return null;

  return (
    <div className="relative mx-auto max-w-6xl px-4 md:px-6">
      {pageCount > 1 && (
        <>
          <button
            type="button"
            aria-label="이전 후기"
            onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
            className="absolute -left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="다음 후기"
            onClick={() => setPage((p) => (p + 1) % pageCount)}
            className="absolute -right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {items.map((t) => (
          <div
            key={t.id}
            className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
          >
            {t.photoUrl ? (
              <Image
                src={t.photoUrl}
                alt=""
                width={400}
                height={260}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="flex h-48 w-full items-center justify-center bg-slate-100">
                <User className="h-12 w-12 text-slate-300" />
              </div>
            )}
            <div className="p-7">
              <div className="mb-2.5 flex items-center justify-between">
                <div className="flex text-secondary">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-5 w-5"
                      fill={s < t.rating ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[13px] font-bold text-ink">
                  {t.tag}
                </span>
              </div>
              <p className="mb-2.5 text-[19.2px] font-bold text-ink">
                {t.name}{" "}
                <span className="text-[14px] font-normal text-ink-soft">{t.reviewDate}</span>
              </p>
              <p className="line-clamp-3 text-[16.8px] leading-relaxed text-ink-soft">{t.text}</p>
            </div>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-9 flex justify-center gap-1.5">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              aria-label={`${i + 1}페이지`}
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === page ? "w-5 bg-primary" : "w-1.5 bg-primary/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
