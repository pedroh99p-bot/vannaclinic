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

  var toAbsoluteUrl = function(value) {
    if (!value) return '';
    if (/^https?:\/\//.test(value)) return value;
    var base = client.seo.siteUrl || window.location.origin + '/';
    return new URL(value.replace(/^\//, ''), base).toString();
  };
  var siteUrl = toAbsoluteUrl(client.seo.siteUrl || '/');
  var ogImage = toAbsoluteUrl(client.seo.ogImage);

  var setMeta = function(selector, attribute, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attribute, value);
  };

  setMeta('meta[name="description"]', 'content', client.seo.description);
  setMeta('meta[name="keywords"]', 'content', client.seo.keywords);
  setMeta('meta[property="og:title"]', 'content', client.seo.title);
  setMeta('meta[property="og:description"]', 'content', client.seo.description);
  setMeta('meta[property="og:url"]', 'content', siteUrl);
  setMeta('meta[property="og:image"]', 'content', ogImage);
  setMeta('meta[property="og:locale"]', 'content', client.seo.locale);
  setMeta('meta[name="twitter:image"]', 'content', ogImage);

  var canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = siteUrl;

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
    "url": siteUrl,
    "image": ogImage,
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

function escapeHTML(value) {
  return String(value || '').replace(/[&<>"']/g, function(char) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char];
  });
}

function renderPortfolioCard(item, isClone) {
  var objectPosition = item.objectPosition ? ' style="--portfolio-object-position: ' + escapeHTML(item.objectPosition) + ';"' : '';
  var hidden = isClone ? ' aria-hidden="true"' : '';
  var alt = isClone ? '' : escapeHTML(item.alt);

  return [
    '<figure class="portfolio-result-card" role="listitem" data-portfolio-item="' + escapeHTML(item.id) + '"' + hidden + objectPosition + '>',
    '  <img src="' + escapeHTML(item.src) + '" alt="' + alt + '" loading="lazy" decoding="async">',
    '</figure>'
  ].join('\n');
}

function renderPortfolioGroup(group) {
  var titleId = 'portfolio-group-' + escapeHTML(group.id);
  var items = Array.isArray(group.items) ? group.items : [];
  var reverseClass = group.direction === 'reverse' ? ' portfolio-marquee--reverse' : '';
  var originalCards = items.map(function(item) {
    return renderPortfolioCard(item, false);
  }).join('\n');
  var clonedCards = items.map(function(item) {
    return renderPortfolioCard(item, true);
  }).join('\n');

  return [
    '<section class="portfolio-group animate" aria-labelledby="' + titleId + '">',
    '  <div class="portfolio-group-heading">',
    '    <h3 class="portfolio-group-title" id="' + titleId + '">' + escapeHTML(group.title) + '</h3>',
    '  </div>',
    '  <div class="portfolio-marquee' + reverseClass + '" role="region" aria-label="' + escapeHTML(group.ariaLabel || group.title) + '" style="--portfolio-duration: ' + escapeHTML(group.speed || '38s') + ';">',
    '    <div class="portfolio-marquee-track">',
    '      <div class="portfolio-marquee-sequence" role="list">',
    originalCards,
    '      </div>',
    '      <div class="portfolio-marquee-sequence" aria-hidden="true">',
    clonedCards,
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>'
  ].join('\n');
}

function renderTestimonialCard(dep, isClone, stars5, googleMiniLogo) {
  var hidden = isClone ? ' aria-hidden="true"' : '';
  var role = isClone ? '' : ' role="listitem"';

  return [
    '<div class="testimonial-slide"' + role + hidden + '>',
    '  <article class="testimonial-card">',
    '    <div class="testimonial-card-header">',
    '      <div class="testimonial-stars" aria-label="5 estrelas">' + stars5 + '</div>',
    '      <div class="testimonial-google-icon">' + googleMiniLogo + '</div>',
    '    </div>',
    '    <p class="testimonial-text">\u201c' + escapeHTML(dep.text) + '\u201d</p>',
    '    <div class="testimonial-author">',
    '      <div class="testimonial-avatar">' + escapeHTML(dep.initials) + '</div>',
    '      <div>',
    '        <div class="testimonial-name">' + escapeHTML(dep.name) + '</div>',
    '        <div class="testimonial-procedure">' + escapeHTML(dep.procedure) + '</div>',
    '      </div>',
    '    </div>',
    '  </article>',
    '</div>'
  ].join('\n');
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
  if (client.branding.heroBgDesktop || client.branding.heroBgMobile || client.branding.heroBg) {
    var heroSection = document.querySelector('.hero');
    if (heroSection) {
      var desktopHero = client.branding.heroBgDesktop || client.branding.heroBg;
      var mobileHero = client.branding.heroBgMobile || desktopHero;
      var toCssUrl = function(path) {
        if (/^(https?:|\/)/.test(path)) return path;
        return '../' + path;
      };
      heroSection.style.setProperty('--hero-bg-desktop', 'url("' + toCssUrl(desktopHero) + '")');
      heroSection.style.setProperty('--hero-bg-mobile', 'url("' + toCssUrl(mobileHero) + '")');
    }
  }

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
    var source = Array.isArray(items) ? items.filter(Boolean) : [];
    rollerTracks.forEach(function(track) {
      var roller = track.closest('.roller');
      if (!source.length) {
        if (roller && roller.parentNode) roller.parentNode.removeChild(roller);
        return;
      }
      if (roller) roller.setAttribute('aria-hidden', 'true');
      var repeatCount = Math.max(3, Math.ceil(12 / source.length));
      var expanded = [];
      for (var i = 0; i < repeatCount; i += 1) {
        expanded = expanded.concat(source);
      }
      track.innerHTML = expanded.map(function(item) {
        return '<span class="roller-item"><span class="roller-dot"></span>' + item + '</span>';
      }).join('\n');
    });
  };

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

  // Especialista — novo layout com título acima da imagem
  setAttr('.especialista-image-wrap img', 'src', client.branding.specialistPhoto);
  setAttr('.especialista-image-wrap img', 'alt', client.branding.name);
  setText('.especialista-header .section-label', client.specialist.label);
  setText('.especialista-header .section-title', client.specialist.title, true);
  setText('.especialista .especialista-copy', client.specialist.description, true);

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
        '<article class="timeline-step animate' + (idx === 0 ? ' is-active' : '') + '" data-timeline-step data-step-index="' + idx + '">',
        '  <div class="timeline-dot">' + step.number + '</div>',
        '  <h3>' + step.title + '</h3>',
        '  <p>' + step.description + '</p>',
        '</article>'
      ].join('\n');
    }).join('\n');
    timelineElement.innerHTML = progressLine + stepsHtml;
  }

  // Depoimentos em marquee infinito (Google Reviews style)
  var testimonialTrack = document.getElementById('testimonials-track');
  if (testimonialTrack && client.testimonials) {
    var starSVG = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor"><path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 17.8l-6.2 3.3 1.2-6.9-5-4.9 6.9-1z"/></svg>';
    var stars5 = starSVG.repeat(5);
    var googleMiniLogo = '<svg viewBox="0 0 24 24" width="16" height="16" aria-label="Google"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>';

    var originalTestimonials = client.testimonials.map(function(dep) {
      return renderTestimonialCard(dep, false, stars5, googleMiniLogo);
    }).join('\n');
    testimonialTrack.innerHTML = originalTestimonials;
  }

  // ── Roller de Palavras-chave (antes do FAQ) ──────────────────────────────
  renderRoller('[data-roller="keywords"]', [
    'Naturalidade', 'Avaliação Individual', 'Segurança', 'Sofisticação',
    'Estética Premium', 'Resultados Elegantes', 'Cuidado Personalizado',
    'Discrição', 'Saúde e Beleza'
  ]);
  renderRoller('[data-roller="location"]', client.rollers.location);

  setText('#faq .section-label', client.faq.sectionLabel);
  setText('#faq .section-title', client.faq.sectionTitle, true);

  // Localização
  setText('#localizacao .section-label', client.location.label);
  setText('#localizacao .section-title', client.location.title, true);
  setText('#localizacao .location-copy p', client.location.description);
  setText('#localizacao .location-address-card strong', client.location.cardTitle);
  setText('#localizacao .location-address-card span', client.location.cardAddress);

  // Injetar telefone e rating no card de localização se existirem
  var locCard = document.querySelector('.location-address-card');
  if (locCard && client.location.cardPhone) {
    var existing = locCard.querySelector('.location-phone');
    if (!existing) {
      var phoneEl = document.createElement('a');
      phoneEl.className = 'location-phone';
      phoneEl.href = 'tel:' + client.location.cardPhone.replace(/\D/g, '');
      phoneEl.textContent = '\uD83D\uDCDE ' + client.location.cardPhone;
      locCard.appendChild(phoneEl);
    }
    if (client.location.cardRating) {
      var ratingExisting = locCard.querySelector('.location-rating');
      if (!ratingExisting) {
        var ratingEl = document.createElement('span');
        ratingEl.className = 'location-rating';
        ratingEl.textContent = '\u2B50 ' + client.location.cardRating;
        locCard.appendChild(ratingEl);
      }
    }
  }

  var locationPoints = document.querySelector('.location-points');
  if (locationPoints) {
    var locationItems = Array.isArray(client.location.points) ? client.location.points.filter(Boolean) : [];
    locationPoints.hidden = !locationItems.length;
    if (locationItems.length) {
      var checkIconLocation = client.quizIcons.calendar || '';
      var tagIconLocation = client.quizIcons.body || ''; // fallback
      locationPoints.innerHTML = locationItems.map(function(pt, idx) {
        var icon = idx === 0 ? checkIconLocation : tagIconLocation;
        return [
          '<div class="location-point animate">',
          '  <span class="location-point-icon">' + icon + '</span>',
          '  <span>' + pt + '</span>',
          '</div>'
        ].join('\n');
      }).join('\n');
    } else {
      locationPoints.innerHTML = '';
    }
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
  var portfolioGroups = document.getElementById('portfolio-groups');
  if (portfolioGroups && client.portfolio && client.portfolio.groups) {
    setText('#portfolio-label', client.portfolio.sectionLabel);
    setText('#portfolio-title', client.portfolio.sectionTitle, true);
    setText('#portfolio-intro', client.portfolio.sectionSubtitle);

    var groups = [
      client.portfolio.groups.advancedAesthetics,
      client.portfolio.groups.brows
    ].filter(Boolean);

    portfolioGroups.innerHTML = groups.map(renderPortfolioGroup).join('\n');
  }

  // Dynamically render services protocols
  renderServices();
}

function renderServices() {
  setText('#servicos .section-label', client.services.sectionLabel);
  setText('#servicos .section-title', client.services.sectionTitle, true);
  setText('#servicos .section-intro', client.services.sectionIntro);

  var directory = document.querySelector('.service-directory');
  if (!directory) return;

  directory.innerHTML = client.services.categories.map(function(category) {
    var items = client.services.items[category.id] || [];
    var cards = items.map(function(item) {
      var featuredClass = item.featured ? ' is-featured' : '';
      var badge = item.badge ? '<span class="servico-badge">' + escapeHTML(item.badge) + '</span>' : '';

      return [
        '<button type="button" class="servico-card animate-scale' + featuredClass + '"',
        '  data-booking-specialist="' + escapeHTML(category.specialistKey) + '"',
        '  data-booking-service="' + escapeHTML(item.title) + '"',
        '  aria-label="Selecionar ' + escapeHTML(item.title) + ' com ' + escapeHTML(category.specialist) + '">',
        '  <span class="servico-card-topline">',
        '    <span class="servico-index">' + String(items.indexOf(item) + 1).padStart(2, '0') + '</span>',
        badge,
        '  </span>',
        '  <span class="servico-title">' + escapeHTML(item.title) + '</span>',
        '  <span class="servico-description">' + escapeHTML(item.description) + '</span>',
        '  <span class="servico-action" aria-hidden="true">Selecionar <span>→</span></span>',
        '</button>'
      ].join('\n');
    }).join('\n');

    return [
      '<section class="service-specialist animate" aria-labelledby="service-' + escapeHTML(category.id) + '">',
      '  <header class="service-specialist-header">',
      '    <span class="service-specialist-name">' + escapeHTML(category.specialist) + '</span>',
      '    <h3 id="service-' + escapeHTML(category.id) + '">' + escapeHTML(category.name) + '</h3>',
      '    <p>' + escapeHTML(category.lead) + '</p>',
      '  </header>',
      '  <div class="service-procedure-list stagger">',
      cards,
      '  </div>',
      '</section>'
    ].join('\n');
  }).join('\n');

}

// Helper text function for local use
function setText(selector, text, isHTML) {
  var els = document.querySelectorAll(selector);
  els.forEach(function(el) {
    if (isHTML) el.innerHTML = text;
    else el.textContent = text;
  });
}
