'use strict';

import { injectThemeColors, renderSEO, renderUI } from './render.js';
import { renderFAQ } from './faq.js';
import { hydrateWhatsAppLinks, hydrateInstagramLinks } from './whatsapp.js';
import { initNavbarScroll } from './navbar.js';
import { initLoaderReveal, initRevealFallback, initScrollReveal, initServiceCardTilt, initWhatsAppModalAndScroll } from './animations.js';
import { initCarousels } from './carousel.js';
import { initTimeline } from './timeline.js';
import { initQuiz } from './quiz.js';
import { initTracking } from './tracking.js';
import { initTestimonialsCarousel } from './testimonials.js';
import { initRollers } from './rollers.js';

// Setup Scroll Progress indicator
function initScrollProgress() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function update() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0).toFixed(1) + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// Main Bootstrapping
function bootstrap() {
  // 1. Injetar cores do tema customizadas
  injectThemeColors();

  // 2. Renderizar SEO e dados estruturados
  renderSEO();

  // 3. Renderizar todos os blocos estáticos e dinâmicos da interface
  renderUI();
  renderFAQ();
  initRollers();

  // 4. Hidratar links estáticos do WhatsApp e Instagram
  hydrateWhatsAppLinks();
  hydrateInstagramLinks();

  // 5. Inicializar comportamentos e escutas de navegação
  initNavbarScroll();
  initScrollProgress();

  // 6. Iniciar animação do loader e revela a página
  initLoaderReveal(function() {
    // 7. Apenas inicializar interações de scroll/interativas após a página ser revelada
    initCarousels();
    initTimeline();
    initQuiz();
    initWhatsAppModalAndScroll();
    initTestimonialsCarousel();
    
    // Animações de viewport
    initScrollReveal();
    initRevealFallback();
    initServiceCardTilt();

    // 8. Inicializar os pixels e analytics de tracking
    initTracking();
  });
}

// Executar bootstrap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
