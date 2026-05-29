/* ============================================================
   MIDCO GLOBAL LOGISTICS — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── SWIPER: TRUST STRIP (infinite marquee) ──────────────── */
  new Swiper('.trust-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    speed: 4000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    freeMode: {
      enabled: true,
      momentum: false,
    },
    allowTouchMove: false,
  });

  /* ── SWIPER: TESTIMONIALS ─────────────────────────────────── */
  new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 24,
    loop: true,
    speed: 500,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.testimonials-swiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.testimonials-swiper .swiper-button-next',
      prevEl: '.testimonials-swiper .swiper-button-prev',
    },
    breakpoints: {
      768:  { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
    },
  });

  /* ── MOBILE MENU ─────────────────────────────────────────── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay    = document.querySelector('.overlay');

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () =>
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu()
  );
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu-link').forEach(l =>
    l.addEventListener('click', closeMenu)
  );

  /* ── FAQ ACCORDION ───────────────────────────────────────── */
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer  = btn.nextElementSibling;
      const isOpen  = answer.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-btn').forEach(b => b.classList.remove('open'));
      if (!isOpen) {
        answer.classList.add('open');
        btn.classList.add('open');
      }
    });
  });

  /* ── SCROLL-REVEAL ───────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay * 120);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(
    '.service-card, .why-feature, .step, .serve-item, .stat-item'
  ).forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = i % 4; // stagger per row
    revealObserver.observe(el);
  });

  /* ── STICKY NAV ACTIVE LINK ──────────────────────────────── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => sectionObserver.observe(s));

  /* ── SCROLL-TO-TOP BUTTON ────────────────────────────────── */
  const floatTop = document.querySelector('.float-top');
  window.addEventListener('scroll', () => {
    floatTop?.classList.toggle('show', window.scrollY > 400);
  });
  floatTop?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ── HERO ANIMATION ──────────────────────────────────────── */
  const heroEls = document.querySelectorAll('.hero-label, .hero-h1, .hero-btns');
  heroEls.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.18}s`;
    el.classList.add('fade-up');
  });

});