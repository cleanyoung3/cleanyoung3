export type ServiceKey = "aircon" | "sofa" | "mattress" | "movein";

export const SERVICE_OPTIONS: { key: ServiceKey; label: string }[] = [
  { key: "aircon", label: "에어컨 분해 청소" },
  { key: "sofa", label: "소파 클린케어" },
  { key: "mattress", label: "매트리스 케어" },
  { key: "movein", label: "입주・이사 청소" },
];

export const SERVICE_DETAIL_CONFIG: Record<
  ServiceKey,
  {
    typeLabel: string;
    typeOptions: string[];
    countLabel?: string;
    countOptions?: string[];
  }
> = {
  aircon: {
    typeLabel: "사용하고 계시는 에어컨의 종류를 알려주세요",
    typeOptions: ["시스템 에어컨", "스탠드 에어컨(2in1 포함)", "벽걸이 에어컨", "멀티덕트 에어컨"],
    countLabel: "사용하고 계시는 에어컨의 댓수 알려주세요",
    countOptions: ["1대", "2대", "3대", "4대 이상"],
  },
  sofa: {
    typeLabel: "사용하고 계시는 소파의 종류를 알려주세요",
    typeOptions: ["패브릭 소파", "가죽소파", "기타"],
    countLabel: "사용하고 계시는 소파의 갯수 알려주세요",
    countOptions: ["1대", "2대", "3대", "4대 이상"],
  },
  mattress: {
    typeLabel: "사용하고 계시는 매트리스의 사이즈를 알려주세요",
    typeOptions: ["싱글(슈퍼싱글 포함)", "퀸", "킹", "패밀리 침대"],
    countLabel: "사용하고 계시는 매트리스의 갯수 알려주세요",
    countOptions: ["1개", "2개", "3개", "4개 이상"],
  },
  movein: {
    typeLabel: "사용하고 계시는 공간의 평수를 알려주세요",
    typeOptions: ["~15평", "16~24평", "25~34평", "35평 이상"],
  },
};

export const SERVICE_LABEL: Record<ServiceKey, string> = {
  aircon: "에어컨 분해 청소",
  sofa: "소파 클린케어",
  mattress: "매트리스 케어",
  movein: "입주・이사 청소",
};
