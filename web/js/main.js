// ==========================================================================
// OCEAN TERRACE RESIDENCES - MULTI-CONTOUR OCEAN WAVE & CURTAIN REVEAL
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const brandHeader = document.getElementById('brandHeader');
  const imageMask = document.getElementById('imageMask');
  const radiatingAura = document.getElementById('radiatingAura');
  const auraSvg = document.getElementById('auraSvg');
  const heroContent = document.getElementById('heroContent');
  const controlsPanel = document.getElementById('controlsPanel');
  const replayBtn = document.getElementById('replayBtn');
  const styleBtns = document.querySelectorAll('.style-btn');

  let currentWaveStyle = 3; // Default to the Screenshot Ocean Contour Wave (Style 3)
  let animationFrameId = null;
  let waveStartTime = Date.now();
  let animationTimeouts = [];

  const CX = 400;
  const CY = 400;
  const BASE_RADIUS = 188;

  // Track cursor position
  let mouse = { x: 0.5, y: 0.5, rawX: window.innerWidth / 2, rawY: window.innerHeight / 2 };
  window.addEventListener('mousemove', (e) => {
    mouse.rawX = e.clientX;
    mouse.rawY = e.clientY;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  });

  // --------------------------------------------------------------------------
  // SVG GRADIENTS & GLOW DEFS
  // --------------------------------------------------------------------------
  function setupDefs() {
    let defs = auraSvg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      defs.innerHTML = `
        <linearGradient id="oceanCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0077b6" stop-opacity="0.95" />
          <stop offset="40%" stop-color="#00b4d8" stop-opacity="0.9" />
          <stop offset="80%" stop-color="#48cae4" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#90e0ef" stop-opacity="0.9" />
        </linearGradient>

        <linearGradient id="deepSeaGrad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0f766e" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#0284c7" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.9" />
        </linearGradient>

        <linearGradient id="sunsetOceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.95" />
          <stop offset="45%" stop-color="#06b6d4" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.95" />
        </linearGradient>

        <linearGradient id="biolumGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.95" />
          <stop offset="50%" stop-color="#06b6d4" stop-opacity="1" />
          <stop offset="100%" stop-color="#67e8f9" stop-opacity="0.95" />
        </linearGradient>

        <filter id="oceanGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      `;
      auraSvg.appendChild(defs);
    }
  }

  function appendBorderRing(opacity = 0.9, stroke = '#0096c7') {
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ring.setAttribute('cx', CX);
    ring.setAttribute('cy', CY);
    ring.setAttribute('r', BASE_RADIUS);
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', stroke);
    ring.setAttribute('stroke-width', '1.4');
    ring.setAttribute('opacity', opacity);
    auraSvg.appendChild(ring);
  }

  // --------------------------------------------------------------------------
  // OCEAN CONTOUR WAVE (EXACT MATCH TO REFERENCE SCREENSHOT)
  // --------------------------------------------------------------------------
  function renderOceanContourWave(time) {
    auraSvg.innerHTML = '';
    setupDefs();
    appendBorderRing(0.95, '#0077b6');

    // Overlapping marine contour loops matching latest reference screenshot
    const contourConfig = [
      { base: 8, stroke: '#0077b6', width: 1.6, opacity: 0.95, speed: 1.4, freq: 3, tilt: 0.2 },
      { base: 18, stroke: '#0096c7', width: 1.5, opacity: 0.90, speed: -1.2, freq: 4, tilt: -0.3 },
      { base: 28, stroke: '#00b4d8', width: 1.4, opacity: 0.85, speed: 1.6, freq: 3, tilt: 0.4 },
      { base: 38, stroke: '#48cae4', width: 1.3, opacity: 0.80, speed: -1.4, freq: 5, tilt: -0.2 },
      { base: 48, stroke: '#64dfdf', width: 1.2, opacity: 0.75, speed: 1.8, freq: 4, tilt: 0.5 },
      { base: 58, stroke: '#72efdd', width: 1.1, opacity: 0.65, speed: -1.6, freq: 3, tilt: -0.4 },
      { base: 68, stroke: '#90e0ef', width: 1.0, opacity: 0.55, speed: 2.0, freq: 5, tilt: 0.3 },
      { base: 78, stroke: '#ade8f4', width: 0.9, opacity: 0.45, speed: -1.8, freq: 4, tilt: -0.5 }
    ];

    const numPoints = 180;

    contourConfig.forEach((cfg, idx) => {
      let pathData = '';

      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;

        // Organic harmonic undulation with tilt/phase offset creating the loop dynamics
        const wave = 
          Math.sin(angle * cfg.freq + time * cfg.speed + idx * 0.5) * (7 + idx * 1.1) +
          Math.cos(angle * (cfg.freq + 2) - time * (cfg.speed * 0.7)) * (4 + idx * 0.5) +
          Math.sin(angle + cfg.tilt * Math.PI) * (8 + idx * 1.5);

        const r = BASE_RADIUS + cfg.base + wave;
        const x = CX + Math.cos(angle) * r;
        const y = CY + Math.sin(angle) * r;

        if (i === 0) pathData += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        else pathData += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      pathData += ' Z';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', cfg.stroke);
      path.setAttribute('stroke-width', cfg.width);
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('opacity', cfg.opacity);
      auraSvg.appendChild(path);
    });
  }

  // 1. FLUID OCEAN RIBBON WAVE
  function renderFluidWave(time) {
    auraSvg.innerHTML = '';
    setupDefs();
    appendBorderRing(0.85, 'url(#oceanCyanGrad)');

    const waves = [
      { amp: 22, freq: 4, speed: 1.8, stroke: '#0077b6', width: 2.2, opacity: 0.9 },
      { amp: 16, freq: 6, speed: -2.2, stroke: '#00b4d8', width: 1.6, opacity: 0.8 },
      { amp: 32, freq: 3, speed: 1.2, stroke: '#48cae4', width: 1.2, opacity: 0.6 }
    ];

    const numPoints = 180;
    waves.forEach(wave => {
      let pathData = '';
      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
        const waveOffset = Math.sin(angle * wave.freq + time * wave.speed) * wave.amp +
                           Math.cos(angle * (wave.freq * 1.5) - time * (wave.speed * 0.7)) * (wave.amp * 0.35);
        const r = BASE_RADIUS + Math.max(2, waveOffset + 12);
        const x = CX + Math.cos(angle) * r;
        const y = CY + Math.sin(angle) * r;
        if (i === 0) pathData += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        else pathData += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      pathData += ' Z';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', wave.stroke);
      path.setAttribute('stroke-width', wave.width);
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('opacity', wave.opacity);
      auraSvg.appendChild(path);
    });
  }

  // 2. LIVE BAR VISUALIZER
  function renderLiveBars(time) {
    auraSvg.innerHTML = '';
    setupDefs();
    appendBorderRing(0.85, 'url(#oceanCyanGrad)');

    const numBars = 140;
    for (let i = 0; i < numBars; i++) {
      const angle = (i / numBars) * Math.PI * 2 - Math.PI / 2;
      const travelingWave = Math.sin(angle * 4 - time * 2.6) * 16;
      const microRipple = Math.cos(angle * 8 + time * 3.4) * 10;
      const fineVibration = Math.sin(i * 0.35 + time * 4.5) * 6;
      
      const peakAngle = -Math.PI * 0.72;
      const angleDiff = Math.cos(angle - peakAngle);
      const intensity = Math.pow(Math.max(0, (angleDiff + 0.9) / 1.9), 2);

      const dynamicHeight = Math.max(6, 14 + (intensity * 20) + travelingWave + microRipple + fineVibration);
      const outerRadius = BASE_RADIUS + dynamicHeight;

      const x1 = CX + Math.cos(angle) * BASE_RADIUS;
      const y1 = CY + Math.sin(angle) * BASE_RADIUS;
      const x2 = CX + Math.cos(angle) * outerRadius;
      const y2 = CY + Math.sin(angle) * outerRadius;

      const colorRatio = (Math.sin(angle + time) + 1) / 2;
      const strokeColor = colorRatio > 0.6 ? '#00b4d8' : colorRatio > 0.3 ? '#0077b6' : '#0f766e';

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1.toFixed(2));
      line.setAttribute('y1', y1.toFixed(2));
      line.setAttribute('x2', x2.toFixed(2));
      line.setAttribute('y2', y2.toFixed(2));
      line.setAttribute('stroke', strokeColor);
      line.setAttribute('stroke-width', '1.3');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('opacity', (0.8 + (dynamicHeight / 60) * 0.2).toFixed(2));
      auraSvg.appendChild(line);
    }
  }

  // 4. MAGNETIC CURSOR OCEAN WAVE
  function renderMagneticCursorWave(time) {
    auraSvg.innerHTML = '';
    setupDefs();
    appendBorderRing(0.85, 'url(#deepSeaGrad)');

    const mouseAngle = Math.atan2(mouse.y, mouse.x);
    const mouseDistance = Math.hypot(mouse.x, mouse.y);
    const layerColors = ['#0077b6', '#00b4d8', '#48cae4'];
    const numPoints = 160;

    for (let layer = 0; layer < 3; layer++) {
      let pathData = '';
      const layerOffset = layer * 12;

      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
        let angleDiff = Math.abs(angle - mouseAngle);
        if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
        const magneticPull = Math.max(0, 1 - angleDiff / 1.4) * (30 * Math.min(1.5, mouseDistance + 0.3));

        const wave = Math.sin(angle * 5 + time * 2.8 + layer) * 8 + Math.cos(angle * 3 - time * 1.8) * 5;
        const r = BASE_RADIUS + 8 + layerOffset + wave + magneticPull;
        const x = CX + Math.cos(angle) * r;
        const y = CY + Math.sin(angle) * r;

        if (i === 0) pathData += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        else pathData += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      pathData += ' Z';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', layerColors[layer]);
      path.setAttribute('stroke-width', (2.2 - layer * 0.5).toFixed(1));
      path.setAttribute('opacity', (0.9 - layer * 0.22).toFixed(2));
      auraSvg.appendChild(path);
    }
  }

  // 5. SUNSET GLOW OCEAN WAVE
  function renderSunsetGlowWave(time) {
    auraSvg.innerHTML = '';
    setupDefs();
    appendBorderRing(0.9, 'url(#sunsetOceanGrad)');

    const numPoints = 160;
    for (let layer = 0; layer < 4; layer++) {
      let pathData = '';
      const layerBase = BASE_RADIUS + 10 + layer * 14;

      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
        const swell = Math.sin(angle * 4 + time * (2 + layer * 0.5)) * (14 - layer * 2) +
                      Math.cos(angle * 7 - time * 1.5) * 6;
        const r = layerBase + swell;
        const x = CX + Math.cos(angle) * r;
        const y = CY + Math.sin(angle) * r;

        if (i === 0) pathData += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        else pathData += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      pathData += ' Z';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'url(#sunsetOceanGrad)');
      path.setAttribute('stroke-width', (2.2 - layer * 0.4).toFixed(1));
      path.setAttribute('opacity', (0.95 - layer * 0.2).toFixed(2));
      path.setAttribute('filter', 'url(#oceanGlow)');
      auraSvg.appendChild(path);
    }
  }

  // 6. OCEAN FOAM PARTICLES
  function renderOceanFoamParticles(time) {
    auraSvg.innerHTML = '';
    setupDefs();
    appendBorderRing(0.85, '#0077b6');

    const numPoints = 140;
    let pathData = '';
    for (let i = 0; i <= numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
      const wave = Math.sin(angle * 5 + time * 2.5) * 12 + Math.cos(angle * 9 - time * 3) * 6;
      const r = BASE_RADIUS + 12 + wave;
      const x = CX + Math.cos(angle) * r;
      const y = CY + Math.sin(angle) * r;
      if (i === 0) pathData += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
      else pathData += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    pathData += ' Z';

    const wavePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    wavePath.setAttribute('d', pathData);
    wavePath.setAttribute('fill', 'none');
    wavePath.setAttribute('stroke', '#00b4d8');
    wavePath.setAttribute('stroke-width', '1.8');
    wavePath.setAttribute('opacity', '0.85');
    auraSvg.appendChild(wavePath);

    const numParticles = 54;
    for (let p = 0; p < numParticles; p++) {
      const pAngle = (p / numParticles) * Math.PI * 2 + (time * 0.85 * ((p % 2 === 0) ? 1 : -0.7));
      const pDistance = BASE_RADIUS + 6 + ((p * 17 + time * 35) % 65);
      const waveShift = Math.sin(pAngle * 6 + time * 3) * 8;

      const px = CX + Math.cos(pAngle) * (pDistance + waveShift);
      const py = CY + Math.sin(pAngle) * (pDistance + waveShift);
      const pSize = 1.3 + (p % 4) * 0.8;
      const pOpacity = Math.sin(((pDistance - BASE_RADIUS) / 65) * Math.PI) * 0.9;

      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', px.toFixed(2));
      dot.setAttribute('cy', py.toFixed(2));
      dot.setAttribute('r', pSize.toFixed(1));
      dot.setAttribute('fill', p % 3 === 0 ? '#48cae4' : p % 2 === 0 ? '#72efdd' : '#caf0f8');
      dot.setAttribute('opacity', Math.max(0, pOpacity).toFixed(2));
      auraSvg.appendChild(dot);
    }
  }

  // 7. NAUTILUS OCEAN SPIRAL
  function renderNautilusSpiral(time) {
    auraSvg.innerHTML = '';
    setupDefs();
    appendBorderRing(0.85, 'url(#oceanCyanGrad)');

    const spirals = [
      { turns: 2.2, dir: 1, speed: 1.2, stroke: '#0077b6', width: 2.0, opacity: 0.9 },
      { turns: 2.2, dir: -1, speed: -1.0, stroke: '#00b4d8', width: 1.5, opacity: 0.75 },
      { turns: 1.5, dir: 1, speed: 1.8, stroke: '#48cae4', width: 1.2, opacity: 0.55 }
    ];

    const numPoints = 180;
    spirals.forEach(sp => {
      let pathData = '';
      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints);
        const theta = t * (Math.PI * 2 * sp.turns) + (time * sp.speed * sp.dir);
        const r = BASE_RADIUS + t * 65 + Math.sin(theta * 4) * 4;
        const x = CX + Math.cos(theta) * r;
        const y = CY + Math.sin(theta) * r;

        if (i === 0) pathData += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        else pathData += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', sp.stroke);
      path.setAttribute('stroke-width', sp.width);
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('opacity', sp.opacity);
      auraSvg.appendChild(path);
    });
  }

  // 8. BIOLUMINESCENT OCEAN WAVE
  function renderBioluminescentOcean(time) {
    auraSvg.innerHTML = '';
    setupDefs();
    appendBorderRing(0.95, 'url(#biolumGrad)');

    const numPoints = 160;
    const numLayers = 3;

    for (let layer = 0; layer < numLayers; layer++) {
      let pathData = '';
      const layerBase = BASE_RADIUS + 8 + layer * 14;

      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
        const swell = Math.sin(angle * 5 + time * 3 + layer) * 12 +
                      Math.cos(angle * 9 - time * 2.2) * 6;
        const r = layerBase + swell;
        const x = CX + Math.cos(angle) * r;
        const y = CY + Math.sin(angle) * r;

        if (i === 0) pathData += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        else pathData += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      pathData += ' Z';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'url(#biolumGrad)');
      path.setAttribute('stroke-width', (2.4 - layer * 0.6).toFixed(1));
      path.setAttribute('opacity', (0.95 - layer * 0.25).toFixed(2));
      path.setAttribute('filter', 'url(#oceanGlow)');
      auraSvg.appendChild(path);
    }
  }

  // 9. COASTAL TIDAL SWELL
  function renderCoastalTidalSwell(time) {
    auraSvg.innerHTML = '';
    setupDefs();
    appendBorderRing(0.9, '#0077b6');

    const numRings = 4;
    const numPoints = 160;

    for (let rIdx = 0; rIdx < numRings; rIdx++) {
      let pathData = '';
      const rBase = BASE_RADIUS + 10 + rIdx * 16;

      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
        const tidalSwell = Math.sin(angle * 3 - time * 2) * 18 + Math.sin(angle * 7 + time * 3.5) * 6;
        const r = rBase + tidalSwell;
        const x = CX + Math.cos(angle) * r;
        const y = CY + Math.sin(angle) * r;

        if (i === 0) pathData += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        else pathData += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      pathData += ' Z';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', rIdx % 2 === 0 ? '#0077b6' : '#00b4d8');
      path.setAttribute('stroke-width', (2.2 - rIdx * 0.4).toFixed(1));
      path.setAttribute('opacity', (0.9 - rIdx * 0.2).toFixed(2));
      auraSvg.appendChild(path);
    }
  }

  // --------------------------------------------------------------------------
  // MASTER RENDER LOOP
  // --------------------------------------------------------------------------
  function animateWaveLoop() {
    const elapsedSeconds = (Date.now() - waveStartTime) / 1000;

    switch (currentWaveStyle) {
      case 1: renderFluidWave(elapsedSeconds); break;
      case 2: renderLiveBars(elapsedSeconds); break;
      case 3: renderOceanContourWave(elapsedSeconds); break;
      case 4: renderMagneticCursorWave(elapsedSeconds); break;
      case 5: renderSunsetGlowWave(elapsedSeconds); break;
      case 6: renderOceanFoamParticles(elapsedSeconds); break;
      case 7: renderNautilusSpiral(elapsedSeconds); break;
      case 8: renderBioluminescentOcean(elapsedSeconds); break;
      case 9: renderCoastalTidalSwell(elapsedSeconds); break;
      default: renderOceanContourWave(elapsedSeconds);
    }

    animationFrameId = requestAnimationFrame(animateWaveLoop);
  }

  function startWaveLoop() {
    if (!animationFrameId) {
      waveStartTime = Date.now();
      animationFrameId = requestAnimationFrame(animateWaveLoop);
    }
  }

  // --------------------------------------------------------------------------
  // TIMELINE & SMOOTH FADE TRANSITION CONTROLLER
  // --------------------------------------------------------------------------
  const introLogoContainer = document.getElementById('introLogoContainer');
  const floatingEnterContainer = document.getElementById('floatingEnterContainer');

  function clearAllTimeouts() {
    animationTimeouts.forEach(t => clearTimeout(t));
    animationTimeouts = [];
  }

  function runIntroExperience() {
    clearAllTimeouts();
    startWaveLoop();

    // Reset All Elements
    if (introLogoContainer) {
      introLogoContainer.classList.remove('visible', 'fade-out');
    }
    if (floatingEnterContainer) {
      floatingEnterContainer.classList.remove('visible');
    }
    brandHeader.classList.remove('visible', 'moved-top', 'mode-fullscreen');
    imageMask.classList.remove('circle-preview', 'expanded-fullscreen');
    radiatingAura.classList.remove('active', 'fade-out');
    heroContent.classList.remove('revealed');
    if (controlsPanel) controlsPanel.classList.remove('visible');
    if (heroImg) {
      heroImg.src = 'assets/ocean_terrace_hero.png';
    }

    // STEP 1: Big orig.avif Logo Fades in at Center
    animationTimeouts.push(setTimeout(() => {
      if (introLogoContainer) introLogoContainer.classList.add('visible');
    }, 400));

    // STEP 2: orig.avif Logo fades out
    animationTimeouts.push(setTimeout(() => {
      if (introLogoContainer) {
        introLogoContainer.classList.remove('visible');
        introLogoContainer.classList.add('fade-out');
      }
    }, 2200));

    // STEP 3: "OCEAN TERRACE" text fades in at the CENTER of screen
    animationTimeouts.push(setTimeout(() => {
      brandHeader.classList.add('visible');
    }, 2800));

    // STEP 4: "OCEAN TERRACE" text smoothly glides up from Center to TOP
    animationTimeouts.push(setTimeout(() => {
      brandHeader.classList.add('moved-top');
    }, 4200));

    // STEP 5: Center Circle + Ocean Contour Waves appear in center
    animationTimeouts.push(setTimeout(() => {
      radiatingAura.classList.add('active'); // Cyan contour wave
      imageMask.classList.add('circle-preview'); // Circle ocean preview
    }, 4900));

    // STEP 6: Fluid Curtain Reveal ("Parda Khulta Hai" -> Fullscreen Expand)
    animationTimeouts.push(setTimeout(() => {
      imageMask.classList.add('expanded-fullscreen');
      radiatingAura.classList.remove('active');
      radiatingAura.classList.add('fade-out');
      brandHeader.classList.add('mode-fullscreen');
    }, 7800));

    // STEP 7: Reveal Center Headline Typography (Line 1 -> Line 2 -> Line 3)
    animationTimeouts.push(setTimeout(() => {
      heroContent.classList.add('revealed');
    }, 8800));

    // STEP 8: Exactly 1 second after line 3 ("CINEMATIC OCEAN VISTAS") appears, transition to 2nd image page
    const line3 = document.querySelector('.hero-headline .line-3');
    if (line3) {
      const onLine3Revealed = (e) => {
        if (e.propertyName === 'opacity') {
          line3.removeEventListener('transitionend', onLine3Revealed);
          animationTimeouts.push(setTimeout(() => {
            openExploreView();
          }, 1000));
        }
      };
      line3.addEventListener('transitionend', onLine3Revealed);
    }

    // Safety fallback timeout in case transitionend is skipped
    animationTimeouts.push(setTimeout(() => {
      openExploreView();
    }, 14800));
  }

  // --------------------------------------------------------------------------
  // EXPLORATION VIEW TRANSITION (TRIGGERED ON ENTER CLICK)
  // --------------------------------------------------------------------------
  // EXPLORATION VIEW CAROUSEL (DOTS, SIDE ARROWS, AUTOMATIC CHANGE)
  // --------------------------------------------------------------------------
  const exploreSlides = [
    'assets/explore_sunset_balcony.png', // Slide 0: Sunset Balcony Woman
    'assets/ocean_terrace_hero.png',     // Slide 1: Circular Lawn Garden Deck
    'assets/terrace_sofa_deck.png',      // Slide 2: Curved Sofa Terrace Deck
    'assets/versova-coast.jpg',          // Slide 3: Coastline Sunset
    'assets/living-room.jpg'             // Slide 4: Horizon Living Room
  ];

  let currentSlideIndex = 0;
  let autoSlideTimer = null;

  const carouselDots = document.querySelectorAll('.carousel-dot');
  const carouselPrevBtn = document.getElementById('carouselPrevBtn');
  const carouselNextBtn = document.getElementById('carouselNextBtn');
  const screenArrowLeft = document.getElementById('screenArrowLeft');
  const screenArrowRight = document.getElementById('screenArrowRight');

  function updateCarouselUI(index) {
    currentSlideIndex = index;
    carouselDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    if (heroImg) {
      heroImg.style.transition = 'opacity 0.65s ease';
      heroImg.style.opacity = '0.35';
      setTimeout(() => {
        heroImg.src = exploreSlides[index];
        heroImg.style.opacity = '1';
      }, 200);
    }
  }

  function nextSlide() {
    const nextIdx = (currentSlideIndex + 1) % exploreSlides.length;
    updateCarouselUI(nextIdx);
  }

  function prevSlide() {
    const prevIdx = (currentSlideIndex - 1 + exploreSlides.length) % exploreSlides.length;
    updateCarouselUI(prevIdx);
  }

  function resetAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => {
      if (stage.classList.contains('in-explore-mode')) {
        nextSlide();
      }
    }, 4500);
  }

  function openExploreView() {
    stage.classList.add('in-explore-mode');
    mainExploreView.classList.add('active');

    // Start with Slide 0 (Sunset Balcony Woman)
    updateCarouselUI(0);

    // Start Automatic Image Changing
    resetAutoSlide();
  }

  function closeExploreView() {
    stage.classList.remove('in-explore-mode');
    mainExploreView.classList.remove('active');
    if (autoSlideTimer) clearInterval(autoSlideTimer);
    if (heroImg) {
      heroImg.src = 'assets/ocean_terrace_hero.png';
    }
    runIntroExperience();
  }

  // Dots Click Event
  carouselDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      updateCarouselUI(idx);
      resetAutoSlide();
    });
  });

  // Carousel Arrow Clicks (Bottom Dock)
  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }
  if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  // Floating Screen Side Arrow Clicks
  if (screenArrowLeft) {
    screenArrowLeft.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }
  if (screenArrowRight) {
    screenArrowRight.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  // Interactive Nav Item Switching
  const navBtnItems = document.querySelectorAll('.nav-btn-item, .nav-pill');
  navBtnItems.forEach(item => {
    item.addEventListener('click', () => {
      navBtnItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Style switcher button clicks (Intro View)
  if (styleBtns && styleBtns.length) {
    styleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        styleBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentWaveStyle = parseInt(e.target.getAttribute('data-style'), 10);
        runIntroExperience();
      });
    });
  }

  // Replay Button
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      runIntroExperience();
    });
  }

  // Start Experience
  runIntroExperience();
});
