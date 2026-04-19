/**
 * KANISHA SHARMA PORTFOLIO — script.js
 * Modules: AOS · Loading · Particles · Custom Cursor · Scroll Progress
 *          Navbar · Active Sections · Typewriter · Count-up Stats
 *          Magnetic Button · Theme Toggle · Contact Form
 */

/* ================================================================
   1. AOS (Scroll reveal)
================================================================ */
AOS.init({
  duration: 750,
  easing: 'ease-out-quart',
  once: true,
  offset: 50,
  delay: 0,
});


/* ================================================================
   2. LOADING SCREEN
================================================================ */
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  // Small delay so the bar animation fully completes
  setTimeout(() => loading.classList.add('hidden'), 1800);
});


/* ================================================================
   3. FLOATING PARTICLES
================================================================ */
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const COUNT = 28;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 2.5 + 1;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 22 + 14}s;
      animation-delay: ${Math.random() * -25}s;
    `;
    fragment.appendChild(p);
  }

  container.appendChild(fragment);
})();


/* Custom cursor removed per user preference — system cursor is used. */


/* ================================================================
   5. SCROLL PROGRESS BAR
================================================================ */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';
  }, { passive: true });
})();


/* ================================================================
   6. NAVBAR — scroll class + active section highlighting
================================================================ */
(function initNavbar() {
  const navbar    = document.querySelector('.navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  const scrollBtn = document.getElementById('scrollTop');

  if (!navbar) return;

  /* Intersection Observer for active link */
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-28% 0px -65% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* Scroll handler (navbar class + scroll-to-top visibility) */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    if (scrollBtn) scrollBtn.classList.toggle('visible', y > 450);
  }, { passive: true });

  /* Scroll to top */
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  /* Close mobile menu when a nav link is clicked */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navbarNav');
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
})();


/* ================================================================
   7. TYPEWRITER EFFECT
================================================================ */
(function initTypewriter() {
  const el = document.getElementById('typewriterEl');
  if (!el) return;

  const phrases = [
    'AI/ML solutions',
    'intelligent systems',
    'data-driven models',
    'open-source tools',
    'full-stack products',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  let paused      = false;

  const TYPE_SPEED   = 75;
  const DELETE_SPEED = 40;
  const PAUSE_END    = 1800;
  const PAUSE_START  = 350;

  function tick() {
    if (paused) return;

    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        paused = true;
        setTimeout(() => { deleting = true; paused = false; tick(); }, PAUSE_END);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        paused = true;
        setTimeout(() => { paused = false; tick(); }, PAUSE_START);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  // Start after page load completes
  setTimeout(tick, 2200);
})();


/* ================================================================
   8. COUNT-UP STATS (About section)
================================================================ */
(function initCountUp() {
  const statEls = document.querySelectorAll('.stat-num[data-count]');
  if (!statEls.length) return;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el      = entry.target;
      const target  = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1400;
      const start    = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = target;
      }

      requestAnimationFrame(frame);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => countObserver.observe(el));
})();


/* ================================================================
   9. MAGNETIC BUTTON EFFECT (CTA)
================================================================ */
(function initMagneticButton() {
  const btn = document.getElementById('ctaBtn');
  if (!btn || window.matchMedia('(hover: none)').matches) return;

  const STRENGTH = 0.35; // how much it moves

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * STRENGTH;
    const dy = (e.clientY - cy) * STRENGTH;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    setTimeout(() => { btn.style.transition = ''; }, 600);
  });
})();


/* ================================================================
   10. THEME TOGGLE
================================================================ */
function toggleTheme() {
  const body   = document.body;
  const icon   = document.getElementById('themeIcon');
  const isLight = body.classList.toggle('light-mode');

  icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('ks-theme', isLight ? 'light' : 'dark');
}

// Restore persisted theme on load (before DOMContentLoaded to avoid flash)
(function restoreTheme() {
  if (localStorage.getItem('ks-theme') === 'light') {
    document.body.classList.add('light-mode');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = 'fas fa-sun';
  }
})();


/* ================================================================
   11. CONTACT FORM
================================================================ */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('success-message');
  if (!form || !submitBtn) return;

  const textSpan    = submitBtn.querySelector('.btn-submit-text');
  const loadingSpan = submitBtn.querySelector('.btn-submit-loading');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    submitBtn.disabled = true;
    if (textSpan)    textSpan.style.display    = 'none';
    if (loadingSpan) loadingSpan.style.display = 'inline-flex';

    try {
      const response = await fetch('https://formspree.io/f/mldnrjla', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        successMsg.style.display = 'flex';
        form.reset();
        // Auto-hide success message after 6 s
        setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
      } else {
        alert('Oops! Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please check your connection and try again.');
    } finally {
      submitBtn.disabled = false;
      if (textSpan)    textSpan.style.display    = 'inline-flex';
      if (loadingSpan) loadingSpan.style.display = 'none';
    }
  });
})();

document.getElementById("ctaBtn").addEventListener("click", function(e){
  const link = document.createElement("a");
  link.href = "Kanisha_Sharma_VITBhopal.pdf";
  link.download = "Kanisha_Sharma_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

/* End of script.js */
