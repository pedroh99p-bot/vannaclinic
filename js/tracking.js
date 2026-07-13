'use strict';

import { client } from '../data/client.js';

export function initTracking() {
  var config = client.trackingConfig;

  function injectGTM(id) {
    if (!id || id.indexOf('XXXXXXX') !== -1) return;
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',id);
  }

  function injectPixel(id) {
    if (!id || id.indexOf('XXXXXXXXX') !== -1) return;
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', id);
    fbq('track', 'PageView');
  }

  function injectGoogleAds(id) {
    if (!id || id.indexOf('XXXXXXXXX') !== -1) return;
    var el = document.createElement('script');
    el.async = true;
    el.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(el);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', id);
  }

  function injectTikTok(id) {
    if (!id || id.indexOf('XXXXXXXXX') !== -1) return;
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var e=0;e<ttq.methods.length;e++)ttq.setAndDefer(ttq,ttq.methods[e]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var o="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=o,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n;var i=d.createElement("script");i.type="text/javascript",i.async=!0,i.src=o+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(i,a)};
      ttq.load(id);
      ttq.page();
    }(window, document, 'ttq');
  }

  function injectClarity(id) {
    if (!id || id.indexOf('XXXXXXXXX') !== -1) return;
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", id);
  }

  // Active tags based on IDs
  injectGTM(config.googleTagManagerId);
  injectPixel(config.metaPixelId);
  injectGoogleAds(config.googleAdsId);
  injectTikTok(config.tiktokPixelId);
  injectClarity(config.microsoftClarityId);

  // Trigger Analytics events
  function triggerEvent(eventName, eventParams) {
    console.log('[Tracking Event]:', eventName, eventParams);
    
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        eventParams: eventParams
      });
    }

    if (window.fbq) {
      window.fbq('trackCustom', eventName, eventParams);
    }

    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }

    if (window.ttq) {
      window.ttq.track(eventName, eventParams);
    }
  }

  // Setup DOM tracking
  document.addEventListener('click', function(e) {
    // WhatsApp clicks
    var waLink = e.target.closest('.wa-link');
    if (waLink) {
      var source = waLink.id || waLink.closest('section')?.id || 'general';
      triggerEvent('whatsapp_click', {
        source: source,
        message: waLink.getAttribute('data-wa-message') || ''
      });
      return;
    }

    // Instagram clicks
    var igLink = e.target.closest('.ig-link');
    if (igLink) {
      triggerEvent('instagram_click', {
        source: igLink.closest('section')?.id || 'general'
      });
      return;
    }

    // Open route click
    var routeLink = e.target.closest('.location-actions .btn-outline, a[href*="google.com/maps/dir"]');
    if (routeLink) {
      triggerEvent('map_open_route', {
        label: 'Google Maps Directions'
      });
    }
  });

  // Quiz completed
  window.addEventListener('track_quiz_completed', function(e) {
    triggerEvent('quiz_completed', e.detail || {});
  });

  // FAQ opens
  document.addEventListener('toggle', function(e) {
    if (e.target.tagName === 'DETAILS' && e.target.closest('.faq') && e.target.open) {
      var questionEl = e.target.querySelector('summary span');
      if (questionEl) {
        triggerEvent('faq_opened', { question: questionEl.textContent });
      }
    }
  }, true);

  // Scroll depth
  var scrollDepthReached = { 25: false, 50: false, 75: false, 100: false };
  function checkScrollDepth() {
    var winHeight = window.innerHeight;
    var docHeight = document.documentElement.scrollHeight - winHeight;
    if (docHeight <= 0) return;
    
    var pct = Math.round((window.scrollY / docHeight) * 100);
    [25, 50, 75, 100].forEach(function(depth) {
      if (pct >= depth && !scrollDepthReached[depth]) {
        scrollDepthReached[depth] = true;
        triggerEvent('scroll_depth_' + depth, { percentage: depth });
      }
    });
  }

  window.addEventListener('scroll', checkScrollDepth, { passive: true });
}
