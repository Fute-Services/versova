"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

export default function BrochureFlipbook({ open, onClose }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState(null);
  const [bookSize, setBookSize] = useState({ width: 520, height: 720 });
  const bookRef = useRef(null);

  useEffect(() => {
    if (!open || pages.length > 0) return;

    let cancelled = false;

    async function renderPdf() {
      setLoading(true);
      setError(null);
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();

        const pdf = await pdfjsLib.getDocument({ url: "/assets/beach-queen-brochure.pdf" }).promise;
        
        // Calculate aspect ratio from page 1 to size flipbook pages accurately
        const firstPage = await pdf.getPage(1);
        const firstViewport = firstPage.getViewport({ scale: 1.0 });
        const aspect = firstViewport.width / firstViewport.height;
        
        const targetHeight = 720;
        const targetWidth = Math.round(targetHeight * aspect);
        if (!cancelled) {
          setBookSize({ width: targetWidth, height: targetHeight });
        }

        const images = [];
        setProgress({ done: 0, total: pdf.numPages });

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.6 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");
          await page.render({ canvasContext: ctx, viewport }).promise;
          images.push(canvas.toDataURL("image/jpeg", 0.85));
          if (!cancelled) setProgress({ done: i, total: pdf.numPages });
        }

        if (!cancelled) {
          setPages(images);
          setLoading(false);
        }
      } catch (err) {
        console.error("Brochure PDF render failed:", err);
        if (!cancelled) {
          setError(err?.message || "Failed to load brochure");
          setLoading(false);
        }
      }
    }

    renderPdf();
    return () => {
      cancelled = true;
    };
  }, [open, pages.length]);

  if (!open) return null;

  return (
    <div className="brochure-modal active">
      <button className="brochure-close-btn" onClick={onClose} aria-label="Close brochure">
        ×
      </button>

      {loading && (
        <div className="brochure-loading">
          <div className="brochure-spinner"></div>
          <div className="brochure-loading-text">Loading brochure</div>
          {progress.total > 0 && (
            <>
              <div className="brochure-progress-track">
                <div
                  className="brochure-progress-fill"
                  style={{ width: `${(progress.done / progress.total) * 100}%` }}
                ></div>
              </div>
              <div className="brochure-progress-count">
                {progress.done} / {progress.total}
              </div>
            </>
          )}
        </div>
      )}

      {error && <div className="brochure-loading">Error: {error}</div>}

      {!loading && pages.length > 0 && (
        <HTMLFlipBook
          ref={bookRef}
          width={bookSize.width}
          height={bookSize.height}
          size="stretch"
          minWidth={280}
          maxWidth={800}
          minHeight={400}
          maxHeight={1000}
          maxShadowOpacity={0.5}
          showCover={true}
          className="brochure-flipbook"
        >
          {pages.map((src, idx) => (
            <div className="brochure-page" key={idx}>
              <img src={src} alt={`Brochure page ${idx + 1}`} />
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </div>
  );
}
