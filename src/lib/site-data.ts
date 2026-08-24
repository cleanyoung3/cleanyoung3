import { prisma } from "./prisma";

export async function getSiteSettings() {
  const rows = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return {
    phone: map.phone_number ?? "1811-2475",
    representative: map.representative_name ?? "정선호",
    businessRegNo: map.business_reg_no ?? "",
    address: map.address ?? "",
    instagramUrl: map.social_instagram_url ?? "#",
    threadsUrl: map.social_threads_url ?? "#",
    bandUrl: map.social_band_url ?? "#",
    kakaoUrl: map.social_kakao_url ?? "#",
  };
}

export async function getSiteStats() {
  const rows = await prisma.siteStat.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return {
    aircon: map.aircon ?? 0,
    sofaMattress: map.sofa_mattress ?? 0,
    movein: map.movein ?? 0,
    consult: map.consult ?? 0,
  };
}

export async function getHeroSlides() {
  return prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
}

export const BANNER_PAGE_KEYS = ["services", "notices", "support", "partnership", "story"] as const;
export type BannerPageKey = (typeof BANNER_PAGE_KEYS)[number];

export async function getPageBanner(pageKey: BannerPageKey) {
  const row = await prisma.pageBanner.findUnique({ where: { pageKey } });
  if (!row) return null;
  return {
    eyebrow: row.eyebrow,
    lead: row.lead,
    title: [row.titleLine1, row.titleLine2].filter((v): v is string => !!v),
    mediaType: row.mediaType,
    mediaUrl: row.mediaUrl,
  };
}
