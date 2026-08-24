import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingSocial } from "@/components/site/FloatingSocial";
import { getSiteSettings } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "청소청년 | 토탈 클린케어 서비스",
  description:
    "에어컨 분해 청소, 소파・매트리스 케어, 입주・이사 청소까지. 청춘을 담아 청결하게, 정직을 담아 성실하게. 청소청년 직영팀이 처음부터 끝까지 책임지고 시공합니다.",
  verification: {
    other: {
      "naver-site-verification": "e296e185bad249dd2c63cf1dae71e31bb4d3ef4a",
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
