"use server";

import { prisma } from "@/lib/prisma";
import type { ServiceKey } from "@/lib/quote-config";

export type QuoteSubmission = {
  services: ServiceKey[];
  region: string;
  regionDetail?: string;
  details: Record<string, { type?: string; count?: string }>;
  preferredDate: string;
  name: string;
  phone: string;
};

export async function submitQuoteRequest(data: QuoteSubmission) {
  if (!data.name || !data.phone || data.services.length === 0) {
    return { success: false, error: "필수 정보를 모두 입력해주세요." };
  }

  await prisma.quoteRequest.create({
    data: {
      services: JSON.stringify(data.services),
      region: data.region,
      regionDetail: data.regionDetail || null,
      detailAnswers: JSON.stringify(data.details),
      preferredDate: data.preferredDate,
      name: data.name,
      phone: data.phone,
    },
  });

  return { success: true };
}
