import { client } from '../data/client.js';

export function buildWhatsAppLink(message) {
  var text = (message || '').trim();
  return 'https://wa.me/' + client.contacts.whatsappNumber + '?text=' + encodeURIComponent(text);
}

export function hydrateWhatsAppLinks() {
  document.querySelectorAll('.wa-link').forEach(function(link) {
    var messageKey = link.getAttribute('data-wa-key');
    var message = messageKey ? client.whatsappMessages[messageKey] : link.getAttribute('data-wa-message');
    if (!message) return;
    link.href = buildWhatsAppLink(message);
  });
}

export function hydrateInstagramLinks() {
  document.querySelectorAll('.ig-link').forEach(function(link) {
    link.href = client.contacts.instagramUrl;
  });
}
