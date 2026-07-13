import { client } from '../data/client.js';

export function buildWhatsAppLink(message, specialist) {
  var text = (message || '').trim();
  var number = client.contacts.whatsappNumber; // default
  
  if (specialist === 'erica') {
    number = '5521993127648';
  } else if (specialist === 'analucia') {
    number = '5521964923211';
  }
  
  return 'https://wa.me/' + number + '?text=' + encodeURIComponent(text);
}

export function hydrateWhatsAppLinks() {
  document.querySelectorAll('.wa-link').forEach(function(link) {
    var messageKey = link.getAttribute('data-wa-key');
    var message = messageKey ? client.whatsappMessages[messageKey] : link.getAttribute('data-wa-message');
    if (!message) return;
    var specialist = link.getAttribute('data-specialist');
    link.href = buildWhatsAppLink(message, specialist);
  });
}

export function hydrateInstagramLinks() {
  document.querySelectorAll('.ig-link').forEach(function(link) {
    link.href = client.contacts.instagramUrl || ('https://instagram.com/' + client.contacts.instagramUser);
  });
}
