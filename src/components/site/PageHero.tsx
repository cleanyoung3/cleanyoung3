import Image from "next/image";
import { getYouTubeId } from "@/lib/youtube";

export function PageHero({
  eyebrow,
  lead,
  title,
  mediaType,
  mediaUrl,
}: {
  eyebrow: string;
  lead?: string;
  title: string[];
  mediaType?: string | null;
  mediaUrl?: string | null;
}) {
  const hasMedia = !!mediaUrl && (mediaType === "image" || mediaType === "video");
  const youTubeId = mediaType === "video" && mediaUrl ? getYouTubeId(mediaUrl) : null;

  return (
    <section className="relative isolate flex min-h-[500px] flex-col justify-center overflow-hidden bg-gradient-to-br from-[#5b6f8c] via-[#7688a3] to-[#a9b7c9]">
      {hasMedia && mediaType === "image" && (
        <Image src={mediaUrl!} alt="" fill priority className="object-cover" sizes="100vw" />
      )}
      {hasMedia && mediaType === "video" && youTubeId && (
        <iframe
          src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&loop=1&playlist=${youTubeId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
          title=""
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
        />
      )}
      {hasMedia && mediaType === "video" && !youTubeId && (
        <video
          src={mediaUrl!}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {hasMedia && <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/35 to-black/45" />}

      <div className="relative mx-auto flex w-full max-w-7xl items-center px-4 py-14 md:px-6 md:py-20">
        <div className="max-w-xl">
          <p className="mb-3 text-[16.8px] font-semibold text-white/85">{eyebrow}</p>
          {lead && <p className="mb-1 font-display text-[21.6px] text-white/90">{lead}</p>}
          <h1 className="font-display text-[43.2px] font-bold leading-tight text-white md:text-[51.8px]">
            {title.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
        {!hasMedia && (
          <div className="pointer-events-none absolute bottom-0 right-4 hidden h-full items-end sm:flex md:right-16">
            <Image
              src="/images/mascot-thumbsup.png"
              alt=""
              width={280}
              height={280}
              className="h-[85%] w-auto object-contain object-bottom drop-shadow-xl"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
