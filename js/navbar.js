export function initNavbarScroll() {
  var nav = document.getElementById('navbar');
  if (!nav) return;

  function update() {
    nav.classList.toggle('scrolled', window.scrollY > 32);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}
