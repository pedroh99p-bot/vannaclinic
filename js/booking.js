'use strict';

import { services } from '../data/services.js';
import { quizIcons } from '../data/quiz.js';
import { buildWhatsAppLink } from './whatsapp.js';

var bookingRoot = null;
var bookingDialog = null;
var bookingDialogContent = null;
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

function getBookingCategories() {
  var order = ['estetica', 'cilios'];
  return order.map(getCategory).filter(Boolean);
}

function getServices(key) {
  var category = getCategory(key);
  return category ? services.items[category.id] || [] : [];
}

function getCategoryIcon(key) {
  return key === 'cilios' ? quizIcons.cilios : quizIcons.syringe;
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

function renderLauncher() {
  bookingRoot.innerHTML = [
    '<div class="booking-launch-grid" aria-label="Escolha a área do atendimento">',
    getBookingCategories().map(function(category) {
      return [
        '<button type="button" class="booking-launch-card" data-booking-open="' + escapeHTML(category.specialistKey) + '">',
        '  <span class="booking-launch-icon">' + getCategoryIcon(category.specialistKey) + '</span>',
        '  <span class="booking-launch-title">' + escapeHTML(category.name) + '</span>',
        '  <span class="booking-launch-action" aria-hidden="true">Escolher <span>→</span></span>',
        '</button>'
      ].join('\n');
    }).join('\n'),
    '</div>',
    '<p class="booking-launch-note">Você escolhe o procedimento, a data e o horário no próximo passo.</p>'
  ].join('\n');
}

function renderAreaSwitch() {
  return getBookingCategories().map(function(category) {
    var active = bookingState.specialist === category.specialistKey;
    return [
      '<button type="button" class="booking-area-option' + (active ? ' is-selected' : '') + '"',
      ' data-booking-area="' + escapeHTML(category.specialistKey) + '" aria-pressed="' + active + '">',
      '  <span class="booking-area-icon">' + getCategoryIcon(category.specialistKey) + '</span>',
      '  <span>' + escapeHTML(category.name) + '</span>',
      '</button>'
    ].join('\n');
  }).join('\n');
}

function renderProcedures() {
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

function renderDialog() {
  if (!bookingDialogContent) return;

  var category = getCategory(bookingState.specialist);
  var hasService = Boolean(bookingState.service);
  if (!category) return;

  bookingDialogContent.innerHTML = [
    '<header class="booking-dialog-header">',
    '  <span class="booking-dialog-eyebrow">Mini agendamento</span>',
    '  <h3 id="booking-dialog-title">Escolha sua preferência</h3>',
    '  <p>O horário será confirmado pelo WhatsApp.</p>',
    '</header>',
    '<div class="booking-area-switch" aria-label="Área do atendimento">' + renderAreaSwitch() + '</div>',
    '<ol class="booking-progress" aria-label="Etapas do agendamento">',
    '  <li class="is-current"><span>1</span> Procedimento</li>',
    '  <li class="' + (hasService ? 'is-current' : '') + '"><span>2</span> Data e hora</li>',
    '</ol>',
    '<form class="booking-form" id="booking-form">',
    '  <fieldset class="booking-step">',
    '    <legend><span>01</span> Qual procedimento procura?</legend>',
    '    <div class="booking-choice-grid booking-choice-grid--services">' + renderProcedures() + '</div>',
    '  </fieldset>',
    '  <fieldset class="booking-step"' + (hasService ? '' : ' disabled') + '>',
    '    <legend><span>02</span> Qual data e horário prefere?</legend>',
    '    <div class="booking-date-grid">',
    '      <label>Data preferida<input type="date" name="booking-date" min="' + getToday() + '" required></label>',
    '      <label>Horário preferido<input type="time" name="booking-time" step="1800" required></label>',
    '    </div>',
    '  </fieldset>',
    '  <div class="booking-submit-row">',
    '    <p><strong>' + escapeHTML(category.name) + '</strong><br>Confirmação final pelo WhatsApp.</p>',
    '    <button type="submit" class="btn btn-whatsapp"' + (hasService ? '' : ' disabled') + '>Solicitar horário</button>',
    '  </div>',
    '  <p class="booking-feedback" id="booking-feedback" role="status" aria-live="polite"></p>',
    '</form>'
  ].join('\n');
}

function focusDialogTarget(preferDate) {
  window.requestAnimationFrame(function() {
    var selector = preferDate ? 'input[type="date"]' : '[data-booking-choice-service]';
    var target = bookingDialogContent.querySelector(selector);
    if (target) target.focus({ preventScroll: true });
  });
}

function openBooking(specialist, service) {
  bookingState.specialist = specialist;
  bookingState.service = service || '';
  renderDialog();
  if (!bookingDialog.open) bookingDialog.showModal();
  focusDialogTarget(Boolean(service));
}

function selectArea(key) {
  bookingState.specialist = key;
  bookingState.service = '';
  renderDialog();
  focusDialogTarget(false);
}

function selectService(name) {
  bookingState.service = name;
  renderDialog();
  focusDialogTarget(true);
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
    'Olá! Vim pelo site da Vanna Clinic e gostaria de solicitar um horário.',
    '',
    'Área: ' + category.name,
    'Procedimento: ' + bookingState.service,
    'Data de preferência: ' + formatDate(date),
    'Horário de preferência: ' + time,
    '',
    'Caso esse horário não esteja disponível, pode me sugerir uma opção próxima?'
  ].join('\n');

  var feedback = bookingDialogContent.querySelector('#booking-feedback');
  if (feedback) feedback.textContent = 'Abrindo o WhatsApp do atendimento selecionado…';
  window.open(buildWhatsAppLink(message, bookingState.specialist), '_blank', 'noopener,noreferrer');
}

export function initBooking() {
  bookingRoot = document.getElementById('booking-app');
  bookingDialog = document.getElementById('booking-dialog');
  bookingDialogContent = document.getElementById('booking-dialog-content');
  if (!bookingRoot || !bookingDialog || !bookingDialogContent) return;

  renderLauncher();

  bookingRoot.addEventListener('click', function(event) {
    var trigger = event.target.closest('[data-booking-open]');
    if (trigger) openBooking(trigger.getAttribute('data-booking-open'));
  });

  bookingDialogContent.addEventListener('click', function(event) {
    var areaButton = event.target.closest('[data-booking-area]');
    if (areaButton) {
      selectArea(areaButton.getAttribute('data-booking-area'));
      return;
    }

    var serviceButton = event.target.closest('[data-booking-choice-service]');
    if (serviceButton) selectService(serviceButton.getAttribute('data-booking-choice-service'));
  });

  bookingDialogContent.addEventListener('submit', handleSubmit);

  bookingDialog.querySelector('.booking-dialog-close').addEventListener('click', function() {
    bookingDialog.close();
  });

  bookingDialog.addEventListener('click', function(event) {
    if (event.target === bookingDialog) bookingDialog.close();
  });

  document.addEventListener('click', function(event) {
    var serviceCard = event.target.closest('[data-booking-specialist][data-booking-service]');
    if (!serviceCard) return;
    openBooking(
      serviceCard.getAttribute('data-booking-specialist'),
      serviceCard.getAttribute('data-booking-service')
    );
  });
}
