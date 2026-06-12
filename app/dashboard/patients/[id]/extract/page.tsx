import { ExtractionSetup } from "@/components/extraction/extraction-setup";

export default async function ExtractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-5xl p-8">
      <ExtractionSetup patientId={id} />
    </div>
  );
}
