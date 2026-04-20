/**
 * main.js — Lineika Higia
 * Theme toggle, language switching, scroll animations,
 * counter animation, lightbox, parallax, nav active state
 */

/* ============================================================
   1. THEME TOGGLE
   ============================================================ */
const THEME_KEY = 'lh-theme';
const htmlEl = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved || getSystemTheme());
}

function toggleTheme() {
  const current = htmlEl.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
initTheme();

/* ============================================================
   2. LANGUAGE SYSTEM
   ============================================================ */
const LANG_KEY = 'lh-lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'bg';

function applyLanguage(lang) {
  if (!translations[lang]) lang = 'bg';
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);

  const t = translations[lang];

  // Update html lang attribute + title + meta
  htmlEl.setAttribute('lang', lang);
  document.title = t.page_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t.meta_description);

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', t[key]);
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Update data-i18n-aria
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
  });

  // Update all href tel links (phone) text
  // Update lang switcher UI
  document.querySelectorAll('.lang-option').forEach(opt => {
    const optLang = opt.getAttribute('data-lang');
    opt.classList.toggle('active', optLang === lang);
  });

  // Update lang button display
  const langBtnText = document.getElementById('lang-btn-text');
  if (langBtnText) {
    langBtnText.textContent = `${t.lang_flag} ${t.lang_code.toUpperCase()}`;
  }
}

function initLanguage() {
  applyLanguage(currentLang);
}

// Lang option clicks
document.querySelectorAll('.lang-option').forEach(opt => {
  opt.addEventListener('click', () => {
    const lang = opt.getAttribute('data-lang');
    applyLanguage(lang);
    // Close dropdown
    document.querySelector('.lang-select')?.classList.remove('open');
  });
});

// Lang button toggle dropdown
const langBtn = document.getElementById('lang-btn');
if (langBtn) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelector('.lang-select')?.classList.toggle('open');
  });
}
document.addEventListener('click', () => {
  document.querySelector('.lang-select')?.classList.remove('open');
});

/* ============================================================
   3. MOBILE NAV
   ============================================================ */
const hamburger = document.getElementById('nav-hamburger');
const navOverlay = document.getElementById('nav-overlay');
const overlayClose = document.getElementById('overlay-close');

function openMobileNav() {
  navOverlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  navOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', openMobileNav);
overlayClose?.addEventListener('click', closeMobileNav);

navOverlay?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMobileNav);
});

/* ============================================================
   4. SCROLL ANIMATIONS (IntersectionObserver)
   ============================================================ */
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   5. COUNTER ANIMATION
   ============================================================ */
function animateCounter(el, target, duration = 1800) {
  const isText = isNaN(parseInt(target));
  if (isText) { el.textContent = target; return; }

  const targetNum = parseInt(target);
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(eased * targetNum);
    el.textContent = current + (target.includes('+') ? '+' : '') + (target.includes('%') ? '%' : '');
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('.why-card__number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.getAttribute('data-target');
        if (target) animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ============================================================
   6. HERO PARALLAX
   ============================================================ */
function initParallax() {
  const heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
        if (scrollY < heroHeight) {
          const offset = scrollY * 0.35;
          heroBg.style.transform = `scale(1.05) translateY(${offset}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ============================================================
   7. STICKY NAV ACTIVE SECTION
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: `-${68}px 0px -40% 0px`
  });

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   8. LIGHTBOX
   ============================================================ */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (!lightbox) return;

  const galleryItems = document.querySelectorAll('.gallery__item');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const img = galleryItems[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const img = galleryItems[currentIndex].querySelector('img');
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const img = galleryItems[currentIndex].querySelector('img');
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', showPrev);
  lightboxNext?.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Lightbox img transition
  if (lightboxImg) {
    lightboxImg.style.transition = 'opacity 0.15s ease';
  }
}

/* ============================================================
   9. CONTACT FORM SUBMISSION (prevent default)
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const t = translations[currentLang];
    const originalText = btn.textContent;
    btn.textContent = '✓ Изпратено!';
    btn.style.background = 'var(--accent-green)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

/* ============================================================
   10. TRUST BAR MARQUEE — duplicate items for infinite scroll
   ============================================================ */
function initTrustMarquee() {
  const track = document.querySelector('.trust-bar__track');
  if (!track) return;
  // Clone the track content once for seamless loop
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);
}

/* ============================================================
   11. INIT ALL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initCounters();
  initParallax();
  initActiveNav();
  initLightbox();
  initContactForm();
  initTrustMarquee();
  initLanguage();
});
