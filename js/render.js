'use strict';

import { client } from '../data/client.js';

export function injectThemeColors() {
  var style = document.createElement('style');
  style.id = 'dynamic-theme-colors';
  
  var lightVariables = Object.keys(client.theme.light).map(function(key) {
    return '  --c-' + key + ': ' + client.theme.light[key] + ';';
  }).join('\n');

  var darkVariables = Object.keys(client.theme.dark).map(function(key) {
    return '  --c-' + key + ': ' + client.theme.dark[key] + ';';
  }).join('\n');

  style.textContent = [
    ':root {',
    lightVariables,
    '}',
    'html.dark-theme {',
    darkVariables,
    '}'
  ].join('\n');

  document.head.appendChild(style);
}

export function renderSEO() {
  document.title = client.seo.title;

  var setMeta = function(selector, attribute, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attribute, value);
  };

  setMeta('meta[name="description"]', 'content', client.seo.description);
  setMeta('meta[name="keywords"]', 'content', client.seo.keywords);
  setMeta('meta[property="og:title"]', 'content', client.seo.title);
  setMeta('meta[property="og:description"]', 'content', client.seo.description);
  setMeta('meta[property="og:image"]', 'content', client.seo.ogImage);
  setMeta('meta[property="og:locale"]', 'content', client.seo.locale);
  setMeta('meta[name="twitter:image"]', 'content', client.seo.ogImage);

  // Favicon setup
  var fav = document.querySelector('link[rel="shortcut icon"], link[rel="icon"]');
  if (!fav) {
    fav = document.createElement('link');
    fav.rel = 'icon';
    document.head.appendChild(fav);
  }
  fav.href = client.branding.favicon;

  // JSON-LD structured data injection
  var jsonLdScript = document.querySelector('script[type="application/ld+json"]');
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }

  var addressParts = client.branding.address.split(' - ');
  var street = addressParts[0] || '';
  var neighborhood = addressParts[1] || '';
  var cityState = addressParts[2] || '';
  var zip = addressParts[3] || '';

  var ldData = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": client.branding.name + " - " + client.branding.profession,
    "description": client.seo.description,
    "image": client.seo.ogImage,
    "telephone": client.seo.telephone,
    "sameAs": [
      client.contacts.instagramUrl
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": street,
      "addressLocality": neighborhood,
      "addressRegion": cityState,
      "postalCode": zip,
      "addressCountry": "BR"
    }
  };

  jsonLdScript.textContent = JSON.stringify(ldData, null, 2);
}

export function renderUI() {
  // Helper to set text content
  var setText = function(selector, text, isHTML) {
    var els = document.querySelectorAll(selector);
    els.forEach(function(el) {
      if (isHTML) el.innerHTML = text;
      else el.textContent = text;
    });
  };

  // Helper to set attributes
  var setAttr = function(selector, attr, value) {
    var els = document.querySelectorAll(selector);
    els.forEach(function(el) {
      el.setAttribute(attr, value);
    });
  };

  // Preloader
  setText('.page-loader .loader-sub', client.branding.professionShort);
  setAttr('.page-loader .loader-logo img', 'src', client.branding.logoPreloader);
  setAttr('.page-loader .loader-logo img', 'alt', client.branding.name);

  // Navbar
  setAttr('.navbar-logo', 'aria-label', client.branding.name);
  setAttr('.navbar-logo img', 'src', client.branding.logoHorizontal);
  setAttr('.navbar-logo img', 'alt', client.branding.name);
  setAttr('.navbar-cta', 'data-wa-message', client.whatsappMessages.navbarCta);

  // Hero Section
  if (client.branding.heroBg) {
    var heroSection = document.querySelector('.hero');
    if (heroSection) {
      // Injetar background image de forma elegante e performance otimizada
      var heroBgImg = heroSection.querySelector('.hero-bg-image');
      if (heroBgImg) {
        heroBgImg.style.backgroundImage = 'url("' + client.branding.heroBg + '")';
      }
    }
  }

  setText('.hero-badge', client.hero.badge);
  setText('.hero-kicker', client.hero.kicker);
  
  // Title on two lines
  var heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    heroTitle.innerHTML = [
      '<span class="hero-text-line"><span class="hero-text-inner delay-1">' + client.hero.titleLine1 + '</span></span>',
      '<span class="hero-text-line"><span class="hero-text-inner delay-2">' + client.hero.titleLine2 + '</span></span>'
    ].join('\n');
  }

  setText('.hero-sub', client.hero.subtitle);
  
  // Hero CTAs
  setText('.hero-ctas .btn-whatsapp', client.hero.ctaWhatsApp);
  setAttr('.hero-ctas .btn-whatsapp', 'data-wa-message', client.whatsappMessages.heroCta);
  setText('.hero-ctas .btn-outline', client.hero.ctaQuiz);

  // Hero checks
  var heroChecks = document.querySelector('.hero-checks');
  if (heroChecks) {
    heroChecks.innerHTML = client.hero.checkmarks.map(function(check) {
      return '<li>' + check + '</li>';
    }).join('\n');
  }

  setText('.hero-urgency', client.hero.urgencyText, true);
  setText('.hero-float-tag .tag-label', client.hero.floatTagLabel);
  setText('.hero-float-tag .tag-value', client.hero.floatTagValue);

  // Trust Strip
  var trustGrid = document.querySelector('.trust-grid');
  if (trustGrid) {
    trustGrid.innerHTML = client.trustStrip.map(function(item) {
      return '<div class="trust-item animate">' + item + '</div>';
    }).join('\n');
  }

  // Rollers (Marquees)
  var renderRoller = function(selector, items) {
    var rollerTracks = document.querySelectorAll(selector + ' .roller-track');
    rollerTracks.forEach(function(track) {
      // Repeat the items list to ensure smooth infinite loop coverage
      var repeated = items.concat(items);
      track.innerHTML = repeated.map(function(item) {
        return '<span class="roller-item"><span class="roller-dot"></span>' + item + '</span>';
      }).join('\n');
    });
  };

  renderRoller('[data-roller="top"]', client.rollers.top);
  renderRoller('[data-roller="middle"]', client.rollers.middle);
  renderRoller('[data-roller="specialist"]', client.rollers.bottom); // maps bottom list to specialist
  renderRoller('[data-roller="bottom"]', client.rollers.bottom);

  // Sinais do Corpo (Sintomas / Dores)
  setText('#dores .section-label', client.bodySignals.label);
  setText('#dores .section-title', client.bodySignals.title, true);
  setText('#dores .section-intro', client.bodySignals.intro);
  setText('#dores .section-cta .btn', client.bodySignals.ctaText);

  var signalsTrack = document.querySelector('#dores .ux-carousel-track');
  if (signalsTrack) {
    signalsTrack.innerHTML = client.bodySignals.cards.map(function(card) {
      var iconSvg = client.quizIcons[card.icon] || '';
      return [
        '<article class="pain-card animate-scale">',
        '  <div class="pain-card-top">',
        '    <div class="pain-icon">' + iconSvg + '</div>',
        '    <div class="pain-signal">' + card.signal + '</div>',
        '  </div>',
        '  <h3>' + card.title + '</h3>',
        '  <p>' + card.description + '</p>',
        '  <div class="pain-protocol">' + card.protocol + '</div>',
        '</article>'
      ].join('\n');
    }).join('\n');
  }

  // Especialista
  setAttr('.especialista-image-wrap img', 'src', client.branding.specialistPhoto);
  setAttr('.especialista-image-wrap img', 'alt', client.branding.name);
  setText('.especialista .section-label', client.specialist.label);
  setText('.especialista .section-title', client.specialist.title, true);
  setText('.especialista .especialista-copy', client.specialist.description);
  
  var specialistBullets = document.querySelector('.specialist-bullets');
  if (specialistBullets) {
    var checkIcon = client.quizIcons.sparkles || '';
    specialistBullets.innerHTML = client.specialist.bullets.map(function(bullet) {
      return [
        '<div class="specialist-bullet">',
        '  <span class="specialist-bullet-icon">' + checkIcon + '</span>',
        '  <span>' + bullet + '</span>',
        '</div>'
      ].join('\n');
    }).join('\n');
  }

  setText('.especialista .btn-whatsapp', client.specialist.ctaText);
  setAttr('.especialista .btn-whatsapp', 'data-wa-message', client.whatsappMessages.specialistCta);

  // Como Funciona (Process Timeline)
  setText('#como-funciona .section-label', client.process.label);
  setText('#como-funciona .section-title', client.process.title, true);
  setText('#como-funciona .timeline-caption', client.process.caption);
  setText('#como-funciona .timeline-actions .btn', client.process.ctaText);
  setAttr('#como-funciona .timeline-actions .btn', 'data-wa-message', client.whatsappMessages.heroCta);

  var timelineElement = document.getElementById('timeline');
  if (timelineElement) {
    // Keep the progress line bar
    var progressLine = '<div class="timeline-progress" aria-hidden="true"></div>';
    var stepsHtml = client.process.steps.map(function(step, idx) {
      return [
        '<article class="timeline-step animate" data-timeline-step data-step-index="' + idx + '">',
        '  <div class="timeline-dot">' + step.number + '</div>',
        '  <h3>' + step.title + '</h3>',
        '  <p>' + step.description + '</p>',
        '</article>'
      ].join('\n');
    }).join('\n');
    timelineElement.innerHTML = progressLine + stepsHtml;
  }

  // Confiança (Depoimentos)
  setText('#depoimentos .section-label', client.confidence.label);
  setText('#depoimentos .section-title', client.confidence.title, true);
  setText('#depoimentos .proof-intro', client.confidence.intro);

  var proofGrid = document.querySelector('.proof-grid');
  if (proofGrid) {
    proofGrid.innerHTML = client.confidence.points.map(function(point) {
      return [
        '<div class="proof-point animate-scale">',
        '  <strong>' + point.title + '</strong>',
        '  <span>' + point.description + '</span>',
        '</div>'
      ].join('\n');
    }).join('\n');
  }

  // Localização
  setText('#localizacao .section-label', client.location.label);
  setText('#localizacao .section-title', client.location.title, true);
  setText('#localizacao .location-copy p', client.location.description);
  setText('#localizacao .location-address-card strong', client.location.cardTitle);
  setText('#localizacao .location-address-card span', client.location.cardAddress);
  
  var locationPoints = document.querySelector('.location-points');
  if (locationPoints) {
    var checkIconLocation = client.quizIcons.calendar || '';
    var tagIconLocation = client.quizIcons.body || ''; // fallback
    locationPoints.innerHTML = client.location.points.map(function(pt, idx) {
      var icon = idx === 0 ? checkIconLocation : tagIconLocation;
      return [
        '<div class="location-point">',
        '  <span class="location-point-icon">' + icon + '</span>',
        '  <span>' + pt + '</span>',
        '</div>'
      ].join('\n');
    }).join('\n');
  }

  setText('#localizacao .location-actions .btn-whatsapp', client.location.ctaWhatsApp);
  setAttr('#localizacao .location-actions .btn-whatsapp', 'data-wa-message', client.whatsappMessages.locationCta);
  setText('#localizacao .location-actions .btn-outline', client.location.ctaRoute);
  setAttr('#localizacao .location-actions .btn-outline', 'href', client.contacts.googleMapsDirectionsUrl);
  setAttr('#localizacao .location-map-card iframe', 'src', client.contacts.googleMapsEmbedUrl);
  setAttr('#localizacao .location-map-card iframe', 'title', 'Mapa de atendimento - ' + client.branding.neighborhood);

  // Seção CTA Final
  setText('.cta-final .section-label', client.ctaFinal.label);
  setText('.cta-final h2', client.ctaFinal.title, true);
  setText('.cta-final p', client.ctaFinal.description);
  setText('.cta-final .btn-whatsapp', client.ctaFinal.ctaWhatsApp);
  setAttr('.cta-final .btn-whatsapp', 'data-wa-message', client.whatsappMessages.finalCta);
  setText('.cta-final .btn-outline', client.ctaFinal.ctaQuiz);
  setText('.cta-final .cta-micro', client.ctaFinal.micro);

  // Footer
  setAttr('.footer .logo-bubble img', 'src', client.branding.logoPreloader);
  setAttr('.footer .logo-bubble img', 'alt', client.branding.name);
  setText('.footer-copy', client.footer.description);
  setText('.footer-title', client.footer.quickLinksTitle);
  setText('.footer-bottom p', client.footer.copyright);
  setText('.footer-bottom span', client.footer.locationText);
  setAttr('.footer-cta .btn', 'data-wa-message', client.whatsappMessages.specialistCta);

  // Floating social icons
  setAttr('.contact-float--instagram', 'aria-label', 'Abrir Instagram de ' + client.branding.name);
  setAttr('.contact-float--whatsapp', 'aria-label', 'Falar no WhatsApp com ' + client.branding.name);
  setAttr('.contact-float--whatsapp', 'data-wa-message', client.whatsappMessages.floatingCta);

  // Portfolio dynamic render
  var portfolioTrack = document.getElementById('portfolio-track');
  if (portfolioTrack && client.portfolio && client.portfolio.items) {
    setText('#portfolio-title', client.portfolio.sectionTitle, true);
    setText('#portfolio-intro', client.portfolio.sectionSubtitle);
    
    portfolioTrack.innerHTML = client.portfolio.items.map(function(item) {
      return [
        '<article class="portfolio-card animate-scale">',
        '  <div class="portfolio-image-wrap">',
        '    <img src="' + item.image + '" alt="' + item.alt + '" loading="lazy" decoding="async">',
        '  </div>',
        '</article>'
      ].join('\n');
    }).join('\n');
  }

  // Dynamically render services protocols
  renderServices();
}

function renderServices() {
  setText('#servicos .section-label', client.services.sectionLabel);
  setText('#servicos .section-title', client.services.sectionTitle, true);
  setText('#servicos .section-intro', client.services.sectionIntro);

  var tabsBar = document.querySelector('.service-tabs-bar');
  var panelsContainer = document.querySelector('.service-panels');
  if (!tabsBar || !panelsContainer) return;

  // Render Tabs Buttons
  tabsBar.innerHTML = client.services.categories.map(function(cat, index) {
    var activeClass = index === 0 ? ' is-active' : '';
    var activeSelected = index === 0 ? 'true' : 'false';
    return [
      '<button type="button" class="service-tab' + activeClass + '" role="tab" data-service-tab="' + cat.id + '" aria-selected="' + activeSelected + '">',
      cat.name,
      '</button>'
    ].join('\n');
  }).join('\n');

  // Render Panels
  panelsContainer.innerHTML = client.services.categories.map(function(cat, index) {
    var activeClass = index === 0 ? ' is-active' : '';
    var hiddenAttr = index === 0 ? '' : ' hidden';
    var itemsList = client.services.items[cat.id] || [];

    var cardsHtml = itemsList.map(function(item) {
      var listItemsHtml = item.list.map(function(li) {
        return '<li>' + li + '</li>';
      }).join('\n');

      return [
        '<article class="servico-card animate-scale">',
        '  <span class="servico-tag">' + item.tag + '</span>',
        '  <h3>' + item.title + '</h3>',
        '  <p>' + item.description + '</p>',
        '  <ul class="servico-list">',
        listItemsHtml,
        '  </ul>',
        '  <a href="#" class="btn btn-outline wa-link" data-wa-message="' + item.waMessage + '" target="_blank" rel="noopener">Quero saber se é ideal para mim</a>',
        '</article>'
      ].join('\n');
    }).join('\n');

    return [
      '<div class="service-panel' + activeClass + '" data-service-panel="' + cat.id + '" role="tabpanel"' + hiddenAttr + '>',
      '  <p class="service-panel-lead animate">' + cat.lead + '</p>',
      '  <div class="service-panel-grid stagger">',
      cardsHtml,
      '  </div>',
      '</div>'
    ].join('\n');
  }).join('\n');

  // Wire up tabs behavior
  var tabs = Array.prototype.slice.call(tabsBar.querySelectorAll('[data-service-tab]'));
  var panels = Array.prototype.slice.call(panelsContainer.querySelectorAll('[data-service-panel]'));
  
  function activate(id) {
    tabs.forEach(function(tab) {
      var active = tab.getAttribute('data-service-tab') === id;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    panels.forEach(function(panel) {
      var active = panel.getAttribute('data-service-panel') === id;
      panel.hidden = !active;
    });
  }

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      activate(tab.getAttribute('data-service-tab'));
    });
  });

  // Render callout
  var callout = document.querySelector('.service-method-callout');
  if (callout) {
    callout.innerHTML = [
      '  <span class="section-label">' + client.services.callout.label + '</span>',
      '  <h3 class="service-group-name">' + client.services.callout.title + '</h3>',
      '  <p>' + client.services.callout.description + '</p>'
    ].join('\n');
  }
}

// Helper text function for local use
function setText(selector, text, isHTML) {
  var els = document.querySelectorAll(selector);
  els.forEach(function(el) {
    if (isHTML) el.innerHTML = text;
    else el.textContent = text;
  });
}
