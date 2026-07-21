/* ============================================================
   Cerenity Innovation — site behavior (vanilla JS, no framework)
   - Mobile menu toggle
   - Nav "scrolled" state
   - Reveal-on-scroll animations
   Progressive enhancement: if this file fails to load, all content
   stays fully visible (the reveal hiding is applied here, not in CSS).
   ============================================================ */
(function () {
  'use strict';

  var nav = document.getElementById('site-nav');
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  /* ---------- Mobile menu ---------- */
  if (toggle && links) {
    var setMenu = function (open) {
      links.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () {
      setMenu(!links.classList.contains('open'));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- Nav scrolled state ---------- */
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.82);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  var form = document.querySelector('[data-mailto-form]');
  if (form) {
    var to = form.getAttribute('data-mailto') || 'info@cerenityinnovation.com';
    var status = form.querySelector('.status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var val = function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        return el ? el.value.trim() : '';
      };
      var name = val('name'), email = val('email'), message = val('message');
      var subject = 'Website inquiry' + (name ? ' — ' + name : '');
      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
      if (status) status.textContent = 'Opening your email app…';
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (!els.length) return;

  var show = function (el) { el.style.opacity = '1'; el.style.transform = 'none'; };

  if (!('IntersectionObserver' in window)) { els.forEach(show); return; }

  els.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .8s cubic-bezier(.22,.61,.36,1), transform .8s cubic-bezier(.22,.61,.36,1)';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var parent = e.target.parentElement;
      var sibs = parent
        ? Array.prototype.slice.call(parent.querySelectorAll('[data-reveal]'))
        : [e.target];
      e.target.style.transitionDelay = Math.max(0, sibs.indexOf(e.target)) * 80 + 'ms';
      show(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

  els.forEach(function (el) { io.observe(el); });

  /* Safety net: if anything is still hidden after load settles, reveal it. */
  window.addEventListener('load', function () {
    setTimeout(function () {
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.2) show(el);
      });
    }, 600);
  });
})();
