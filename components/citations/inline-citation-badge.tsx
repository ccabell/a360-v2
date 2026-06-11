import { Citation } from "./types";

interface InlineCitationBadgeProps {
  number: number;
  citation: Citation;
  onClick?: () => void;
  className?: string;
}

export function InlineCitationBadge({
  number,
  citation,
  onClick,
  className = "",
}: InlineCitationBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-block mx-0.5 px-1.5 py-0.5 rounded text-xs font-semibold
                   bg-blue-100 text-blue-700 hover:bg-blue-200
                   dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800
                   transition-colors cursor-pointer
                   ${className}`}
      title={citation.title}
      type="button"
    >
      [{number}]
    </button>
  );
}
