import { QuoteWizard } from "@/components/quote/QuoteWizard";

export const metadata = {
  title: "견적문의 및 상담 | 청소청년",
  description: "에어컨 분해 청소, 소파・매트리스 케어, 입주・이사 청소 무료 견적문의. 청소청년 매니저가 빠르게 상담해 드립니다.",
};

export default function QuotePage() {
  return (
    <section className="flex min-h-[500px] flex-col justify-center bg-white">
      <QuoteWizard />
    </section>
  );
}
