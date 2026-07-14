'use strict';

var states = [];
var rafId = 0;
var lastFrame = 0;
var refreshTimer = 0;
var initialized = false;

function directChildrenHTML(track, selector) {
  return Array.prototype.slice.call(track.children)
    .filter(function(child) {
      return child.matches(selector);
    })
    .map(function(child) {
      return child.outerHTML;
    })
    .join('\n');
}

function readSpeed(container, fallback) {
  var value = window.getComputedStyle(container).getPropertyValue('--marquee-speed');
  var speed = Number.parseFloat(value);
  return Number.isFinite(speed) && speed > 0 ? speed : fallback;
}

function makeGroup(state, hidden) {
  var group = document.createElement('div');
  group.className = state.groupClass;
  if (state.listRole && !hidden) group.setAttribute('role', 'list');
  if (hidden) group.setAttribute('aria-hidden', 'true');
  group.innerHTML = state.sourceHTML;
  return group;
}

function measureState(state) {
  var containerWidth = state.container.getBoundingClientRect().width;
  if (!containerWidth || !state.sourceHTML) return;

  state.track.innerHTML = '';
  state.track.style.transform = 'translate3d(0, 0, 0)';

  var firstGroup = makeGroup(state, false);
  state.track.appendChild(firstGroup);

  var loopWidth = firstGroup.getBoundingClientRect().width;
  if (!loopWidth) return;

  var targetWidth = Math.max(containerWidth * 2 + loopWidth, loopWidth * 2);
  while (state.track.children.length < 2 || state.track.scrollWidth < targetWidth) {
    state.track.appendChild(makeGroup(state, true));
  }

  state.loopWidth = loopWidth;
  state.position = state.position % loopWidth;
  state.speed = readSpeed(state.container, state.defaultSpeed);
}

function queueRefresh() {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(function() {
    states.forEach(measureState);
  }, 120);
}

function tick(time) {
  if (!lastFrame) lastFrame = time;

  if (document.hidden) {
    lastFrame = time;
    rafId = window.requestAnimationFrame(tick);
    return;
  }

  var delta = Math.min(80, time - lastFrame) / 1000;
  lastFrame = time;

  states.forEach(function(state) {
    if (!state.loopWidth) return;
    state.position = (state.position + state.speed * delta) % state.loopWidth;
    var x = state.reverse ? -state.loopWidth + state.position : -state.position;
    state.track.style.transform = 'translate3d(' + x.toFixed(3) + 'px, 0, 0)';
  });

  rafId = window.requestAnimationFrame(tick);
}

function createRollerState(roller) {
  var track = roller.querySelector('.roller-track');
  if (!track) return null;

  var sourceHTML = directChildrenHTML(track, '.roller-item');
  if (!sourceHTML) return null;

  return {
    container: roller,
    track: track,
    sourceHTML: sourceHTML,
    groupClass: 'roller-group',
    listRole: false,
    reverse: roller.classList.contains('roller--reverse'),
    defaultSpeed: 54,
    speed: 54,
    loopWidth: 0,
    position: 0
  };
}

function createTestimonialsState(track) {
  var wrapper = track.closest('.testimonials-track-wrap') || track.parentElement;
  var sourceHTML = directChildrenHTML(track, '.testimonial-slide');
  if (!wrapper || !sourceHTML) return null;

  return {
    container: wrapper,
    track: track,
    sourceHTML: sourceHTML,
    groupClass: 'testimonials-sequence',
    listRole: true,
    reverse: false,
    defaultSpeed: 32,
    speed: 32,
    loopWidth: 0,
    position: 0
  };
}

export function initRollers() {
  if (initialized) {
    queueRefresh();
    return;
  }

  initialized = true;

  states = Array.prototype.slice.call(document.querySelectorAll('.roller'))
    .map(createRollerState)
    .filter(Boolean);

  var testimonialTrack = document.getElementById('testimonials-track');
  var testimonialState = testimonialTrack ? createTestimonialsState(testimonialTrack) : null;
  if (testimonialState) states.push(testimonialState);

  if (!states.length) return;

  states.forEach(measureState);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(queueRefresh);
  }

  if (window.ResizeObserver) {
    var observer = new ResizeObserver(queueRefresh);
    states.forEach(function(state) {
      observer.observe(state.container);
    });
  } else {
    window.addEventListener('resize', queueRefresh, { passive: true });
  }

  rafId = window.requestAnimationFrame(tick);
}
