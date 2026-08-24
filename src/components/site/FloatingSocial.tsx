import Image from "next/image";
import { Phone } from "lucide-react";

const ITEMS = [
  { key: "instagram", src: "/images/social-instagram.png", settingKey: "instagramUrl" as const },
  { key: "threads", src: "/images/social-threads.png", settingKey: "threadsUrl" as const },
  { key: "band", src: "/images/social-band.png", settingKey: "bandUrl" as const },
  { key: "kakao", src: "/images/social-kakao.png", settingKey: "kakaoUrl" as const },
];

export function FloatingSocial({
  links,
  phone,
}: {
  links: Record<"instagramUrl" | "threadsUrl" | "bandUrl" | "kakaoUrl", string>;
  phone: string;
}) {
  return (
    <div className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 sm:flex md:right-6">
      {ITEMS.map((item) => (
        <a
          key={item.key}
          href={links[item.settingKey] || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <Image src={item.src} alt={item.key} width={666} height={668} className="h-10 w-10 object-contain drop-shadow-lg" />
        </a>
      ))}
      <a
        href={`tel:${phone.replace(/-/g, "")}`}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-110"
      >
        <Phone className="h-5 w-5 text-white" fill="white" />
      </a>
    </div>
  );
}
