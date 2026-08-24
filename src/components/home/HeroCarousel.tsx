"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Counter } from "@/components/site/Counter";

type Slide = {
  id: string;
  headline: string;
  subCopy: string;
  bodyText: string;
  presetKey: string | null;
  imageUrl: string | null;
  statKey: string | null;
};

const PRESET_IMAGE: Record<string, string> = {
  aircon: "/images/hero-aircon.png",
  sofa_mattress: "/images/hero-sofa-mattress.png",
  movein: "/images/hero-movein.png",
};

const PRESET_HREF: Record<string, string> = {
  aircon: "/services/aircon",
  sofa_mattress: "/services/sofa-mattress",
  movein: "/services/movein",
};

const SERVICE_ICONS = [
  { key: "aircon", label: "에어컨 분해 청소", href: "/services/aircon", icon: "/images/icon-aircon.png" },
  { key: "sofa-mattress", label: "소파 클린케어", href: "/services/sofa-mattress", icon: "/images/icon-sofa.png" },
  { key: "mattress", label: "매트리스 케어", href: "/services/sofa-mattress", icon: "/images/icon-mattress.png" },
  { key: "movein", label: "입주·이사 청소", href: "/services/movein", icon: "/images/icon-movein.png" },
];

export function HeroCarousel({
  slides,
  stats,
  phone,
}: {
  slides: Slide[];
  stats: Record<string, number>;
  phone: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActive((v) => (v + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const slide = slides[active];
  const image = slide.imageUrl || (slide.presetKey ? PRESET_IMAGE[slide.presetKey] : null) || "/images/mascot-thumbsup.png";
  const href = slide.presetKey ? PRESET_HREF[slide.presetKey] : "/story";
  const statValue = slide.statKey ? stats[slide.statKey] : undefined;

  return (
    <section className="flex min-h-[1000px] flex-col justify-center bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-10 md:px-6 md:pt-14">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Link href={href} className="group inline-block">
              <h1 className="font-display text-[43.2px] font-bold text-primary transition-colors group-hover:text-primary-dark md:text-[51.8px]">
                {slide.headline}
              </h1>
              <p className="mt-2 font-display text-[21.6px] font-semibold text-ink md:text-[24px]">
                {slide.subCopy}
              </p>
            </Link>
            <p className="mt-4 max-w-md text-[16.8px] leading-relaxed text-ink-soft md:text-[18px]">
              {slide.bodyText}
            </p>

            {statValue !== undefined && (
              <div className="mt-8 flex w-fit items-center gap-6 rounded-2xl bg-primary px-8 py-6 text-white shadow-md">
                <div className="text-[16.8px] leading-tight">
                  <p className="font-medium">누적 시공수</p>
                  <p className="text-[13px] text-white/70">* 2026년 8월 기준</p>
                </div>
                <Counter value={statValue} suffix="회" className="font-display text-[40px] font-bold" />
              </div>
            )}

            <div className="mt-6 flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={`${i + 1}번째 슬라이드`}
                  onClick={() => setActive(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-primary" : "w-2.5 bg-primary/25"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative order-first flex h-80 items-center justify-center md:order-none md:h-[34rem]">
            <Image
              key={slide.id}
              src={image}
              alt={slide.headline}
              width={520}
              height={420}
              className="h-full w-auto object-contain animate-in fade-in"
              priority
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 sm:flex-row">
          <div className="flex flex-1 items-center gap-6 rounded-2xl border border-secondary/40 px-8 py-8">
            <div className="text-[19.2px] font-bold leading-tight text-secondary-dark">
              <p>주요 서비스</p>
              <p>바로가기</p>
              <span className="mt-1 inline-block text-secondary">➜</span>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3 text-center sm:grid-cols-4">
              {SERVICE_ICONS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="flex flex-col items-center gap-2.5 rounded-lg p-2.5 text-[14.4px] font-medium text-ink-soft hover:bg-secondary/5 hover:text-primary sm:text-[16.8px]"
                >
                  <span className="flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
                    <Image src={s.icon} alt="" width={584} height={584} className="h-full w-full object-contain" />
                  </span>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <a
            href={`tel:${phone.replace(/-/g, "")}`}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-secondary px-8 py-8 text-center text-white shadow-md transition-colors hover:bg-secondary-dark sm:w-80"
          >
            <span className="text-[16.8px] font-medium text-white/90">토탈 클린케어 서비스 대표전화</span>
            <span className="font-display text-[36px] font-bold">{phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
