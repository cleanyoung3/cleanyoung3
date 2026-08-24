import Image from "next/image";
import Link from "next/link";
import { Counter } from "@/components/site/Counter";

export function StatsBanner({
  stats,
}: {
  stats: { label: string; value: number; suffix: string }[];
}) {
  return (
    <section className="relative isolate flex min-h-[1000px] flex-col justify-center overflow-hidden">
      <Image
        src="/images/photo-cleaning-trio.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/90 to-primary" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-24 text-center text-white md:px-6 md:py-36">
        <p className="font-display text-[21.6px] font-semibold md:text-[28px]">토탈 클린케어 서비스 업체</p>
        <h2 className="mt-2 font-display text-[54px] font-bold md:text-[88px]">청소청년</h2>
        <p className="mx-auto mt-8 max-w-xl text-[18px] leading-relaxed text-white/90 md:text-[22px]">
          청춘을 담아 청결하게, 정직을 담아 성실하게
          <br />
          청소청년은 직영팀이 처음부터 끝까지 책임지고 시공합니다.
        </p>
        <Link
          href="/story"
          className="mt-10 inline-block rounded-full border border-white/70 px-9 py-4 text-[18px] font-semibold text-white transition-colors hover:bg-white hover:text-primary"
        >
          청년 스토리 바로가기
        </Link>

        <div className="mt-20 grid grid-cols-2 gap-y-14 md:grid-cols-4 md:gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <Counter value={s.value} suffix={s.suffix} className="font-display text-[44px] font-bold md:text-[52px]" />
              <p className="mt-2 text-[15px] text-white/80 md:text-[18px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
