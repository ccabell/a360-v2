"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePDFData } from "@/lib/usePDFData";
import { PDFSidebar } from "@/components/lpoa/PDFSidebar";
import { PatientModal, type PatientInfo } from "@/components/lpoa/PatientModal";
import { PatientHeader } from "@/components/lpoa/PatientHeader";
import type { PDFViewerHandle } from "@/components/lpoa/PDFViewer";

type NavItem = "index" | "search" | "settings" | "faqs";

const PDF_URL =
  process.env.NEXT_PUBLIC_PDF_URL || "/Joule+Operator+Manual+Rev+Y.pdf";

const PDFViewer = dynamic(
  () => import("@/components/lpoa/PDFViewer").then((m) => m.PDFViewer),
  { ssr: false },
);
const IndexPanel = dynamic(
  () => import("@/components/lpoa/IndexPanel").then((m) => m.IndexPanel),
  { ssr: false },
);
const SearchPanel = dynamic(
  () => import("@/components/lpoa/SearchPanel").then((m) => m.SearchPanel),
  { ssr: false },
);
const SettingsPanel = dynamic(
  () => import("@/components/lpoa/SettingsPanel").then((m) => m.SettingsPanel),
  { ssr: false },
);
const FAQsPanel = dynamic(
  () => import("@/components/lpoa/FAQsPanel").then((m) => m.FAQsPanel),
  { ssr: false },
);

export function LPOAViewer() {
  const [activeNav, setActiveNav] = useState<NavItem>("index");
  const [patient, setPatient] = useState<PatientInfo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const pdfRef = useRef<PDFViewerHandle>(null);

  const { numPages, outline, isLoaded } = usePDFData(PDF_URL);

  const jumpToPage = (page: number) => {
    pdfRef.current?.jumpToPage(page);
  };

  return (
    <div className="flex flex-col overflow-hidden h-full">
      <PatientHeader
        patient={patient}
        onAdd={() => setShowModal(true)}
        onEdit={() => setShowModal(true)}
        onClear={() => setPatient(null)}
      />

      <div className="flex flex-1 overflow-hidden min-w-0">
        <PDFSidebar active={activeNav} onChange={setActiveNav} />

        <div style={{ flex: "3 1 0%", minWidth: 0, overflow: "hidden" }}>
          <PDFViewer ref={pdfRef} totalPages={numPages} />
        </div>

        <div
          style={{
            flex: "1 1 0%",
            minWidth: 280,
            maxWidth: 400,
            overflow: "hidden",
          }}
          className="border-l border-border flex flex-col"
        >
          {activeNav === "index" && (
            <IndexPanel
              outline={outline}
              isLoaded={isLoaded}
              onJumpToPage={jumpToPage}
            />
          )}
          {activeNav === "search" && (
            <SearchPanel onJumpToPage={jumpToPage} patient={patient} />
          )}
          {activeNav === "settings" && (
            <SettingsPanel onJumpToPage={jumpToPage} />
          )}
          {activeNav === "faqs" && <FAQsPanel onJumpToPage={jumpToPage} />}
        </div>
      </div>

      {showModal && (
        <PatientModal
          initial={patient ?? undefined}
          onSave={(info) => {
            setPatient(info);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
