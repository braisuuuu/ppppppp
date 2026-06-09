/**
 * SkinGlow Kit — Shopify OS 2.0 Theme Scripts
 */

(function () {
  'use strict';

  /* ---------- Countdown Timer ---------- */
  function initCountdown() {
    var section = document.querySelector('[data-countdown]');
    if (!section) return;

    var hoursEl = section.querySelector('[data-countdown-hours]');
    var minutesEl = section.querySelector('[data-countdown-minutes]');
    var secondsEl = section.querySelector('[data-countdown-seconds]');

    if (!hoursEl || !minutesEl || !secondsEl) return;

    var time = { hours: 23, minutes: 59, seconds: 59 };

    function pad(n) {
      return String(n).padStart(2, '0');
    }

    function updateDisplay() {
      hoursEl.textContent = pad(time.hours);
      minutesEl.textContent = pad(time.minutes);
      secondsEl.textContent = pad(time.seconds);
    }

    setInterval(function () {
      if (time.seconds > 0) {
        time.seconds--;
      } else if (time.minutes > 0) {
        time.minutes--;
        time.seconds = 59;
      } else if (time.hours > 0) {
        time.hours--;
        time.minutes = 59;
        time.seconds = 59;
      } else {
        time.hours = 23;
        time.minutes = 59;
        time.seconds = 59;
      }
      updateDisplay();
    }, 1000);
  }

  /* ---------- FAQ Accordion ---------- */
  function initFAQ() {
    var triggers = document.querySelectorAll('[data-faq-trigger]');

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.sg-faq__item');
        var answer = item.querySelector('[data-faq-answer]');
        var isOpen = item.classList.contains('is-open');

        // Close all
        document.querySelectorAll('.sg-faq__item.is-open').forEach(function (openItem) {
          openItem.classList.remove('is-open');
          openItem.querySelector('[data-faq-answer]').style.maxHeight = '0';
          openItem.querySelector('[data-faq-trigger]').setAttribute('aria-expanded', 'false');
        });

        // Open clicked (if it wasn't already open)
        if (!isOpen) {
          item.classList.add('is-open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------- Scroll Animations ---------- */
  function initScrollAnimations() {
    var elements = document.querySelectorAll('[data-animate]');

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Smooth Scroll for anchor links ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ---------- Init on DOMContentLoaded ---------- */
  function init() {
    initCountdown();
    initFAQ();
    initScrollAnimations();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
