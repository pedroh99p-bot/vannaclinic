'use strict';

export function initLoaderReveal(onComplete) {
  var loader = document.getElementById('page-loader');
  var curtain = document.getElementById('loader-curtain');
  var body = document.body;
  body.classList.remove('loading');

  function revealHero() {
    document.querySelectorAll(
      '.hero .animate, .hero .animate-left, .hero .animate-right, .hero .animate-scale, ' +
      '.hero-text-inner, .hero-badge, .hero-sub, .hero-ctas, .hero-image-area'
    ).forEach(function(el) {
      el.classList.add('visible');
    });
  }

  function revealAll() {
    var selector = '.animate,.animate-left,.animate-right,.animate-scale,.hero-text-inner,.grow-line,.mask-reveal,.section-title-underline,.reveal';
    document.querySelectorAll(selector).forEach(function(el) {
      el.classList.add('visible');
    });
  }

  if (!loader) {
    revealHero();
    if (onComplete) onComplete();
    return;
  }

  var dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    loader.classList.add('done');
    if (curtain) curtain.classList.add('lift');
    revealHero();
    setTimeout(function() {
      if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
      if (curtain && curtain.parentNode) curtain.parentNode.removeChild(curtain);
      if (onComplete) onComplete();
    }, 1100);
  }

  setTimeout(dismiss, 1100);
  setTimeout(function() {
    dismiss();
    revealAll();
  }, 2500);
}

export function initRevealFallback() {
  if (window.IntersectionObserver) return;

  function showAll() {
    var selector = '.animate,.animate-left,.animate-right,.hero-text-inner,.grow-line,.reveal';
    document.querySelectorAll(selector).forEach(function(el) {
      el.classList.add('visible');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showAll);
  } else {
    showAll();
  }
}

export function initScrollReveal() {
  if (!window.IntersectionObserver) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -18px 0px' });

  document.querySelectorAll('.animate,.animate-left,.animate-right,.animate-scale,.grow-line,.mask-reveal,.section-title-underline,.hero-text-inner,.reveal').forEach(function(el) {
    observer.observe(el);
  });
}

export function initServiceCardTilt() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  document.querySelectorAll('.servico-card').forEach(function(card) {
    card.addEventListener('mousemove', function(event) {
      var rect = card.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'translateY(-4px) rotateX(' + (-y * 3) + 'deg) rotateY(' + (x * 4) + 'deg)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
}

export function initWhatsAppModalAndScroll() {
  var floatingSocials = document.getElementById('floating-socials');
  var quizSection = document.getElementById('quiz');
  
  // 1. Scroll-triggered visibility for floating buttons (fade in after quiz)
  if (floatingSocials && quizSection) {
    var checkScroll = function() {
      var rect = quizSection.getBoundingClientRect();
      // O usuário ultrapassou a seção do Quiz (quando a base dela cruza o viewport do usuário)
      if (rect.bottom < window.innerHeight) {
        floatingSocials.classList.add('visible');
      } else {
        floatingSocials.classList.remove('visible');
      }
    };
    
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // 2. WhatsApp Routing dialog modal control
  var waFloatingBtn = document.getElementById('wa-floating-btn');
  var dialog = document.getElementById('wa-router-dialog');
  
  if (waFloatingBtn && dialog) {
    // Open Dialog
    waFloatingBtn.addEventListener('click', function(e) {
      e.preventDefault();
      dialog.showModal();
    });
    
    // Close button
    var closeBtn = dialog.querySelector('.wa-dialog-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        dialog.close();
      });
    }
    
    // Close on click outside (backdrop click)
    dialog.addEventListener('click', function(e) {
      var rect = dialog.getBoundingClientRect();
      var isInDialog = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  }
}
