"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { X, BookOpen } from "lucide-react";
import { usePDFData } from "@/lib/usePDFData";
import { PDFSidebar } from "@/components/lpoa/PDFSidebar";
import { PatientModal, type PatientInfo } from "@/components/lpoa/PatientModal";
import { PatientHeader } from "@/components/lpoa/PatientHeader";
import type { PDFViewerHandle } from "@/components/lpoa/PDFViewer";
import { activeDevice } from "@/lib/lpoa/devices/gentlemax-pro";

type NavItem = "index" | "search" | "settings" | "faqs";

const PDF_URL = activeDevice.manual.url;

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
  // The PDF is a right-side drawer for every module except "index" (where it's
  // the primary reading surface). Citations open it; the user can close it.
  const [pdfOpen, setPdfOpen] = useState(false);
  const pdfRef = useRef<PDFViewerHandle>(null);

  const { numPages, outline, isLoaded } = usePDFData(PDF_URL);

  const isManualMode = activeNav === "index";
  const pdfVisible = isManualMode || pdfOpen;

  const jumpToPage = (page: number) => {
    if (!isManualMode) setPdfOpen(true);
    // Let the drawer mount/expand before scrolling the page into view.
    requestAnimationFrame(() => pdfRef.current?.jumpToPage(page));
  };

  const changeNav = (item: NavItem) => {
    setActiveNav(item);
    setPdfOpen(false); // reset drawer when switching modules
  };

  // Region widths. In manual mode the TOC is a narrow rail and the PDF fills
  // the rest; in module modes the module is the wide stage and the PDF is a
  // fixed-width drawer (or collapsed to 0).
  const moduleWidth = isManualMode ? "320px" : "1 1 0%";
  const pdfFlex = isManualMode ? "1 1 0%" : "0 0 auto";
  const pdfWidth = isManualMode ? "auto" : pdfOpen ? 560 : 0;

  return (
    <div className="relative flex flex-col overflow-hidden h-full">
      <PatientHeader
        patient={patient}
        onAdd={() => setShowModal(true)}
        onEdit={() => setShowModal(true)}
        onClear={() => setPatient(null)}
      />

      <div className="flex flex-1 overflow-hidden min-w-0">
        <PDFSidebar active={activeNav} onChange={changeNav} />

        {/* Module stage */}
        <div
          style={{
            flex: isManualMode ? "0 0 320px" : moduleWidth,
            minWidth: 0,
            overflow: "hidden",
          }}
          className="flex flex-col"
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
            <SettingsPanel onJumpToPage={jumpToPage} patient={patient} />
          )}
          {activeNav === "faqs" && <FAQsPanel onJumpToPage={jumpToPage} />}
        </div>

        {/* PDF surface: primary in manual mode, drawer elsewhere. Always
            mounted so pdfjs state + jumpToPage survive mode switches. */}
        <div
          style={{
            flex: pdfFlex,
            width: pdfWidth,
            minWidth: 0,
            overflow: "hidden",
            transition: isManualMode ? undefined : "width 0.25s ease",
          }}
          className={isManualMode ? "border-l border-border" : ""}
        >
          <div className="relative h-full" style={{ width: isManualMode ? "auto" : 560 }}>
            {!isManualMode && pdfOpen && (
              <button
                onClick={() => setPdfOpen(false)}
                className="absolute z-10 flex items-center gap-1 rounded-md"
                style={{
                  top: 8,
                  right: 8,
                  padding: "4px 8px",
                  fontSize: 11,
                  fontWeight: 500,
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--muted-foreground)",
                }}
                title="Close manual"
              >
                <X size={13} /> Close manual
              </button>
            )}
            <div style={{ height: "100%", display: pdfVisible ? "block" : "none" }}>
              <PDFViewer ref={pdfRef} totalPages={numPages} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating "open manual" affordance for module modes when the drawer is closed */}
      {!isManualMode && !pdfOpen && (
        <button
          onClick={() => setPdfOpen(true)}
          className="absolute flex items-center gap-1.5 rounded-full shadow-md"
          style={{
            bottom: 20,
            right: 20,
            padding: "8px 14px",
            fontSize: 12,
            fontWeight: 600,
            background: "var(--primary)",
            color: "var(--primary-foreground, #fff)",
            border: "none",
          }}
          title="Open the operator manual"
        >
          <BookOpen size={14} /> Manual
        </button>
      )}

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
