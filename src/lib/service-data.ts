import { prisma } from "./prisma";
import type { ServiceContent } from "./services";

function toServiceContent(row: {
  slug: string;
  badge: string;
  headline: string;
  subCopy: string;
  bodyText: string;
  statKey: string;
  heroImage: string;
  worries: string;
  processTitle: string;
  processSteps: string;
  featuresTitle: string;
  features: string;
}): ServiceContent {
  return {
    slug: row.slug,
    badge: row.badge,
    headline: row.headline,
    subCopy: row.subCopy,
    bodyText: row.bodyText,
    statKey: row.statKey as ServiceContent["statKey"],
    heroImage: row.heroImage,
    worries: JSON.parse(row.worries),
    processTitle: row.processTitle,
    processSteps: JSON.parse(row.processSteps),
    featuresTitle: row.featuresTitle,
    features: JSON.parse(row.features),
  };
}

export async function getServicePageBySlug(slug: string): Promise<ServiceContent | null> {
  const row = await prisma.servicePage.findUnique({ where: { slug } });
  if (!row) return null;
  return toServiceContent(row);
}

export async function getAllServicePages(): Promise<ServiceContent[]> {
  const rows = await prisma.servicePage.findMany({ orderBy: { order: "asc" } });
  return rows.map(toServiceContent);
}
