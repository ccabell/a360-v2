import { PatientsTable } from "@/components/patients/patients-table";

export default function PatientsPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Patients</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Live patient records from Prompt Runner. Select a patient to run a prompt
          against one of their transcripts.
        </p>
      </div>

      <PatientsTable />
    </div>
  );
}
