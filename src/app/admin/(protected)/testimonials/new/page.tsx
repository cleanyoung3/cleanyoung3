import { requireSitePermission } from "@/lib/auth";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { createTestimonial } from "../actions";

export default async function NewTestimonialPage() {
  await requireSitePermission();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-xl font-bold text-ink">새 후기 추가</h1>
      <div className="mt-6">
        <TestimonialForm action={createTestimonial} />
      </div>
    </div>
  );
}
