import Image from "next/image";
import Link from "next/link";
import { Headphones } from "lucide-react";
import { getSiteSettings } from "@/lib/site-data";

const SOCIAL_ICONS = [
  { key: "instagram", src: "/images/social-instagram.png" },
  { key: "threads", src: "/images/social-threads.png" },
  { key: "band", src: "/images/social-band.png" },
  { key: "kakao", src: "/images/social-kakao.png" },
] as const;

export async function Footer() {
  const settings = await getSiteSettings();
  const socialUrls: Record<string, string> = {
    instagram: settings.instagramUrl,
    threads: settings.threadsUrl,
    band: settings.bandUrl,
    kakao: settings.kakaoUrl,
  };

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-8 px-4 py-10 md:flex-nowrap md:px-6">
        <Image
          src="/images/logo-footer-badge.png"
          alt="청소청년"
          width={2128}
          height={3088}
          className="h-[192.5px] w-[132.5px] shrink-0 object-contain"
        />

        <div className="space-y-2 text-[16.8px] text-ink-soft">
          <p>
            <span className="font-semibold text-ink">대표</span> {settings.representative}
            <span className="mx-2">·</span>
            <span className="font-semibold text-ink">사업자등록번호</span> {settings.businessRegNo}
          </p>
          <p>{settings.address}</p>
          <p className="pt-2 text-[14.4px] text-ink-soft/80">
            &copy; {new Date().getFullYear()} 청소청년 All rights reserved.
          </p>
          <p className="pt-2 text-[14.4px] font-medium">
            EVERYONE LIKES THINGS TO BE CLEAN.{" "}
            <span className="text-secondary">BUT</span> NOT JUST ANYONE CAN MAKE IT CLEAN.
          </p>
        </div>

        <Link
          href="/admin/login"
          className="shrink-0 rounded-full border border-ink-soft/30 px-3 py-1 text-[14.4px] font-medium text-ink-soft hover:border-primary hover:text-primary"
        >
          관리자 페이지
        </Link>

        <div className="ml-auto flex shrink-0 flex-col items-center gap-4">
          <div className="flex gap-3">
            {SOCIAL_ICONS.map((s) => (
              <a
                key={s.key}
                href={socialUrls[s.key] || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <Image src={s.src} alt={s.key} width={666} height={668} className="h-10 w-10 object-contain" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="h-6 w-6 text-primary" />
            <div>
              <p className="text-[14.4px] font-medium text-ink-soft">CS Center (24시 연중무휴)</p>
              <p className="font-display text-[24px] font-bold text-primary">{settings.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
