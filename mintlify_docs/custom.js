/**
 * ZendFi Docs — Premium UI Enhancements
 *
 * 1. Collapsible sidebar toggle (ported from x0-custom.js)
 * 2. Lenis smooth scrolling (CDN) with CSS fallback
 * 3. Scroll progress indicator bar
 * 4. Back-to-top floating button
 */
(function () {
  'use strict';

  if (window.__zfi_custom_init) return;
  window.__zfi_custom_init = true;

  var LENIS_CDN = 'https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js';
  var STORAGE_KEY = 'zfi-sidebar-collapsed';

  // ─────────────────────────────────────────────
  //  1. Sidebar Toggle
  // ─────────────────────────────────────────────

  function initSidebarToggle() {
    if (document.getElementById('zfi-sidebar-toggle')) return;

    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Restore saved state before rendering the button
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      document.body.setAttribute('data-sidebar-collapsed', 'true');
    }

    var btn = document.createElement('button');
    btn.id = 'zfi-sidebar-toggle';
    btn.setAttribute('aria-label', 'Toggle sidebar');
    btn.setAttribute('title', 'Toggle sidebar  [');
    btn.innerHTML =
      '<svg class="zfi-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M9 11L5 7L9 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';

    btn.addEventListener('click', function () {
      var collapsed = document.body.getAttribute('data-sidebar-collapsed') === 'true';
      if (collapsed) {
        document.body.removeAttribute('data-sidebar-collapsed');
        localStorage.setItem(STORAGE_KEY, 'false');
      } else {
        document.body.setAttribute('data-sidebar-collapsed', 'true');
        localStorage.setItem(STORAGE_KEY, 'true');
      }
    });

    // Keyboard shortcut: [ to toggle
    document.addEventListener('keydown', function (e) {
      if (e.key !== '[' || e.ctrlKey || e.metaKey || e.altKey) return;
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
      btn.click();
    });

    document.body.appendChild(btn);
  }

  // ─────────────────────────────────────────────
  //  2. Lenis Smooth Scrolling
  // ─────────────────────────────────────────────

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
      duration: 1.2,
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

    // Anchor link interception
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      var target;
      try { target = document.querySelector(hash); } catch (_) { return; }
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: -100, duration: 1.2 });
      if (history.pushState) history.pushState(null, null, hash);
    }, true);

    // Prevent Lenis from intercepting sidebar scrolling
    var sidebarContent = document.getElementById('sidebar-content');
    if (sidebarContent) sidebarContent.setAttribute('data-lenis-prevent', '');
    var sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.setAttribute('data-lenis-prevent', '');
  }

  // ─────────────────────────────────────────────
  //  3. Scroll Progress Bar
  // ─────────────────────────────────────────────

  function initProgressBar() {
    if (document.getElementById('zfi-progress')) return;

    var bar = document.createElement('div');
    bar.id = 'zfi-progress';
    document.body.appendChild(bar);

    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ─────────────────────────────────────────────
  //  4. Back-to-Top Button
  // ─────────────────────────────────────────────

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

    function toggle() {
      btn.classList.toggle('visible', window.scrollY > 400);
    }

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  }

  // ─────────────────────────────────────────────
  //  Init
  // ─────────────────────────────────────────────

  function init() {
    initSidebarToggle();
    initProgressBar();
    initBackToTop();
    loadLenis();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
