/**
 * HIRANANDANI BEACH QUEEN · VERSOVA
 * Interactive Controller & Dynamic Behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('top-header');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const sideNav = document.getElementById('side-nav');
  const currentSlideEl = document.getElementById('current-slide');
  const verticalDots = document.querySelectorAll('.dot-btn');

  // Modals
  const videoModal = document.getElementById('video-modal');
  const planModal = document.getElementById('plan-modal');
  const leaderModal = document.getElementById('leader-modal');
  
  // Triggers
  const playIntroBtn = document.getElementById('play-intro-btn');
  const centralFilmBtn = document.getElementById('central-film-btn');
  const videoModalClose = document.getElementById('video-modal-close');
  const planTriggerCard = document.getElementById('plan-trigger-card');
  const btnViewFloorplan = document.getElementById('btn-view-floorplan');
  const planModalClose = document.getElementById('plan-modal-close');
  const btnLeaderModal = document.getElementById('btn-leader-modal');
  const leaderModalClose = document.getElementById('leader-modal-close');
  const btnPresentation = document.getElementById('btn-presentation');

  // Carousel
  const track = document.getElementById('townships-track');
  const prevBtn = document.getElementById('car-prev');
  const nextBtn = document.getElementById('car-next');
  const dots = document.querySelectorAll('.t-dot');
  const cards = document.querySelectorAll('.township-card');

  // Form
  const enquiryForm = document.getElementById('main-enquiry-form');
  const formSuccess = document.getElementById('form-success-msg');

  // ================= 1. SIDEBAR TOGGLE & DRAWER =================
  function openSidebar() {
    sidebar.classList.add('open');
    sidebarBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  // Close sidebar on link click for mobile
  document.querySelectorAll('.side-nav a, .top-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) closeSidebar();
    });
  });

  // ================= 2. STICKY HEADER & SCROLL SPY =================
  const sections = [
    { id: 'hero', num: '01' },
    { id: 'legacy', num: '02' },
    { id: 'townships', num: '03' },
    { id: 'versova', num: '04' },
    { id: 'location', num: '05' },
    { id: 'residences', num: '06' },
    { id: 'amenities', num: '07' },
    { id: 'enquire', num: '08' }
  ];

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;

    // Header styling on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Determine current active section
    let activeSectionId = 'hero';
    let activeNum = '01';

    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          activeSectionId = sec.id;
          activeNum = sec.num;
        }
      }
    });

    // Update Counter (01 / 09)
    if (currentSlideEl) {
      currentSlideEl.textContent = activeNum;
    }

    // Update Side Nav Active State
    document.querySelectorAll('.side-nav .nav-item').forEach(item => {
      const href = item.getAttribute('href').replace('#', '');
      if (href === activeSectionId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    });
  });

  // ================= 3. MODALS LOGIC =================
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Video modal
  if (playIntroBtn) playIntroBtn.addEventListener('click', () => openModal(videoModal));
  if (centralFilmBtn) centralFilmBtn.addEventListener('click', () => openModal(videoModal));
  if (videoModalClose) videoModalClose.addEventListener('click', () => closeModal(videoModal));

  // Floor plan modal
  if (planTriggerCard) planTriggerCard.addEventListener('click', () => openModal(planModal));
  if (btnViewFloorplan) {
    btnViewFloorplan.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(planModal);
    });
  }
  if (planModalClose) planModalClose.addEventListener('click', () => closeModal(planModal));

  // Leader modal
  if (btnLeaderModal) btnLeaderModal.addEventListener('click', () => openModal(leaderModal));
  if (leaderModalClose) leaderModalClose.addEventListener('click', () => closeModal(leaderModal));

  // Presentation Mode button
  if (btnPresentation) {
    btnPresentation.addEventListener('click', () => {
      openModal(videoModal);
    });
  }

  // Close modals on clicking outside backdrop
  [videoModal, planModal, leaderModal].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) closeModal(m);
      });
    }
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [videoModal, planModal, leaderModal].forEach(closeModal);
      closeSidebar();
    }
  });

  // ================= 4. TOWNSHIPS CAROUSEL =================
  if (track && cards.length > 0) {
    function scrollToCard(index) {
      const card = cards[index];
      if (card) {
        track.scrollTo({
          left: card.offsetLeft - track.offsetLeft,
          behavior: 'smooth'
        });
        updateDots(index);
      }
    }

    function updateDots(index) {
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });
    }

    function getCurrentIndex() {
      let closest = 0;
      let minDistance = Infinity;
      cards.forEach((card, idx) => {
        const dist = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
        if (dist < minDistance) {
          minDistance = dist;
          closest = idx;
        }
      });
      return closest;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const current = getCurrentIndex();
        const next = Math.max(0, current - 1);
        scrollToCard(next);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const current = getCurrentIndex();
        const next = Math.min(cards.length - 1, current + 1);
        scrollToCard(next);
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => scrollToCard(idx));
    });

    track.addEventListener('scroll', () => {
      const current = getCurrentIndex();
      updateDots(current);
    });
  }

  // ================= 5. ENQUIRY FORM VALIDATION =================
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('lead-name');
      const phoneInput = document.getElementById('lead-phone');
      const emailInput = document.getElementById('lead-email');

      // Simple validation
      [nameInput, phoneInput, emailInput].forEach(inp => {
        const group = inp.parentElement;
        if (!inp.value.trim()) {
          group.classList.add('has-error');
          inp.classList.add('is-invalid');
          isValid = false;
        } else {
          group.classList.remove('has-error');
          inp.classList.remove('is-invalid');
        }
      });

      if (emailInput.value.trim() && !/\S+@\S+\.\S+/.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        emailInput.classList.add('is-invalid');
        isValid = false;
      }

      if (phoneInput.value.trim() && phoneInput.value.trim().length < 8) {
        phoneInput.parentElement.classList.add('has-error');
        phoneInput.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        const submitBtn = document.getElementById('btn-submit-enquiry');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>SUBMITTING...</span>';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>ENQUIRE NOW</span>';
          if (formSuccess) {
            formSuccess.classList.add('active');
            setTimeout(() => {
              formSuccess.classList.remove('active');
            }, 6000);
          }
          enquiryForm.reset();
        }, 800);
      }
    });

    // Clear error on input focus
    enquiryForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('has-error');
        input.classList.remove('is-invalid');
      });
    });
  }
});
