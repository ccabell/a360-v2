import { SavedOutputsList } from "@/components/history/saved-outputs-list";

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">History</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your saved research answers and outputs.
        </p>
      </div>
      <SavedOutputsList />
    </div>
  );
}
