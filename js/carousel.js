'use strict';

export function initCarousels() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach(function(shell) {
    var track = shell.querySelector('.ux-carousel-track');
    var prev = shell.querySelector('[data-carousel-prev]');
    var next = shell.querySelector('[data-carousel-next]');
    var carouselId = shell.getAttribute('data-carousel');
    var dotsWrap = shell.parentNode.querySelector('[data-carousel-dots="' + carouselId + '"]');
    if (!track) return;

    var cards = Array.prototype.slice.call(track.children);
    var dots = [];
    var autoplayInterval = null;
    var isAutoplay = shell.getAttribute('data-autoplay') === 'true';
    var intervalTime = parseInt(shell.getAttribute('data-interval') || '4000', 10);

    function stepSize() {
      var firstCard = cards[0];
      if (!firstCard) return track.clientWidth;
      var gap = parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap || '0');
      return firstCard.getBoundingClientRect().width + gap;
    }

    function currentIndex() {
      var size = stepSize();
      if (!size) return 0;
      return Math.round(track.scrollLeft / size);
    }

    function updateDots() {
      var active = currentIndex();
      dots.forEach(function(dot, index) {
        dot.classList.toggle('is-active', index === active);
        dot.setAttribute('aria-current', index === active ? 'true' : 'false');
      });
    }

    function scrollToIndex(index) {
      var size = stepSize();
      track.scrollTo({
        left: Math.max(0, index * size),
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    }

    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      cards.forEach(function(_, index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Ir para o card ' + (index + 1));
        dot.addEventListener('click', function() {
          scrollToIndex(index);
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    if (prev) {
      prev.addEventListener('click', function() {
        scrollToIndex(Math.max(0, currentIndex() - 1));
      });
    }

    if (next) {
      next.addEventListener('click', function() {
        scrollToIndex(Math.min(cards.length - 1, currentIndex() + 1));
      });
    }

    track.addEventListener('scroll', function() {
      window.requestAnimationFrame(updateDots);
    }, { passive: true });

    window.addEventListener('resize', updateDots);
    updateDots();

    // Autoplay implementation
    if (isAutoplay && !reduceMotion) {
      function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(function() {
          var nextIdx = currentIndex() + 1;
          if (nextIdx >= cards.length) {
            nextIdx = 0;
          }
          scrollToIndex(nextIdx);
        }, intervalTime);
      }

      function stopAutoplay() {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
          autoplayInterval = null;
        }
      }

      shell.addEventListener('mouseenter', stopAutoplay);
      shell.addEventListener('mouseleave', startAutoplay);
      shell.addEventListener('touchstart', stopAutoplay, { passive: true });
      shell.addEventListener('touchend', startAutoplay, { passive: true });
      
      startAutoplay();
    }
  });
}
