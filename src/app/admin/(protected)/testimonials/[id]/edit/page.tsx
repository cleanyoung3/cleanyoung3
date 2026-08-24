import { notFound } from "next/navigation";
import { requireSitePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { updateTestimonial } from "../../actions";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSitePermission();
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-xl font-bold text-ink">후기 수정</h1>
      <div className="mt-6">
        <TestimonialForm action={updateTestimonial.bind(null, id)} initial={testimonial} />
      </div>
    </div>
  );
}
