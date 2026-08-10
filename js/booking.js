'use strict';

import { services } from '../data/services.js';
import { quizIcons } from '../data/quiz.js';
import { buildWhatsAppLink } from './whatsapp.js';

var bookingRoot = null;
var bookingDialog = null;
var bookingDialogContent = null;
var bookingState = createInitialState();

var bookingSteps = [
  { label: 'Procedimento', title: 'Escolha o procedimento', description: 'Selecione o cuidado que mais combina com o que você procura.' },
  { label: 'Data e hora', title: 'Defina sua preferência', description: 'Informe o melhor dia e horário para o seu atendimento.' },
  { label: 'Seus dados', title: 'Como podemos chamar você?', description: 'Precisamos apenas do seu nome para identificar a solicitação.' },
  { label: 'Confirmação', title: 'Confirme seu agendamento', description: 'Revise os dados antes de continuar para o WhatsApp.' }
];

function createInitialState() {
  return {
    step: 1,
    specialist: '',
    service: '',
    date: '',
    time: '',
    name: ''
  };
}

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

function getSelectedService() {
  return getServices(bookingState.specialist).find(function(item) {
    return item.title === bookingState.service;
  });
}

function getCategoryIcon(key) {
  return key === 'cilios' ? quizIcons.cilios : quizIcons.syringe;
}

function getServiceIcon(item) {
  return quizIcons[item && item.icon] || quizIcons.sparkles;
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
  var formatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function renderLauncher() {
  bookingRoot.innerHTML = [
    '<div class="booking-launch-grid" aria-label="Escolha a área do atendimento">',
    getBookingCategories().map(function(category) {
      return [
        '<button type="button" class="booking-launch-card" data-booking-open="' + escapeHTML(category.specialistKey) + '">',
        '  <span class="booking-launch-icon">' + getCategoryIcon(category.specialistKey) + '</span>',
        '  <span class="booking-launch-title">' + escapeHTML(category.name) + '</span>',
        '  <span class="booking-launch-action" aria-hidden="true">Começar <span>→</span></span>',
        '</button>'
      ].join('\n');
    }).join('\n'),
    '</div>',
    '<p class="booking-launch-note">Procedimento, data e horário em quatro etapas rápidas.</p>'
  ].join('\n');
}

function renderProgress() {
  return [
    '<ol class="booking-progress" aria-label="Etapas do agendamento">',
    bookingSteps.map(function(step, index) {
      var number = index + 1;
      var className = number === bookingState.step ? ' is-current' : '';
      if (number < bookingState.step) className += ' is-complete';
      return [
        '<li class="' + className.trim() + '"' + (number === bookingState.step ? ' aria-current="step"' : '') + '>',
        '  <span>' + (number < bookingState.step ? '✓' : number) + '</span>',
        '  <small>' + escapeHTML(step.label) + '</small>',
        '</li>'
      ].join('\n');
    }).join('\n'),
    '</ol>'
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
      '<button type="button" class="booking-service-option' + (active ? ' is-selected' : '') + '"',
      ' data-booking-choice-service="' + escapeHTML(item.title) + '" aria-pressed="' + active + '">',
      '  <span class="booking-service-icon">' + getServiceIcon(item) + '</span>',
      '  <span class="booking-service-copy">',
      '    <strong>' + escapeHTML(item.title) + '</strong>',
      '    <small>' + escapeHTML(item.description) + '</small>',
      '  </span>',
      item.badge ? '  <em>' + escapeHTML(item.badge) + '</em>' : '',
      '</button>'
    ].join('\n');
  }).join('\n');
}

function renderSelectionStrip(category, service) {
  return [
    '<div class="booking-selection-strip">',
    '  <span class="booking-selection-icon">' + getServiceIcon(service) + '</span>',
    '  <span><small>' + escapeHTML(category.name) + '</small><strong>' + escapeHTML(service.title) + '</strong></span>',
    '</div>'
  ].join('\n');
}

function renderStep(category) {
  var service = getSelectedService();

  if (bookingState.step === 1) {
    return [
      '<section class="booking-step-panel" aria-labelledby="booking-step-title">',
      '  <div class="booking-area-switch" aria-label="Área do atendimento">' + renderAreaSwitch() + '</div>',
      '  <div class="booking-service-grid">' + renderProcedures() + '</div>',
      '</section>'
    ].join('\n');
  }

  if (bookingState.step === 2) {
    return [
      '<section class="booking-step-panel" aria-labelledby="booking-step-title">',
      renderSelectionStrip(category, service),
      '  <div class="booking-date-grid">',
      '    <label><span>Data preferida</span><input type="date" name="booking-date" min="' + getToday() + '" value="' + escapeHTML(bookingState.date) + '" required></label>',
      '    <label><span>Horário preferido</span><input type="time" name="booking-time" step="1800" value="' + escapeHTML(bookingState.time) + '" required></label>',
      '  </div>',
      '  <p class="booking-field-note">A disponibilidade será confirmada pelo WhatsApp.</p>',
      '</section>'
    ].join('\n');
  }

  if (bookingState.step === 3) {
    return [
      '<section class="booking-step-panel" aria-labelledby="booking-step-title">',
      renderSelectionStrip(category, service),
      '  <label class="booking-name-field">',
      '    <span>Seu nome</span>',
      '    <input type="text" name="booking-name" autocomplete="name" minlength="2" maxlength="80" value="' + escapeHTML(bookingState.name) + '" placeholder="Digite seu nome" required>',
      '    <small>Usaremos esse nome apenas para identificar seu atendimento.</small>',
      '  </label>',
      '</section>'
    ].join('\n');
  }

  return [
    '<section class="booking-step-panel booking-step-panel--review" aria-labelledby="booking-step-title">',
    '  <dl class="booking-review">',
    '    <div><dt>' + quizIcons.message + '<span>Nome</span></dt><dd>' + escapeHTML(bookingState.name) + '</dd></div>',
    '    <div><dt>' + getServiceIcon(service) + '<span>Procedimento</span></dt><dd>' + escapeHTML(service.title) + '</dd></div>',
    '    <div><dt>' + quizIcons.calendar + '<span>Data</span></dt><dd>' + escapeHTML(formatDate(bookingState.date)) + '</dd></div>',
    '    <div><dt>' + quizIcons.clock + '<span>Horário</span></dt><dd>' + escapeHTML(bookingState.time) + '</dd></div>',
    '  </dl>',
    '  <div class="booking-professional">',
    '    <span class="booking-professional-icon">' + getCategoryIcon(category.specialistKey) + '</span>',
    '    <span><small>Profissional responsável</small><strong>' + escapeHTML(category.specialist) + '</strong><em>' + escapeHTML(category.name) + '</em></span>',
    '  </div>',
    '  <p class="booking-confirmation-note">Ao confirmar, abriremos o WhatsApp com estas informações preenchidas.</p>',
    '</section>'
  ].join('\n');
}

function renderActions() {
  var isFirst = bookingState.step === 1;
  var isLast = bookingState.step === bookingSteps.length;
  var canContinue = bookingState.step !== 1 || Boolean(bookingState.service);

  return [
    '<div class="booking-dialog-actions">',
    isFirst ? '<span></span>' : '<button type="button" class="booking-back-button" data-booking-back><span aria-hidden="true">←</span> Voltar</button>',
    isLast
      ? '<button type="submit" class="btn btn-whatsapp booking-confirm-button">Confirmar pelo WhatsApp</button>'
      : '<button type="button" class="btn booking-next-button" data-booking-next' + (canContinue ? '' : ' disabled') + '>Continuar <span aria-hidden="true">→</span></button>',
    '</div>',
    '<p class="booking-feedback" id="booking-feedback" role="status" aria-live="polite"></p>'
  ].join('\n');
}

function renderDialog() {
  if (!bookingDialogContent) return;

  var category = getCategory(bookingState.specialist);
  var stepCopy = bookingSteps[bookingState.step - 1];
  if (!category || !stepCopy) return;

  bookingDialogContent.innerHTML = [
    '<form class="booking-flow-form" id="booking-form">',
    '  <header class="booking-dialog-header">',
    '    <span class="booking-dialog-eyebrow">Agendamento · ' + bookingState.step + ' de ' + bookingSteps.length + '</span>',
    '    <h3 id="booking-dialog-title">' + escapeHTML(stepCopy.title) + '</h3>',
    '    <p>' + escapeHTML(stepCopy.description) + '</p>',
    '  </header>',
    renderProgress(),
    '  <div class="booking-dialog-body">' + renderStep(category) + '</div>',
    renderActions(),
    '</form>'
  ].join('\n');
}

function focusStep() {
  window.requestAnimationFrame(function() {
    var selectors = {
      1: '[data-booking-choice-service]',
      2: '[name="booking-date"]',
      3: '[name="booking-name"]',
      4: '.booking-confirm-button'
    };
    var target = bookingDialogContent.querySelector(selectors[bookingState.step]);
    if (target) target.focus({ preventScroll: true });
  });
}

function showFeedback(message) {
  var feedback = bookingDialogContent.querySelector('#booking-feedback');
  if (feedback) feedback.textContent = message || '';
}

function syncVisibleFields() {
  var dateInput = bookingDialogContent.querySelector('[name="booking-date"]');
  var timeInput = bookingDialogContent.querySelector('[name="booking-time"]');
  var nameInput = bookingDialogContent.querySelector('[name="booking-name"]');
  if (dateInput) bookingState.date = dateInput.value;
  if (timeInput) bookingState.time = timeInput.value;
  if (nameInput) bookingState.name = nameInput.value.trim();
}

function validateCurrentStep() {
  syncVisibleFields();

  if (bookingState.step === 1 && !bookingState.service) {
    showFeedback('Escolha um procedimento para continuar.');
    return false;
  }

  if (bookingState.step === 2) {
    var dateInput = bookingDialogContent.querySelector('[name="booking-date"]');
    var timeInput = bookingDialogContent.querySelector('[name="booking-time"]');
    if (!dateInput.reportValidity() || !timeInput.reportValidity()) return false;
    if (bookingState.date < getToday()) {
      showFeedback('Escolha uma data a partir de hoje.');
      return false;
    }
  }

  if (bookingState.step === 3) {
    var nameInput = bookingDialogContent.querySelector('[name="booking-name"]');
    if (bookingState.name.length < 2) {
      nameInput.setCustomValidity('Informe seu nome para continuar.');
      nameInput.reportValidity();
      nameInput.setCustomValidity('');
      return false;
    }
  }

  return true;
}

function openBooking(specialist, service) {
  bookingState = createInitialState();
  bookingState.specialist = specialist;
  bookingState.service = service || '';
  bookingState.step = service ? 2 : 1;
  renderDialog();
  if (!bookingDialog.open) bookingDialog.showModal();
  focusStep();
}

function selectArea(key) {
  bookingState.specialist = key;
  bookingState.service = '';
  bookingState.date = '';
  bookingState.time = '';
  renderDialog();
  focusStep();
}

function selectService(name) {
  bookingState.service = name;
  renderDialog();
  window.requestAnimationFrame(function() {
    var nextButton = bookingDialogContent.querySelector('[data-booking-next]');
    if (nextButton) nextButton.focus({ preventScroll: true });
  });
}

function goToStep(step) {
  bookingState.step = Math.max(1, Math.min(bookingSteps.length, step));
  renderDialog();
  focusStep();
}

function handleNext() {
  if (!validateCurrentStep()) return;
  goToStep(bookingState.step + 1);
}

function handleSubmit(event) {
  event.preventDefault();
  if (bookingState.step !== bookingSteps.length || !validateCurrentStep()) return;

  var category = getCategory(bookingState.specialist);
  if (!category) return;

  var message = [
    'Olá! Meu nome é ' + bookingState.name + ' e vim pelo site da Vanna Clinic.',
    '',
    'Gostaria de solicitar este agendamento:',
    'Área: ' + category.name,
    'Procedimento: ' + bookingState.service,
    'Data de preferência: ' + formatDate(bookingState.date),
    'Horário de preferência: ' + bookingState.time,
    'Profissional: ' + category.specialist,
    '',
    'Caso esse horário não esteja disponível, pode me sugerir uma opção próxima?'
  ].join('\n');

  showFeedback('Abrindo o WhatsApp com os dados do agendamento…');
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
    if (serviceButton) {
      selectService(serviceButton.getAttribute('data-booking-choice-service'));
      return;
    }

    if (event.target.closest('[data-booking-next]')) {
      handleNext();
      return;
    }

    if (event.target.closest('[data-booking-back]')) {
      syncVisibleFields();
      goToStep(bookingState.step - 1);
    }
  });

  bookingDialogContent.addEventListener('input', function(event) {
    if (event.target.name === 'booking-date') bookingState.date = event.target.value;
    if (event.target.name === 'booking-time') bookingState.time = event.target.value;
    if (event.target.name === 'booking-name') bookingState.name = event.target.value;
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
