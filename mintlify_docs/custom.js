/**
 * ZendFi Docs — Premium UI Enhancements
 *
 * Features:
 *   1. Lenis smooth scrolling (CDN) with CSS fallback
 *   2. Scroll progress indicator bar
 *   3. Back-to-top floating button
 *   4. Anchor link interception for smooth scroll-to
 *
 * Adapted from x0-custom.js for Mintlify's React SPA DOM structure.
 */
(function () {
  'use strict';

  if (window.__zendfi_custom_init) return;
  window.__zendfi_custom_init = true;

  var LENIS_CDN = 'https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js';

  // ─── Helpers ───────────────────────────────────────

  /** Debounce helper */
  function debounce(fn, ms) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, ms);
    };
  }

  // ─── 1. Lenis Smooth Scrolling ────────────────────

  function loadLenis() {
    if (window.Lenis) { initLenis(); return; }

    var s = document.createElement('script');
    s.src = LENIS_CDN;
    s.onload = initLenis;
    s.onerror = function () {
      console.warn('[zfi] Lenis CDN failed; CSS smooth-scroll fallback active.');
    };
    document.head.appendChild(s);
  }

  function initLenis() {
    if (window.__zfi_lenis) return;
    if (typeof window.Lenis === 'undefined') return;

    var lenis = new window.Lenis({
      duration: 1.08,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    window.__zfi_lenis = lenis;

    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // ─── 5. Anchor link interception ─────────────────
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      var target;
      try { target = document.querySelector(hash); } catch (_) { return; }
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.08 });
      if (history.pushState) history.pushState(null, null, hash);
    }, true);

    // Prevent Lenis from hijacking sidebar / code block scrolling
    document.querySelectorAll('[class*="sidebar"], aside, pre, .code-group').forEach(function (el) {
      el.setAttribute('data-lenis-prevent', '');
    });
  }

  // ─── 2. Scroll Progress Indicator ─────────────────

  function initProgressBar() {
    if (document.getElementById('zfi-progress')) return;

    var bar = document.createElement('div');
    bar.id = 'zfi-progress';
    document.body.appendChild(bar);

    var update = function () {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ─── 3. Back-to-Top Button ────────────────────────

  function initBackToTop() {
    if (document.getElementById('zfi-back-to-top')) return;

    var btn = document.createElement('button');
    btn.id = 'zfi-back-to-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.setAttribute('title', 'Back to top');
    btn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M9 14V4M9 4L4 9M9 4L14 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';

    btn.addEventListener('click', function () {
      if (window.__zfi_lenis) {
        window.__zfi_lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    document.body.appendChild(btn);

    var toggle = debounce(function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, 60);

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  }

  // ─── Init ─────────────────────────────────────────

  function init() {
    initProgressBar();
    initBackToTop();
    loadLenis();
  }

  // Mintlify is a React SPA — DOM may not be ready on first load.
  // Also re-run on route changes via MutationObserver.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-tag new pre/code blocks on SPA navigation
  var observer = new MutationObserver(debounce(function () {
    document.querySelectorAll('pre:not([data-lenis-prevent])').forEach(function (el) {
      el.setAttribute('data-lenis-prevent', '');
    });
  }, 300));

  observer.observe(document.body, { childList: true, subtree: true });
})();
