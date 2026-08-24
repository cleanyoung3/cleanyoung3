export const SERVICE_LINKS = [
  { label: "에어컨 분해 청소", href: "/services/aircon", key: "aircon" },
  { label: "소파・매트리스 케어", href: "/services/sofa-mattress", key: "sofa-mattress" },
  { label: "입주・이사 청소", href: "/services/movein", key: "movein" },
] as const;

export const NAV_LINKS = [
  { label: "청년 스토리", href: "/story" },
  { label: "주요 서비스", href: "/services/aircon", children: SERVICE_LINKS },
  { label: "공지사항", href: "/notices" },
  { label: "고객센터", href: "/support" },
  { label: "업무제휴", href: "/partnership" },
] as const;

export const QUOTE_CTA = { label: "견적문의 및 상담", href: "/quote" };
