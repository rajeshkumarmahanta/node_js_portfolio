(function () {
  'use strict';

  // ---- Navbar background on scroll ----
  const nav = document.getElementById('siteNav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Reveal-on-scroll ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // ---- Typing effect (roles come from data/home.json) ----
  const typed = document.getElementById('typed');
  if (typed) {
    let roles = [];
    try { roles = JSON.parse(typed.dataset.roles || '[]'); } catch (e) { roles = []; }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (roles.length > 1 && !reduce) {
      let r = 0, c = roles[0].length, deleting = true;
      const tick = () => {
        const word = roles[r];
        typed.textContent = word.slice(0, c);
        if (deleting) {
          c--;
          if (c < 0) { deleting = false; r = (r + 1) % roles.length; c = 0; }
          setTimeout(tick, 40);
        } else {
          c++;
          if (c > roles[r].length) { deleting = true; c = roles[r].length; setTimeout(tick, 1800); return; }
          setTimeout(tick, 80);
        }
      };
      setTimeout(tick, 2000);
    }
  }

  // ---- Portfolio filters ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    const cols = document.querySelectorAll('.project-col');
    const empty = document.getElementById('noResults');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        let shown = 0;
        cols.forEach((col) => {
          const tags = (col.dataset.tags || '').split('|');
          const match = f === 'All' || tags.includes(f);
          col.classList.toggle('is-hidden', !match);
          if (match) { shown++; col.classList.add('visible'); }
        });
        if (empty) empty.classList.toggle('d-none', shown > 0);
      });
    });
  }

  // ---- Copy email ----
  const toastEl = document.getElementById('copyToast');
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (_) {}
        ta.remove();
      }
      if (toastEl && window.bootstrap) bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2200 }).show();
    });
  });
})();
