import { client } from '../data/client.js';

function resolveDestination(destinationKey) {
  var destinations = client.contacts.whatsappDestinations || {};
  var aliases = {
    analucia: 'estetica',
    erica: 'cilios'
  };

  var requestedKey = aliases[destinationKey] || destinationKey || 'default';
  var destination = destinations[requestedKey] || destinations.default;

  if (destination && destination.destination) {
    destination = destinations[destination.destination] || destination;
  }

  if (!destination || !destination.number) {
    destination = destinations.estetica || destinations.cilios || {};
  }

  return destination;
}

export function buildWhatsAppLink(message, specialist) {
  var text = (message || '').trim();
  var destination = resolveDestination(specialist);
  var number = destination.number || '';

  return number ? 'https://wa.me/' + number + '?text=' + encodeURIComponent(text) : '#';
}

export function hydrateWhatsAppLinks() {
  document.querySelectorAll('.wa-link').forEach(function(link) {
    var specialist = link.getAttribute('data-specialist');

    if (specialist) {
      var messageKey = link.getAttribute('data-wa-key');
      var message = messageKey ? client.whatsappMessages[messageKey] : link.getAttribute('data-wa-message');
      link.href = buildWhatsAppLink(message || '', specialist);
    } else {
      if (link.dataset.waHydrated === 'true') return;
      link.dataset.waHydrated = 'true';
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var dialog = document.getElementById('wa-router-dialog');
        if (dialog) {
          dialog.showModal();
        }
      });
    }
  });
}

export function hydrateInstagramLinks() {
  document.querySelectorAll('.ig-link').forEach(function(link) {
    link.href = client.contacts.instagramUrl || ('https://instagram.com/' + client.contacts.instagramUser);
  });
}
