import { client } from '../data/client.js';

export function renderFAQ() {
  var faqList = document.querySelector('.faq-list');
  if (!faqList) return;

  faqList.innerHTML = client.faq.items.map(function(item, index) {
    return [
      '<details class="faq-item animate" data-faq-index="' + index + '">',
      '  <summary>',
      '    <span>' + item.question + '</span>',
      '    <span class="faq-icon">+</span>',
      '  </summary>',
      '  <div class="faq-answer">' + item.answer + '</div>',
      '</details>'
    ].join('\n');
  }).join('\n');

  var items = faqList.querySelectorAll('details');
  items.forEach(function(item) {
    item.addEventListener('toggle', function() {
      if (item.open) {
        items.forEach(function(other) {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
}
