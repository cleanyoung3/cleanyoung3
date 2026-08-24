import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SERVICES } from "../src/lib/services";

const prisma = new PrismaClient();

async function main() {
  const mainPasswordHash = await bcrypt.hash("cleanyoung", 10);
  await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      passwordHash: mainPasswordHash,
      displayName: "메인 관리자",
      isMain: true,
      canManageSite: true,
      canManageWork: true,
    },
  });

  const stats: { key: string; label: string; value: number }[] = [
    { key: "aircon", label: "에어컨 분해 청소 누적 시공수", value: 5562 },
    { key: "sofa_mattress", label: "소파·매트리스 케어 누적 시공수", value: 5562 },
    { key: "movein", label: "입주·이사 청소 누적 시공수", value: 5562 },
    { key: "consult", label: "상담 및 견적문의 누적 상담수", value: 3817 },
  ];
  for (const s of stats) {
    await prisma.siteStat.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  const slideCount = await prisma.heroSlide.count();
  if (slideCount === 0) {
    await prisma.heroSlide.createMany({
      data: [
        {
          order: 0,
          presetKey: "aircon",
          headline: "에어컨 분해 청소",
          subCopy: "깊은 속까지 깨끗하게 청소합니다.",
          bodyText:
            "에어컨 속 열교환기와 송풍팬에는 유해 세균과 곰팡이가 쉽게 번식합니다. 꼼꼼한 완전 분해 세척으로 숨은 오염원을 뿌리뽑아 불쾌한 냄새를 없애고 냉방 효율을 극대화해보세요.",
          statKey: "aircon",
        },
        {
          order: 1,
          presetKey: "sofa_mattress",
          headline: "소파·매트리스 케어",
          subCopy: "청결과 편안함을 제공해 드리겠습니다.",
          bodyText:
            "소파와 매트리스 속에는 집진드기와 미세먼지, 각종 세균이 쉽게 번식합니다. 건식·습식 딥클리닝으로 눈에 보이지 않는 오염원을 제거해보세요.",
          statKey: "sofa_mattress",
        },
        {
          order: 2,
          presetKey: "movein",
          headline: "입주·이사 청소",
          subCopy: "미세먼지, 묵은 때 깔끔히 지워드립니다.",
          bodyText:
            "공사 미세먼지부터 전 세입자의 흔적, 숨은 묵은때까지 깔끔하게 지워드립니다. 구석구석 세심한 디테일 청소로 바로 안심하고 입주할 수 있는 쾌적한 공간을 완성해 보세요.",
          statKey: "movein",
        },
        {
          order: 3,
          presetKey: null,
          headline: "청소청년과 함께하세요",
          subCopy: "청춘을 담아 청결하게, 정직을 담아 성실하게",
          bodyText: "청소청년 직영팀이 처음부터 끝까지 책임지고 시공합니다.",
          imageUrl: null,
          statKey: null,
        },
      ],
    });
  }

  const settings: Record<string, string> = {
    phone_number: "1811-2475",
    representative_name: "정선호",
    business_reg_no: "613-24-96405",
    address: "경기도 안양시 달안로 110 507동 1207호",
    social_instagram_url: "#",
    social_threads_url: "#",
    social_band_url: "#",
    social_kakao_url: "#",
  };
  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  const faqCount = await prisma.faqItem.count();
  if (faqCount === 0) {
    await prisma.faqItem.createMany({
      data: [
        {
          order: 0,
          question: "예약은 어떻게 하나요?",
          answer:
            "홈페이지 상단의 [견적문의 및 상담] 메뉴에서 몇 가지 질문에 답해주시면 담당 매니저가 확인 후 빠르게 연락드립니다.",
        },
        {
          order: 1,
          question: "방문 청소는 몇 시간 정도 걸리나요?",
          answer:
            "서비스 종류와 공간 크기에 따라 상이합니다. 정확한 소요 시간은 견적 상담 시 안내해 드립니다.",
        },
        {
          order: 2,
          question: "사용하는 세제는 안전한가요?",
          answer:
            "인체와 반려동물에 무해한 친환경 세제만을 사용하고 있습니다.",
        },
      ],
    });
  }

  const noticeCount = await prisma.notice.count();
  if (noticeCount === 0) {
    await prisma.notice.createMany({
      data: [
        {
          title: "2026년 청소청년 여름휴가 안내",
          content: "여름 휴가 안내드립니다. 자세한 일정은 고객센터로 문의해주세요.",
          isPinned: true,
          authorName: "운영자",
        },
        {
          title: "8월 스케줄 마감 안내",
          content: "8월 예약이 마감되었습니다. 9월 일정을 확인해주세요.",
          isPinned: true,
          authorName: "운영자",
        },
        {
          title: "견적 시 주의사항",
          content: "정확한 견적을 위해 현장 사진과 정보를 상세히 남겨주세요.",
          isPinned: true,
          authorName: "운영자",
        },
      ],
    });
  }

  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          order: 0,
          name: "김 * 현",
          tag: "에어컨 청소",
          reviewDate: "2026-07-02",
          rating: 5,
          text: "꼼꼼하신 실장님이 오셔서 생각보다 오래된 에어컨인데 정말 깨끗해 졌어요! 내년에도 또 부탁드릴게요.",
        },
        {
          order: 1,
          name: "김 * 현",
          tag: "입주·이사 청소",
          reviewDate: "2026-06-18",
          rating: 5,
          text: "이사 전 미세먼지가 걱정이었는데 구석구석 깨끗하게 청소해주셔서 안심하고 입주했어요. 감사합니다.",
        },
        {
          order: 2,
          name: "김 * 현",
          tag: "에어컨 청소",
          reviewDate: "2026-05-27",
          rating: 5,
          text: "정직한 견적과 확실한 사후관리, 다음에도 청소청년만 이용하려고요. 매니저님이 친절하셨습니다.",
        },
        {
          order: 3,
          name: "이 * 영",
          tag: "소파 클린케어",
          reviewDate: "2026-05-11",
          rating: 5,
          text: "오래된 얼룩까지 깔끔하게 지워주셔서 소파가 새것 같아요. 냄새도 전혀 남지 않았습니다.",
        },
        {
          order: 4,
          name: "박 * 수",
          tag: "매트리스 케어",
          reviewDate: "2026-04-29",
          rating: 5,
          text: "집먼지진드기가 걱정이었는데 UV 살균까지 꼼꼼히 해주셔서 마음이 놓였어요.",
        },
        {
          order: 5,
          name: "최 * 지",
          tag: "입주·이사 청소",
          reviewDate: "2026-04-15",
          rating: 5,
          text: "바쁜 이사 일정에도 시간 맞춰 방문해주시고 꼼꼼하게 마무리해주셨습니다.",
        },
      ],
    });
  }

  const banners: {
    pageKey: string;
    eyebrow: string;
    lead: string | null;
    titleLine1: string;
    titleLine2: string | null;
  }[] = [
    {
      pageKey: "services",
      eyebrow: "주요 서비스",
      lead: "청소청년의",
      titleLine1: "전문성과 정성으로",
      titleLine2: "완성하는 클린케어",
    },
    {
      pageKey: "notices",
      eyebrow: "공지사항",
      lead: "청소청년에 대한",
      titleLine1: "최신 소식과 공지사항을",
      titleLine2: "알려드립니다.",
    },
    {
      pageKey: "support",
      eyebrow: "고객센터",
      lead: "청소청년에 대한",
      titleLine1: "고객의 목소리에 귀 기울이고,",
      titleLine2: "더 완벽한 서비스를 만들어가겠습니다.",
    },
    {
      pageKey: "partnership",
      eyebrow: "업무제휴",
      lead: "청소청년은",
      titleLine1: "다양한 비즈니스에 대한",
      titleLine2: "생각이 열려있습니다.",
    },
    {
      pageKey: "story",
      eyebrow: "청년 스토리",
      lead: "청소에 청춘을 건",
      titleLine1: "청년들의 진심과 열정으로",
      titleLine2: "모인 인연, 청소청년",
    },
  ];
  for (const b of banners) {
    await prisma.pageBanner.upsert({
      where: { pageKey: b.pageKey },
      update: {},
      create: { ...b, mediaType: "none" },
    });
  }

  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    await prisma.servicePage.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        order: i,
        badge: s.badge,
        headline: s.headline,
        subCopy: s.subCopy,
        bodyText: s.bodyText,
        statKey: s.statKey,
        heroImage: s.heroImage,
        worries: JSON.stringify(s.worries),
        processTitle: s.processTitle,
        processSteps: JSON.stringify(s.processSteps),
        featuresTitle: s.featuresTitle,
        features: JSON.stringify(s.features),
      },
    });
  }

  console.log("Seed complete. Admin login: admin / cleanyoung");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
