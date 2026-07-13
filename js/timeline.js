'use strict';

export function initTimeline() {
  var timeline = document.getElementById('timeline');
  if (!timeline || !window.IntersectionObserver) return;

  var steps = Array.prototype.slice.call(timeline.querySelectorAll('[data-timeline-step]'));
  if (!steps.length) return;

  function updateProgress() {
    var activeIndices = steps
      .filter(function(step) { return step.classList.contains('is-active'); })
      .map(function(step) { return parseInt(step.getAttribute('data-step-index'), 10); });
    var lastIndex = activeIndices.length ? Math.max.apply(Math, activeIndices) : 0;
    var progress = steps.length > 1 ? lastIndex / (steps.length - 1) : 1;
    timeline.style.setProperty('--timeline-progress', String(progress));
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-active');
      updateProgress();
    });
  }, { threshold: 0.4, rootMargin: '0px 0px -10% 0px' });

  steps.forEach(function(step) {
    observer.observe(step);
  });

  updateProgress();
}
