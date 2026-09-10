"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import BrochureFlipbook from "./components/BrochureFlipbook";

export default function Home() {
  const [brochureOpen, setBrochureOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setBrochureOpen(true);
    window.addEventListener("open-brochure", openHandler);
    return () => window.removeEventListener("open-brochure", openHandler);
  }, []);

  return (
    <>
      <div className="stage" id="stage">
        <div className="bg-layer" id="bgLayer"></div>

        <div className="intro-logo-container" id="introLogoContainer">
          <img src="/assets/logo.avif" alt="Logo" className="intro-logo-img" />
        </div>

        <header className="brand-header" id="brandHeader">
          <div className="brand-text-block">
            <h1 className="brand-title">BEACH QUEEN</h1>
            <span className="brand-subtitle">VERSOVA</span>
          </div>
        </header>

        <div className="visual-viewport" id="visualViewport">
          <div className="radiating-aura" id="radiatingAura">
            <svg id="auraSvg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"></svg>
          </div>

          <div className="image-mask" id="imageMask">
            <img
              src="/assets/ocean_terrace_hero.png"
              alt="Ocean Terrace Residences"
              className="hero-image"
              id="heroImg"
            />
            <div className="image-scrim"></div>
          </div>
        </div>

        <div className="hero-content" id="heroContent">
          <h2 className="hero-headline">
            <span className="line line-1">A WORLD OF VISIONARY DESIGN,</span>
            <span className="line line-2">WHERE EVERY HOME HAS</span>
            <span className="line line-3">CINEMATIC OCEAN VISTAS</span>
          </h2>
        </div>

        <div className="main-explore-view" id="mainExploreView">
          <div className="explore-top-tagline" id="exploreTagline">
            <span>Beach Queen · Versova</span>
          </div>

          <div className="explore-center-content" id="exploreCenterContent">
            <h1 className="explore-headline">
              A private horizon,
              <br />
              entirely your own.
            </h1>
            <p className="explore-subheadline">
              Sea-facing four-bedroom residences with only two homes on each floor.
            </p>
          </div>

          <div className="location-backdrop" id="locationBackdrop"></div>
          <div className="location-view" id="locationView">
            <div className="location-panel" id="locationPanel">
              <img
                id="locationPanelImage"
                className="location-panel-img"
                src="/assets/location-map.png"
                alt="Nearby hospitals map"
              />
              <div className="location-pins" data-pins-for="hospitals" id="locationPinsHospitals">
                <div className="location-pin" style={{ left: "40.6%", top: "16.47%" }}>
                  <div className="location-pin-head"></div>
                  <div className="location-pin-stem" style={{ height: "24px" }}></div>
                </div>
                <div className="location-pin" style={{ left: "89.9%", top: "13.2%" }}>
                  <div className="location-pin-head"></div>
                  <div className="location-pin-stem" style={{ height: "24px" }}></div>
                </div>
              </div>

              <div className="location-pins" data-pins-for="education" id="locationPinsEducation" hidden>
                {[
                  ["50.69%", "22.05%"],
                  ["54.37%", "35.02%"],
                  ["48.58%", "42.15%"],
                  ["47.11%", "36.96%"],
                  ["59.76%", "42.15%"],
                  ["39.99%", "51.23%"],
                  ["47.60%", "56.42%"],
                  ["59.76%", "55.77%"],
                  ["59.76%", "70.04%"],
                  ["47.35%", "68.09%"],
                  ["44.16%", "88.85%"],
                ].map(([left, top], i) => (
                  <div className="location-pin" style={{ left, top }} key={i}>
                    <div className="location-pin-head"></div>
                    <div className="location-pin-stem" style={{ height: "24px" }}></div>
                  </div>
                ))}
              </div>

              <div className="location-pins" data-pins-for="connectivity" id="locationPinsConnectivity" hidden>
                {[
                  ["33.37%", "24.64%"],
                  ["66.49%", "38.26%"],
                  ["75.47%", "49.68%"],
                  ["64.03%", "81.06%"],
                  ["87.10%", "86.25%"],
                ].map(([left, top], i) => (
                  <div className="location-pin" style={{ left, top }} key={i}>
                    <div className="location-pin-head"></div>
                    <div className="location-pin-stem" style={{ height: "24px" }}></div>
                  </div>
                ))}
              </div>

              <div className="location-pins" data-pins-for="hotels" id="locationPinsHotels" hidden>
                {[
                  ["38.52%", "60.31%"],
                  ["90.04%", "36.32%"],
                  ["90.04%", "47.99%"],
                  ["76.45%", "77.17%"],
                ].map(([left, top], i) => (
                  <div className="location-pin" style={{ left, top }} key={i}>
                    <div className="location-pin-head"></div>
                    <div className="location-pin-stem" style={{ height: "24px" }}></div>
                  </div>
                ))}
              </div>

              <div className="location-pins" data-pins-for="entertainment" id="locationPinsEntertainment" hidden>
                {[
                  ["46.61%", "3.24%"],
                  ["42.93%", "9.08%"],
                  ["50.44%", "9.08%"],
                  ["44.16%", "60.31%"],
                ].map(([left, top], i) => (
                  <div className="location-pin" style={{ left, top }} key={i}>
                    <div className="location-pin-head"></div>
                    <div className="location-pin-stem" style={{ height: "24px" }}></div>
                  </div>
                ))}
              </div>

              <div className="location-pins" data-pins-for="beaches" id="locationPinsBeaches" hidden>
                {[
                  ["30.67%", "28.53%"],
                  ["39.99%", "66.80%"],
                ].map(([left, top], i) => (
                  <div className="location-pin" style={{ left, top }} key={i}>
                    <div className="location-pin-head"></div>
                    <div className="location-pin-stem" style={{ height: "24px" }}></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="location-nav-row">
            <div className="location-filter-row" id="locationFilterRow">
              <button className="location-filter-btn active" data-filter="hospitals">
                <span className="filter-icon-disc">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </span>
                Hospitals
              </button>
              <button className="location-filter-btn" data-filter="education">
                <span className="filter-icon-disc">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10L12 5 2 10l10 5 10-5z"></path>
                    <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"></path>
                  </svg>
                </span>
                Education
              </button>
              <button className="location-filter-btn" data-filter="connectivity">
                <span className="filter-icon-disc">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5a11 11 0 0 1 14 0"></path>
                    <path d="M8.5 16a6 6 0 0 1 7 0"></path>
                    <line x1="12" y1="19.5" x2="12" y2="19.51"></line>
                  </svg>
                </span>
                Connectivity
              </button>
              <button className="location-filter-btn" data-filter="hotels">
                <span className="filter-icon-disc">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"></path>
                    <path d="M2 20v-3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3"></path>
                    <path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"></path>
                  </svg>
                </span>
                Hotels
              </button>
              <button className="location-filter-btn" data-filter="entertainment">
                <span className="filter-icon-disc">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path>
                    <line x1="4" y1="9" x2="20" y2="9"></line>
                    <line x1="4" y1="13" x2="20" y2="13"></line>
                    <line x1="9" y1="5" x2="9" y2="17"></line>
                    <path d="M9 20h6"></path>
                  </svg>
                </span>
                Entertainment
              </button>
              <button className="location-filter-btn" data-filter="beaches">
                <span className="filter-icon-disc">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 21c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"></path>
                    <path d="M12 3v10"></path>
                    <path d="M3 12c1-5 4.5-9 9-9s8 4 9 9z"></path>
                  </svg>
                </span>
                Beaches
              </button>
            </div>

              <button className="location-360-btn" id="location360Btn" title="360° View">
                <span className="text-360">360°</span>
              </button>
            </div>
          </div>

          <aside className="left-liquid-dock" id="leftLiquidDock">
            <div className="dock-pill-track vertical-left-track">
              <button className="nav-btn-item active" data-action="lifestyle" title="Lifestyle">
                <div className="nav-icon-disc">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 4h7a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 4h-7a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h8z"></path>
                  </svg>
                </div>
                <span className="nav-btn-label">Lifestyle</span>
              </button>

              <button className="nav-btn-item" data-action="location" title="Where Sea Meets City">
                <div className="nav-icon-disc">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span className="nav-btn-label">Where Sea Meets City</span>
              </button>

              <button className="nav-btn-item" data-action="findview" title="Find Their View">
                <div className="nav-icon-disc">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="1"></rect>
                    <line x1="8" y1="6" x2="16" y2="6"></line>
                    <line x1="8" y1="10" x2="16" y2="10"></line>
                    <line x1="8" y1="14" x2="16" y2="14"></line>
                    <line x1="8" y1="18" x2="12" y2="18"></line>
                  </svg>
                </div>
                <span className="nav-btn-label">Find Their View</span>
              </button>

              <button className="nav-btn-item" data-action="brochure" title="Brochure">
                <div className="nav-icon-disc">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h9a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"></path>
                    <path d="M16 4h4v16h-4"></path>
                    <line x1="8" y1="9" x2="12" y2="9"></line>
                    <line x1="8" y1="13" x2="12" y2="13"></line>
                  </svg>
                </div>
                <span className="nav-btn-label">Brochure</span>
              </button>
            </div>
          </aside>

          <aside className="right-liquid-dock" id="rightLiquidDock">
            <div className="dock-pill-track vertical-right-track">
              <button className="nav-btn-item" data-action="visionaries" title="Visionaries">
                <div className="nav-icon-disc">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="7" r="4"></circle>
                    <path d="M6 21v-2a6 6 0 0 1 12 0v2"></path>
                  </svg>
                </div>
                <span className="nav-btn-label">Visionaries</span>
              </button>

              <button className="nav-btn-item" data-action="walkthrough" title="Walk Through">
                <div className="nav-icon-disc">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="13" cy="4" r="2"></circle>
                    <path d="M14 6l-3 4 1 6"></path>
                    <path d="M11 10l-4 2 1 6"></path>
                    <path d="M12 10l3 2 3-1"></path>
                    <path d="M8 12l-2 2 1 4"></path>
                  </svg>
                </div>
                <span className="nav-btn-label">Walk Through</span>
              </button>

              <button className="nav-btn-item" data-action="journey" title="Continue the Journey">
                <div className="nav-icon-disc">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <span className="nav-btn-label">Continue the Journey</span>
              </button>
            </div>
          </aside>

          <div className="bottom-gallery-dock" id="bottomGalleryDock">
            <div className="carousel-nav-container">
              <button
                className="carousel-arrow prev-btn"
                id="carouselPrevBtn"
                title="Previous Visual"
                aria-label="Previous Slide"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <div className="carousel-dots-track" id="carouselDotsTrack">
                <button className="carousel-dot active" data-index="0" aria-label="Slide 1"></button>
                <button className="carousel-dot" data-index="1" aria-label="Slide 2"></button>
                <button className="carousel-dot" data-index="2" aria-label="Slide 3"></button>
                <button className="carousel-dot" data-index="3" aria-label="Slide 4"></button>
                <button className="carousel-dot" data-index="4" aria-label="Slide 5"></button>
              </div>

              <button
                className="carousel-arrow next-btn"
                id="carouselNextBtn"
                title="Next Visual"
                aria-label="Next Slide"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <BrochureFlipbook open={brochureOpen} onClose={() => setBrochureOpen(false)} />

      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
