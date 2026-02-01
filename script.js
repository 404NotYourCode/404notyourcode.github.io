/* Frontend interactions: navigation, reveals, portfolio filter, lightbox with focus trap, contact handling, testimonials */
document.addEventListener('DOMContentLoaded', () => {
  // Utilities
  const qs = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));

  // Header nav toggle
  const navToggle = qs('.nav-toggle');
  const nav = qs('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('active');
    });
  }

  // Reveal on scroll
  const revealEls = qsa('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          o.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('active'));
  }

  // Portfolio filtering
  const filters = qsa('.filter');
  const items = qsa('.portfolio-item');

  function applyFilter(category) {
    items.forEach(it => {
      const cats = (it.dataset.category || '').toLowerCase();
      if (category === 'all' || cats.includes(category)) {
        it.style.display = '';
      } else {
        it.style.display = 'none';
      }
    });
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;
      applyFilter(category);
      // set aria-selected
      filters.forEach(f => f.setAttribute('aria-selected', String(f === btn)));
    });
  });

  // Lightbox / modal with focus trap
  const lightbox = qs('#lightbox');
  const lightboxImg = qs('#lightbox-img');
  const lightboxCaption = qs('#lightbox-caption');
  const lbClose = qs('.lightbox-close');
  const lbPrev = qs('#lb-prev');
  const lbNext = qs('#lb-next');
  let currentIndex = -1;
  let visibleItems = items.filter(it => it.style.display !== 'none');

  function updateVisibleItems() {
    visibleItems = items.filter(it => it.style.display !== 'none');
  }

  function openLightbox(index) {
    updateVisibleItems();
    if (!visibleItems.length) return;
    currentIndex = (index + visibleItems.length) % visibleItems.length;
    const node = visibleItems[currentIndex];
    const img = node.querySelector('img');
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    lightboxCaption.textContent = node.querySelector('h3') ? node.querySelector('h3').textContent : node.querySelector('figcaption')?.textContent || '';
    lightbox.setAttribute('aria-hidden', 'false');
    // Save focused element
    lastFocused = document.activeElement;
    // Focus management
    const focusable = getFocusableElements(lightbox);
    if (focusable.length) focusable[0].focus();
    document.body.style.overflow = 'hidden'; // prevent background scroll
    trapFocus(lightbox);
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
    releaseFocusTrap();
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  // Add click/keyboard handler to portfolio items
  items.forEach((it, i) => {
    it.addEventListener('click', () => {
      // Recompute visible index to account for filtering
      updateVisibleItems();
      const idx = visibleItems.indexOf(it);
      if (idx >= 0) openLightbox(idx);
    });
    it.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        updateVisibleItems();
        const idx = visibleItems.indexOf(it);
        if (idx >= 0) openLightbox(idx);
      }
    });
  });

  // Lightbox controls
  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', () => { openLightbox(currentIndex - 1); });
  lbNext?.addEventListener('click', () => { openLightbox(currentIndex + 1); });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') closeLightbox();
    if (e.key === 'ArrowLeft' && lightbox.getAttribute('aria-hidden') === 'false') openLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight' && lightbox.getAttribute('aria-hidden') === 'false') openLightbox(currentIndex + 1);
  });

  // Close by clicking backdrop
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Focus trap implementation
  let lastFocused = null;
  let trap = null;
  function getFocusableElements(container){
    return Array.from(container.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
  }

  function trapFocus(container){
    releaseFocusTrap();
    const focusable = getFocusableElements(container);
    if (!focusable.length) return;
    let first = focusable[0];
    let last = focusable[focusable.length - 1];
    trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', trap);
  }

  function releaseFocusTrap(){
    if (trap) {
      document.removeEventListener('keydown', trap);
      trap = null;
    }
  }

  // Testimonials simple carousel
  const testimonials = qsa('.testimonial');
  const tPrev = qs('.test-prev');
  const tNext = qs('.test-next');
  let tIndex = testimonials.findIndex(t => t.classList.contains('active')) || 0;
  function showTestimonial(i){
    testimonials.forEach((t, idx) => t.classList.toggle('active', idx === i));
  }
  tPrev?.addEventListener('click', () => {
    tIndex = (tIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(tIndex);
  });
  tNext?.addEventListener('click', () => {
    tIndex = (tIndex + 1) % testimonials.length;
    showTestimonial(tIndex);
  });

  // Contact form handling (progressive enhancement)
  const contactForm = qs('#contactForm');
  const formMessage = qs('#formMessage');

  if (contactForm){
    contactForm.addEventListener('submit', async (e) => {
      // If action is a Formspree endpoint, let the browser handle it by default.
      // We intercept to show friendly message and to support AJAX if desired.
      e.preventDefault();
      const action = contactForm.getAttribute('action') || '';
      const formData = new FormData(contactForm);
      formMessage.textContent = 'Sending…';
      try {
        if (action.includes('formspree.io')) {
          // Use fetch to submit to Formspree for nicer in-page experience.
          const res = await fetch(action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
          if (res.ok) {
            formMessage.textContent = 'Thanks — your message has been sent. We will get back to you shortly.';
            contactForm.reset();
          } else {
            const data = await res.json();
            formMessage.textContent = data?.error || 'Oops — there was a problem sending your message.';
          }
        } else {
          // Fallback: pretend it's sent (or replace with your server endpoint)
          formMessage.textContent = 'Thanks — your message has been queued (configure your server endpoint).';
          contactForm.reset();
        }
      } catch (err){
        formMessage.textContent = 'Network error — please try again later.';
        console.error(err);
      }
    });
  }

  // Set current year in footer
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Small helper: close nav when link clicked (mobile)
  qsa('.nav a').forEach(a => a.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }));
});
