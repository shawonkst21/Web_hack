/* Minimal, dependency-free JS:
   - mobile drawer toggle
   - smooth scroll & active link highlight
   - reveal on scroll (IntersectionObserver)
   - contact form validation (client-only)
   - scroll-to-top button
*/

document.addEventListener('DOMContentLoaded', () => {
  // DOM refs
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileClose = document.getElementById('mobileClose');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const drawerLinks = Array.from(document.querySelectorAll('.drawer-link'));
  const allLinks = navLinks.concat(drawerLinks);
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const scrollTopBtn = document.getElementById('scrollTop');
  const yearEl = document.getElementById('year');

  // set year in footer
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile drawer
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
    mobileClose.addEventListener('click', closeDrawer);
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeDrawer();
    });
    function closeDrawer() {
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Smooth scroll with offset for sticky header
  function smoothScrollTo(hash) {
    const el = document.querySelector(hash);
    if (!el) return;
    const headerOffset = document.querySelector('.site-header')?.offsetHeight || 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // attach handlers for nav links
  allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) smoothScrollTo(href);
      // close drawer on mobile
      if (mobileDrawer && mobileDrawer.getAttribute('aria-hidden') === 'false') {
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });

  // IntersectionObserver to set active nav link
  const observerOptions = { root: null, rootMargin: '-30% 0px -40% 0px', threshold: 0 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = '#' + entry.target.id;
      const link = document.querySelector(`.nav-link[href="${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, observerOptions);
  sections.forEach(s => sectionObserver.observe(s));

  // Reveal elements on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => revealObserver.observe(r));

  // scroll top button visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) scrollTopBtn.classList.add('show');
    else scrollTopBtn.classList.remove('show');
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Contact form validation (client-only)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      // basic validation
      if (!name || !email || !message) {
        status.textContent = 'Please complete all fields';
        setTimeout(() => status.textContent = '', 3500);
        return;
      }
      // simulate sending (replace with real API if desired)
      status.textContent = 'Sending…';
      setTimeout(() => {
        status.textContent = 'Thanks — message received! I will reply soon.';
        form.reset();
      }, 900);
    });
  }

}); // DOMContentLoaded
