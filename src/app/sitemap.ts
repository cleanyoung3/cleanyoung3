import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SERVICES } from "@/lib/services";

const BASE_URL = "https://cleanyoung.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notices = await prisma.notice.findMany({ select: { id: true, updatedAt: true } });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/story`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/notices`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/support`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/partnership`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/quote`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const noticeRoutes: MetadataRoute.Sitemap = notices.map((n) => ({
    url: `${BASE_URL}/notices/${n.id}`,
    lastModified: n.updatedAt,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...serviceRoutes, ...noticeRoutes];
}
