"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  companyName: z.string().min(1, "소속회사명을 입력해주세요."),
  contactName: z.string().min(1, "성함을 입력해주세요."),
  phone: z.string().min(9, "연락처를 입력해주세요."),
  email: z.string().email("올바른 이메일을 입력해주세요."),
  serviceType: z.string().min(1),
  message: z.string().min(1, "상세 내용을 입력해주세요."),
  agree: z.string().optional(),
});

export type PartnershipFormState = {
  success: boolean;
  error?: string;
};

export async function submitPartnershipRequest(
  _prevState: PartnershipFormState,
  formData: FormData
): Promise<PartnershipFormState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요." };
  }
  if (parsed.data.agree !== "on") {
    return { success: false, error: "개인정보 활용에 동의해주세요." };
  }

  const { companyName, contactName, phone, email, serviceType, message } = parsed.data;
  await prisma.partnershipRequest.create({
    data: { companyName, contactName, phone, email, serviceType, message },
  });

  return { success: true };
}
