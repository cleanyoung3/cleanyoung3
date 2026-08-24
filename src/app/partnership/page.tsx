import Image from "next/image";
import { PartnershipForm } from "@/components/partnership/PartnershipForm";
import { getPageBanner } from "@/lib/site-data";
import { getYouTubeId } from "@/lib/youtube";

export const metadata = { title: "업무제휴 | 청소청년" };
export const dynamic = "force-dynamic";

export default async function PartnershipPage() {
  const banner = await getPageBanner("partnership");
  const hasMedia = !!banner?.mediaUrl && (banner.mediaType === "image" || banner.mediaType === "video");
  const youTubeId = banner?.mediaType === "video" && banner.mediaUrl ? getYouTubeId(banner.mediaUrl) : null;
  const [titleLine1, titleLine2] = banner?.title ?? ["다양한 비즈니스에 대한", "생각이 열려있습니다."];

  return (
    <>
      <section className="relative flex min-h-[500px] flex-col justify-center overflow-hidden bg-secondary">
        {hasMedia && banner!.mediaType === "image" && (
          <Image src={banner!.mediaUrl!} alt="" fill priority className="object-cover" sizes="100vw" />
        )}
        {hasMedia && banner!.mediaType === "video" && youTubeId && (
          <iframe
            src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&loop=1&playlist=${youTubeId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
            title=""
            allow="autoplay; encrypted-media"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          />
        )}
        {hasMedia && banner!.mediaType === "video" && !youTubeId && (
          <video
            src={banner!.mediaUrl!}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {hasMedia ? (
          <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/35 to-black/45" />
        ) : (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        )}
        <div className="relative mx-auto flex w-full max-w-6xl items-center px-4 py-14 md:px-6 md:py-20">
          <div className="max-w-md text-white">
            <p className="mb-3 text-[16.8px] font-semibold">{banner?.eyebrow ?? "업무제휴"}</p>
            <p className="font-display text-[21.6px]">{banner?.lead ?? "청소청년은"}</p>
            <h1 className="font-display text-[43.2px] font-bold leading-tight md:text-[51.8px]">
              {titleLine1}
              {titleLine2 && (
                <>
                  <br />
                  {titleLine2}
                </>
              )}
            </h1>
          </div>
          {!hasMedia && (
            <Image
              src="/images/mascot-driving.png"
              alt=""
              width={280}
              height={280}
              className="ml-auto hidden h-40 w-auto object-contain drop-shadow-xl sm:block md:h-56"
            />
          )}
        </div>
      </section>

      <section className="mx-auto flex min-h-[700px] max-w-2xl flex-col justify-center px-4 py-14 md:px-6 md:py-20">
        <h2 className="mb-8 font-display text-[24px] font-bold text-ink md:text-[28.8px]">
          정확한 정보를 위해 아래의 정보를 기입해주면 감사하겠습니다.
        </h2>
        <PartnershipForm />
      </section>
    </>
  );
}
