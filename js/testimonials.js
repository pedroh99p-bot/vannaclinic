'use strict';

import { client } from '../data/client.js';

export function initTestimonialsCarousel() {
  var track = document.getElementById('testimonials-track');
  var dotsContainer = document.getElementById('dep-dots');
  var prevBtn = document.getElementById('dep-prev');
  var nextBtn = document.getElementById('dep-next');
  if (!track || !client.testimonials) return;

  var slides = track.querySelectorAll('.testimonial-slide');
  if (!slides.length) return;

  // Determine per-view count based on viewport width
  function perView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  var current = 0;
  var pv = perView();
  var total = Math.max(1, slides.length - pv + 1);
  var isPaused = false;
  var timer = null;

  function updateMetrics() {
    pv = perView();
    total = Math.max(1, slides.length - pv + 1);
    if (current >= total) current = total - 1;
  }

  // Build dots
  function buildDots() {
    updateMetrics();
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testimonials-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', 'Depoimento ' + (i + 1));
      (function(idx) {
        dot.addEventListener('click', function() { goTo(idx); });
      })(i);
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(idx) {
    updateMetrics();
    current = ((idx % total) + total) % total;
    track.style.transform = 'translateX(-' + (current * (100 / pv)) + '%)';
    
    // Update dots
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.testimonials-dot').forEach(function(d, i) {
        d.classList.toggle('active', i === current);
      });
    }
  }

  function goNext() { goTo(current + 1); }
  function goPrev() { goTo(current - 1); }

  function startAutoplay() {
    if (timer) clearInterval(timer);
    timer = setInterval(function() {
      if (!isPaused) goNext();
    }, 4500);
  }

  // Set slide widths based on perView
  function setSlideSizes() {
    updateMetrics();
    slides.forEach(function(slide) {
      slide.style.minWidth = (100 / pv) + '%';
    });
    // Re-render to same position after resize
    buildDots();
    goTo(current);
  }

  // Pause on hover
  var outer = document.getElementById('testimonials-outer');
  if (outer) {
    outer.addEventListener('mouseenter', function() { isPaused = true; });
    outer.addEventListener('mouseleave', function() { isPaused = false; });
  }

  if (prevBtn) prevBtn.addEventListener('click', function() { goPrev(); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goNext(); });

  // Touch / swipe support
  var touchStartX = 0;
  track.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext(); else goPrev();
    }
  }, { passive: true });

  window.addEventListener('resize', setSlideSizes, { passive: true });

  // Init
  setSlideSizes();
  startAutoplay();
}
