import { QuoteWizard } from "@/components/quote/QuoteWizard";

export const metadata = { title: "견적문의 및 상담 | 청소청년" };

export default function QuotePage() {
  return (
    <section className="flex min-h-[500px] flex-col justify-center bg-white">
      <QuoteWizard />
    </section>
  );
}
