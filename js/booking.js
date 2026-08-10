'use strict';

import { services } from '../data/services.js';
import { buildWhatsAppLink } from './whatsapp.js';

var bookingRoot = null;
var bookingState = {
  specialist: '',
  service: ''
};

function escapeHTML(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getCategory(key) {
  return services.categories.find(function(category) {
    return category.specialistKey === key;
  });
}

function getServices(key) {
  var category = getCategory(key);
  return category ? services.items[category.id] || [] : [];
}

function getToday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = String(now.getMonth() + 1).padStart(2, '0');
  var day = String(now.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function formatDate(value) {
  var parts = value.split('-').map(Number);
  var date = new Date(parts[0], parts[1] - 1, parts[2]);
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function renderSpecialists() {
  return services.categories.map(function(category) {
    var active = bookingState.specialist === category.specialistKey;
    return [
      '<button type="button" class="booking-choice booking-choice--specialist' + (active ? ' is-selected' : '') + '"',
      ' data-booking-choice-specialist="' + escapeHTML(category.specialistKey) + '" aria-pressed="' + active + '">',
      '  <span class="booking-choice-name">' + escapeHTML(category.specialist) + '</span>',
      '  <span class="booking-choice-detail">' + escapeHTML(category.name) + '</span>',
      '</button>'
    ].join('\n');
  }).join('\n');
}

function renderProcedures() {
  if (!bookingState.specialist) {
    return '<p class="booking-placeholder">Escolha a especialista para ver os procedimentos.</p>';
  }

  return getServices(bookingState.specialist).map(function(item) {
    var active = bookingState.service === item.title;
    return [
      '<button type="button" class="booking-choice booking-choice--service' + (active ? ' is-selected' : '') + '"',
      ' data-booking-choice-service="' + escapeHTML(item.title) + '" aria-pressed="' + active + '">',
      '  <span>' + escapeHTML(item.title) + '</span>',
      item.badge ? '  <small>' + escapeHTML(item.badge) + '</small>' : '',
      '</button>'
    ].join('\n');
  }).join('\n');
}

function renderBooking() {
  if (!bookingRoot) return;

  var hasSpecialist = Boolean(bookingState.specialist);
  var hasService = Boolean(bookingState.service);
  var category = getCategory(bookingState.specialist);

  bookingRoot.innerHTML = [
    '<ol class="booking-progress" aria-label="Etapas do agendamento">',
    '  <li class="is-current"><span>1</span> Especialista</li>',
    '  <li class="' + (hasSpecialist ? 'is-current' : '') + '"><span>2</span> Procedimento</li>',
    '  <li class="' + (hasService ? 'is-current' : '') + '"><span>3</span> Data e hora</li>',
    '</ol>',
    '<form class="booking-form" id="booking-form">',
    '  <fieldset class="booking-step">',
    '    <legend><span>01</span> Com quem você quer agendar?</legend>',
    '    <div class="booking-choice-grid booking-choice-grid--specialists">' + renderSpecialists() + '</div>',
    '  </fieldset>',
    '  <fieldset class="booking-step"' + (hasSpecialist ? '' : ' disabled') + '>',
    '    <legend><span>02</span> Qual procedimento procura?</legend>',
    '    <div class="booking-choice-grid booking-choice-grid--services">' + renderProcedures() + '</div>',
    '  </fieldset>',
    '  <fieldset class="booking-step"' + (hasService ? '' : ' disabled') + '>',
    '    <legend><span>03</span> Qual data e horário prefere?</legend>',
    '    <div class="booking-date-grid">',
    '      <label>Data preferida<input type="date" name="booking-date" min="' + getToday() + '" required></label>',
    '      <label>Horário preferido<input type="time" name="booking-time" step="1800" required></label>',
    '    </div>',
    '  </fieldset>',
    '  <div class="booking-submit-row">',
    '    <p><strong>' + (category ? escapeHTML(category.specialist) : 'Escolha uma especialista') + '</strong><br>O horário será confirmado no WhatsApp.</p>',
    '    <button type="submit" class="btn btn-whatsapp"' + (hasService ? '' : ' disabled') + '>Solicitar horário</button>',
    '  </div>',
    '  <p class="booking-feedback" id="booking-feedback" role="status" aria-live="polite"></p>',
    '</form>'
  ].join('\n');
}

function selectSpecialist(key) {
  bookingState.specialist = key;
  bookingState.service = '';
  renderBooking();
}

function selectService(name) {
  bookingState.service = name;
  renderBooking();
  var dateInput = bookingRoot.querySelector('input[type="date"]');
  if (dateInput) dateInput.focus({ preventScroll: true });
}

function prefillBooking(specialist, service) {
  bookingState.specialist = specialist;
  bookingState.service = service;
  renderBooking();
  bookingRoot.closest('.booking-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleSubmit(event) {
  event.preventDefault();
  var form = event.target;
  if (!form.reportValidity()) return;

  var category = getCategory(bookingState.specialist);
  var data = new FormData(form);
  var date = data.get('booking-date');
  var time = data.get('booking-time');
  if (!category || !bookingState.service || !date || !time) return;

  var message = [
    'Olá, ' + category.specialist + '! Vim pelo site da Vanna Clinic e gostaria de solicitar um horário.',
    '',
    'Procedimento: ' + bookingState.service,
    'Data de preferência: ' + formatDate(date),
    'Horário de preferência: ' + time,
    '',
    'Caso esse horário não esteja disponível, pode me sugerir uma opção próxima?'
  ].join('\n');

  var feedback = bookingRoot.querySelector('#booking-feedback');
  if (feedback) feedback.textContent = 'Abrindo o WhatsApp de ' + category.specialist + '…';
  window.open(buildWhatsAppLink(message, bookingState.specialist), '_blank', 'noopener,noreferrer');
}

export function initBooking() {
  bookingRoot = document.getElementById('booking-app');
  if (!bookingRoot) return;

  renderBooking();

  bookingRoot.addEventListener('click', function(event) {
    var specialistButton = event.target.closest('[data-booking-choice-specialist]');
    if (specialistButton) {
      selectSpecialist(specialistButton.getAttribute('data-booking-choice-specialist'));
      return;
    }

    var serviceButton = event.target.closest('[data-booking-choice-service]');
    if (serviceButton) selectService(serviceButton.getAttribute('data-booking-choice-service'));
  });

  bookingRoot.addEventListener('submit', handleSubmit);

  document.addEventListener('click', function(event) {
    var serviceCard = event.target.closest('[data-booking-specialist][data-booking-service]');
    if (!serviceCard) return;
    prefillBooking(
      serviceCard.getAttribute('data-booking-specialist'),
      serviceCard.getAttribute('data-booking-service')
    );
  });
}
