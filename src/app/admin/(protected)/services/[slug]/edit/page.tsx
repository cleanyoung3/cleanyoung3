import { notFound } from "next/navigation";
import { requireSitePermission } from "@/lib/auth";
import { getServicePageBySlug } from "@/lib/service-data";
import { ServicePageForm } from "@/components/admin/ServicePageForm";
import { updateServicePage } from "../../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireSitePermission();
  const { slug } = await params;
  const service = await getServicePageBySlug(slug);
  if (!service) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-xl font-bold text-ink">{service.headline} 수정</h1>
      <div className="mt-6">
        <ServicePageForm action={updateServicePage.bind(null, slug)} initial={service} />
      </div>
    </div>
  );
}
