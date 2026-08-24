import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingSocial } from "@/components/site/FloatingSocial";
import { getSiteSettings } from "@/lib/site-data";

const SITE_DESCRIPTION =
  "에어컨 분해 청소, 소파・매트리스 케어, 입주・이사 청소까지. 청춘을 담아 청결하게, 정직을 담아 성실하게. 청소청년 직영팀이 처음부터 끝까지 책임지고 시공합니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://cleanyoung.com"),
  title: "청소청년 | 토탈 클린케어 서비스",
  description: SITE_DESCRIPTION,
  keywords: [
    "에어컨 청소",
    "에어컨 분해 청소",
    "소파 클린케어",
    "매트리스 케어",
    "입주 청소",
    "이사 청소",
    "청소업체",
    "청소청년",
  ],
  openGraph: {
    title: "청소청년 | 토탈 클린케어 서비스",
    description: SITE_DESCRIPTION,
    url: "https://cleanyoung.com",
    siteName: "청소청년",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/images/photo-cleaning-trio.png", width: 2752, height: 1536 }],
  },
  verification: {
    other: {
      "naver-site-verification": [
        "e296e185bad249dd2c63cf1dae71e31bb4d3ef4a",
        "451e310a1e6d917d23447fcd42e53a549c866114",
      ],
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <FloatingSocial
          phone={settings.phone}
          links={{
            instagramUrl: settings.instagramUrl,
            threadsUrl: settings.threadsUrl,
            bandUrl: settings.bandUrl,
            kakaoUrl: settings.kakaoUrl,
          }}
        />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
