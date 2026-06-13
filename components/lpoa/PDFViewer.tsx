"use client";

import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useCallback,
} from "react";
import { FileText, ExternalLink, Loader2 } from "lucide-react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { pdfjs } from "react-pdf";

const PDF_URL =
  process.env.NEXT_PUBLIC_PDF_URL || "/Joule+Operator+Manual+Rev+Y.pdf";
const PDF_NAME = process.env.NEXT_PUBLIC_PDF_NAME || "LPOA Manual";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface PDFViewerHandle {
  jumpToPage: (page: number) => void;
}

interface PDFViewerProps {
  totalPages: number;
}

export const PDFViewer = forwardRef<PDFViewerHandle, PDFViewerProps>(
  ({ totalPages }, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageWidth, setPageWidth] = useState(0);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const measureWidth = useCallback(() => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth - 96;
        setPageWidth(Math.min(Math.max(w, 400), 720));
      }
    }, []);

    useImperativeHandle(ref, () => ({
      jumpToPage: (page: number) => {
        const clamped = Math.max(1, Math.min(page, totalPages || 9999));
        setCurrentPage(clamped);
        setIsPageLoading(true);
      },
    }));

    const goToPage = (page: number) => {
      const clamped = Math.max(1, Math.min(page, totalPages || 9999));
      if (clamped !== currentPage) {
        setCurrentPage(clamped);
        setIsPageLoading(true);
      }
    };

    const displayTotal = totalPages > 0 ? totalPages : "…";

    return (
      <div className="relative flex flex-col h-full">
        {/* Toolbar */}
        <div
          className="flex items-center justify-between px-4 border-b border-border shrink-0"
          style={{ background: "var(--card)", height: 40 }}
        >
          <div className="flex items-center gap-2">
            <FileText size={13} style={{ color: "var(--muted-foreground)" }} />
            <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
              {PDF_NAME}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="rounded border border-border transition-colors disabled:opacity-40"
                style={{
                  padding: "2px 8px",
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                ‹
              </button>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                  minWidth: 72,
                  textAlign: "center",
                }}
              >
                Page {currentPage} of {displayTotal}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={totalPages > 0 && currentPage >= totalPages}
                className="rounded border border-border transition-colors disabled:opacity-40"
                style={{
                  padding: "2px 8px",
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                ›
              </button>
            </div>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1"
              style={{ fontSize: 11, color: "var(--muted-foreground)" }}
            >
              <ExternalLink size={11} />
              Open PDF
            </a>
          </div>
        </div>

        {/* PDF Content */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto flex items-start justify-center py-8 px-6"
          style={{ background: "#525659", position: "relative" }}
          onLoad={measureWidth}
        >
          <Document
            file={PDF_URL}
            onLoadSuccess={measureWidth}
            loading={
              <div
                className="flex items-center justify-center"
                style={{ minHeight: 500, color: "#ccc" }}
              >
                <Loader2 size={24} className="animate-spin" />
              </div>
            }
            error={
              <div
                className="flex flex-col items-center justify-center gap-2 rounded-lg p-8"
                style={{
                  background: "#fff",
                  color: "#ef4444",
                  fontSize: 13,
                  minHeight: 200,
                }}
              >
                <span>Failed to load PDF.</span>
                <span style={{ fontSize: 11, color: "#6b7280" }}>
                  Make sure the file is in the <code>/public</code> folder and{" "}
                  <code>VITE_PDF_URL</code> is correct.
                </span>
              </div>
            }
          >
            {isPageLoading && (
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 10,
                }}
              >
                <Loader2
                  size={16}
                  className="animate-spin"
                  style={{ color: "#ccc" }}
                />
              </div>
            )}
            <Page
              pageNumber={currentPage}
              width={pageWidth || 620}
              onRenderSuccess={() => setIsPageLoading(false)}
              onLoadSuccess={() => {
                setIsPageLoading(false);
                measureWidth();
              }}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </div>
    );
  },
);

PDFViewer.displayName = "PDFViewer";
