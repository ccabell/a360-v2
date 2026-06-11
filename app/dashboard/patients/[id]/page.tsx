import { PatientWorkspace } from "@/components/patients/patient-workspace";

export default async function PatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-5xl p-8">
      <PatientWorkspace patientId={id} />
    </div>
  );
}
