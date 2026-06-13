import { PatientsTable } from "@/components/patients/patients-table";

export default function PatientsPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Patients</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Patient records with consultation transcripts, verified extractions, and
          AI-generated intelligence. Select a patient to view their full profile.
        </p>
      </div>

      <PatientsTable />
    </div>
  );
}
