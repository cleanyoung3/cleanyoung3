export type ServiceContent = {
  slug: string;
  badge: string;
  headline: string;
  subCopy: string;
  bodyText: string;
  statKey: "aircon" | "sofa_mattress" | "movein";
  heroImage: string;
  worries: string[];
  processTitle: string;
  processSteps: { title: string; desc: string; image: string }[];
  featuresTitle: string;
  features: string[];
};

export const SERVICES: ServiceContent[] = [
  {
    slug: "aircon",
    badge: "01",
    headline: "에어컨 분해 청소",
    subCopy: "깊은 속까지 깨끗하게 청소합니다.",
    bodyText:
      "에어컨 속 열교환기와 송풍팬에는 유해 세균과 곰팡이가 쉽게 번식합니다. 꼼꼼한 완전 분해 세척으로 숨은 오염원을 뿌리뽑아 불쾌한 냄새를 없애고 냉방 효율을 극대화해보세요.",
    statKey: "aircon",
    heroImage: "/images/hero-aircon.png",
    worries: [
      "에어컨 내 곰팡이로 인해 알러지 및 호흡기 건강이 걱정이신 분",
      "에어컨 냄새가 전보다 심하다고 생각드신 분",
      "냉방 효율이 점점 떨어진다고 생각하시는 분",
    ],
    processTitle: "청소청년의 에어컨 청소 과정",
    processSteps: [
      {
        title: "작동 테스트 및 부품 완전 분해",
        desc: "정상 구동 여부를 철저히 점검한 후, 전면 패널, 필터, 송풍팬, 드레인판(물받이) 등 내부 핵심 부품을 안전하게 순차 분해합니다.",
        image: "/images/process-aircon-1.png",
      },
      {
        title: "친환경 약품 도포 및 고압 세척",
        desc: "인체에 무해한 가전 전용 세제를 분사하여 묵은 오염을 불려낸 뒤, 고압 세척 장비로 냉각핀(열교환기) 사이사이의 곰팡이를 완벽히 씻어냅니다.",
        image: "/images/process-aircon-2.png",
      },
      {
        title: "살균 소독 및 정밀 조립",
        desc: "살균 소독 마감과 정밀 조립을 통해 완벽한 위생 상태를 완성합니다.",
        image: "/images/process-aircon-3.png",
      },
    ],
    featuresTitle: "에어컨 청소 특장점",
    features: ["강력한 세척력", "에어컨 내 악취 원인 제거 및 공기질 개선", "에어컨 제품 수명 연장", "에어컨 냉방 효율 향상"],
  },
  {
    slug: "sofa-mattress",
    badge: "02",
    headline: "소파・매트리스 케어",
    subCopy: "청결과 편안함을 제공해 드리겠습니다.",
    bodyText:
      "소파와 매트리스 속에는 집진드기와 미세먼지, 각종 세균이 쉽게 번식합니다. 건식・습식 딥클리닝으로 눈에 보이지 않는 오염원을 제거, 불쾌한 냄새를 없애고, 쾌적하고 건강한 수면・휴식 환경을 되살려보세요.",
    statKey: "sofa_mattress",
    heroImage: "/images/hero-sofa-mattress.png",
    worries: [
      "소파나 매트리스 오염・집진드기로 인해 알레르기 및 피부 질환이 걱정이신 분",
      "얼룩이나 퀘퀘한 냄새가 자꾸 올라와 얼룩제거 및 악취 케어가 필요하신 분",
      "소파나 매트리스의 청결 상태와 제품 수명이 걱정되시는 분",
    ],
    processTitle: "청소청년의 소파・매트리스 케어 과정",
    processSteps: [
      {
        title: "스팟 얼룩 분해 및 습식 추출",
        desc: "생활 얼룩(오줌, 땀, 음료 등) 부위에 안전한 천연 효소 세제를 도포한 후, 맑은 물을 분사함과 동시에 오염수를 강력 흡입 추출합니다.",
        image: "/images/process-sofa-mattress.png",
      },
      {
        title: "고주파 건식 집진 및 진드기 포집",
        desc: "분당 수천 회 회전하는 분타식 전용 청소기로 매트리스 내벽 깊숙이 박힌 미세먼지, 비듬, 진드기 사체를 강력 흡입합니다.",
        image: "/images/process-sofa-mattress.png",
      },
      {
        title: "UV-C 자외선 살균",
        desc: "가구 표면에 유해 파장 자외선을 조사하여 잔존 세균을 2차 박멸하고 해충 방지 피톤치드 플루건 유무 무화 마감을 진행합니다.",
        image: "/images/process-sofa-mattress.png",
      },
    ],
    featuresTitle: "소파・매트리스 케어 특장점",
    features: ["집진드기 및 알러지 유발 방지", "묵은 얼룩 및 찌든 냄새 세척", "고온스팀 및 UV 살균 소독", "가구 수명연장 및 관리 효율성"],
  },
  {
    slug: "movein",
    badge: "03",
    headline: "입주・이사 청소",
    subCopy: "미세먼지, 묵은 때 깔끔히 지워드립니다.",
    bodyText:
      "공사 미세먼지부터 전 세입자의 흔적, 숨은 묵은때까지 깔끔하게 지워드립니다. 구석구석 세심한 디테일 청소로 유해 물질을 제거하여, 바로 안심하고 입주할 수 있는 쾌적한 공간을 완성해 보세요.",
    statKey: "movein",
    heroImage: "/images/hero-movein.png",
    worries: [
      "신축 입주 전, 분진가루와 공사 먼지, 새집증후군이 걱정이신 분",
      "이전 세입자의 흔적, 창틀・수납장 깊은 곳의 묵은때와 냄새를 없애고 싶으신 분",
      "바쁜 이사 일정 속에서 제대로 된 전문 청소업체를 찾고 계신 분",
    ],
    processTitle: "청소청년의 입주・이사 청소 과정",
    processSteps: [
      {
        title: "구역별 분해 & 탈거 청소",
        desc: "서랍장, 전등갓, 배수구, 환풍기, 후드 필터 등 분해 가능한 모든 요소를 탈거하여 내부 깊숙한 곳의 먼지까지 제거합니다.",
        image: "/images/process-movein-1.png",
      },
      {
        title: "친환경 약품 & 오염원 딥클리닝",
        desc: "공간별 특성에 맞는 맞춤형 친환경 세제를 사용하여 공사 분진, 묵은 기름때, 찌든 때를 안전하고 매끄럽게 세척합니다.",
        image: "/images/process-movein-2.png",
      },
      {
        title: "고온 스팀 살균 & 피톤치드 케어",
        desc: "손이 많이 닿는 곳과 배수구, 욕실 등에 고온 스팀 살균 및 피톤치드 소독을 진행하여 유해 세균과 잡내를 깔끔하게 제거합니다.",
        image: "/images/process-movein-3.png",
      },
    ],
    featuresTitle: "입주・이사 청소 특장점",
    features: ["보이지 않는 곳까지 딥 클리닝", "묵은 때, 지워지지 않은 얼룩 제거", "새집 증후군 및 공사 분진 깔끔 제거", "친환경 안심 세제 사용"],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
