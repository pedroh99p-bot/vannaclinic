'use strict';

import { client } from '../data/client.js';
import { quiz, quizIcons } from '../data/quiz.js';
import { buildWhatsAppLink } from './whatsapp.js';

export function initQuiz() {
  var quizBox = document.querySelector('.quiz-box');
  if (!quizBox) return;

  var answers = {};
  var currentBranch = null;
  var history = [quiz.step1.id];
  var isTransitioning = false;

  quizBox.setAttribute('aria-live', 'polite');
  quizBox.setAttribute('aria-atomic', 'true');

  function escapeHTML(value) {
    return String(value || '').replace(/[&<>"']/g, function(char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char];
    });
  }

  function isReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function getBranchSteps() {
    return currentBranch && quiz.branches[currentBranch] ? quiz.branches[currentBranch] : [];
  }

  function getTotalSteps() {
    if (currentBranch) return getBranchSteps().length + 1;

    var branchTotals = Object.keys(quiz.branches).map(function(key) {
      return quiz.branches[key].length + 1;
    });

    return Math.max.apply(null, branchTotals);
  }

  function getActiveStepIds() {
    return [quiz.step1.id].concat(getBranchSteps().map(function(step) {
      return step.id;
    }));
  }

  function getStepById(stepId) {
    if (stepId === quiz.step1.id) return quiz.step1;

    return getBranchSteps().find(function(step) {
      return step.id === stepId;
    });
  }

  function getStepPosition(stepId) {
    var activeIds = getActiveStepIds();
    var index = activeIds.indexOf(stepId);
    return index >= 0 ? index + 1 : 1;
  }

  function getAnswerLabel(stepId) {
    return answers[stepId] ? answers[stepId].label : '';
  }

  function buildProgressHTML(stepNum, total) {
    var safeTotal = Math.max(1, Number(total) || 1);
    var safeStep = Math.min(safeTotal, Math.max(1, Number(stepNum) || 1));
    var percent = Math.round((safeStep / safeTotal) * 100);

    return [
      '<div class="quiz-progress-header">',
      '  <span class="quiz-step-counter">Passo ' + safeStep + ' de ' + safeTotal + '</span>',
      '  <div class="quiz-progress" role="progressbar" aria-label="Progresso do pré-atendimento" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + percent + '">',
      '    <div class="quiz-progress-bar" id="quiz-progress-bar" style="width:' + percent + '%"></div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function buildOptionHTML(opt, step) {
    var selected = getAnswerLabel(step.id) === opt.label;
    var svgIcon = quizIcons[opt.icon] || '';
    var classes = selected ? 'quiz-option selected' : 'quiz-option';

    return [
      '<button type="button" class="' + classes + '" data-step="' + step.id + '" data-label="' + escapeHTML(opt.label) + '" data-branch="' + escapeHTML(opt.branch || '') + '" aria-pressed="' + (selected ? 'true' : 'false') + '">',
      '  <span class="quiz-option-icon">' + svgIcon + '</span>',
      '  <span class="quiz-option-copy">',
      '    <strong>' + escapeHTML(opt.label) + '</strong>',
      '    <small>' + escapeHTML(opt.sublabel) + '</small>',
      '  </span>',
      '</button>'
    ].join('\n');
  }

  function buildStepHTML(step) {
    var total = getTotalSteps();
    var stepNum = getStepPosition(step.id);
    var optionsHtml = step.options.map(function(opt) {
      return buildOptionHTML(opt, step);
    }).join('\n');
    var journeyClass = step.id === quiz.step1.id ? ' quiz-options--journey' : '';
    var showBack = history.length > 1;

    return [
      buildProgressHTML(stepNum, total),
      '<div class="quiz-step active" id="quiz-step-' + step.id + '">',
      '  <h3 class="quiz-question" tabindex="-1">' + escapeHTML(step.question) + '</h3>',
      '  <div class="quiz-options' + journeyClass + '">',
      optionsHtml,
      '  </div>',
      showBack ? '<div class="quiz-nav"><button type="button" class="btn btn-outline quiz-back">Voltar</button></div>' : '',
      '</div>'
    ].join('\n');
  }

  function buildSummaryItems() {
    var items = [];

    if (answers[quiz.step1.id]) {
      items.push({
        label: quiz.step1.summaryLabel || 'Serviço selecionado',
        value: answers[quiz.step1.id].label
      });
    }

    getBranchSteps().forEach(function(step) {
      if (!answers[step.id]) return;
      items.push({
        label: step.summaryLabel || step.question,
        value: answers[step.id].label
      });
    });

    return items;
  }

  function buildResultHTML() {
    var total = getTotalSteps();
    var summaryHtml = buildSummaryItems().map(function(item) {
      return [
        '<div class="quiz-summary-item">',
        '  <strong>' + escapeHTML(item.label) + '</strong>',
        '  <span>' + escapeHTML(item.value) + '</span>',
        '</div>'
      ].join('\n');
    }).join('\n');

    return [
      buildProgressHTML(total, total),
      '<div class="quiz-result active" id="quiz-result">',
      '  <div class="quiz-result-icon">' + (quizIcons[quiz.result.icon] || '') + '</div>',
      '  <h3 id="quiz-result-title" tabindex="-1">' + escapeHTML(quiz.result.title) + '</h3>',
      '  <p id="quiz-result-desc">' + escapeHTML(quiz.result.desc) + '</p>',
      '  <div class="quiz-summary">',
      summaryHtml,
      '  </div>',
      '  <div class="quiz-actions">',
      '    <a href="#" id="quiz-result-wa" class="btn btn-whatsapp" target="_blank" rel="noopener">' + escapeHTML(quiz.result.whatsappCta) + '</a>',
      '    <button type="button" id="quiz-restart" class="btn btn-outline">' + escapeHTML(quiz.result.restartCta) + '</button>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function buildQuizMessage() {
    var service = answers[quiz.step1.id] ? answers[quiz.step1.id].label : 'Não informado';
    var summaryLines = buildSummaryItems()
      .filter(function(item) { return item.label !== (quiz.step1.summaryLabel || 'Serviço selecionado'); })
      .map(function(item) { return '• ' + item.label + ': ' + item.value; });

    return [
      'Olá! Concluí o pré-atendimento da ' + client.branding.name + '.',
      '',
      'Serviço selecionado: ' + service,
      '',
      'Resumo do pré-atendimento:',
      summaryLines.length ? summaryLines.join('\n') : '• Nenhuma resposta adicional informada.'
    ].join('\n');
  }

  function resolveDestination() {
    return currentBranch === 'cilios' ? 'cilios' : 'estetica';
  }

  function scrollToQuiz() {
    var nav = document.getElementById('navbar');
    var offset = nav ? nav.getBoundingClientRect().height + 14 : 14;
    var y = quizBox.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: Math.max(0, y), behavior: isReducedMotion() ? 'auto' : 'smooth' });
  }

  function focusCurrentTitle(selector) {
    var title = quizBox.querySelector(selector || '.quiz-question');
    if (title) title.focus({ preventScroll: true });
  }

  function renderView(html, options) {
    var opts = options || {};
    var animate = opts.animate !== false && !isReducedMotion();
    var previousHeight = quizBox.offsetHeight;

    quizBox.classList.add('is-locked');
    if (animate && previousHeight) {
      quizBox.style.minHeight = previousHeight + 'px';
      quizBox.classList.add('quiz-box--leaving');
    }

    window.setTimeout(function() {
      quizBox.innerHTML = html;
      bindControls();
      if (typeof opts.afterRender === 'function') opts.afterRender();

      window.requestAnimationFrame(function() {
        quizBox.classList.remove('quiz-box--leaving');
        if (animate) quizBox.classList.add('quiz-box--entering');
        if (opts.shouldScroll) scrollToQuiz();
        if (opts.shouldFocus) focusCurrentTitle(opts.focusSelector);

        window.setTimeout(function() {
          quizBox.classList.remove('quiz-box--entering', 'is-locked');
          quizBox.style.minHeight = '';
          isTransitioning = false;
        }, animate ? 260 : 0);
      });
    }, animate ? 160 : 0);
  }

  function renderStep(step, options) {
    renderView(buildStepHTML(step), Object.assign({ shouldFocus: true, focusSelector: '.quiz-question' }, options));
  }

  function renderResult(options) {
    history = getActiveStepIds();
    renderView(buildResultHTML(), Object.assign({
      shouldFocus: true,
      focusSelector: '#quiz-result-title',
      afterRender: function() {
        var waLink = document.getElementById('quiz-result-wa');
        if (waLink) waLink.href = buildWhatsAppLink(buildQuizMessage(), resolveDestination());

        var restartBtn = document.getElementById('quiz-restart');
        if (restartBtn) {
          restartBtn.addEventListener('click', function() {
            if (isTransitioning) return;
            answers = {};
            currentBranch = null;
            history = [quiz.step1.id];
            isTransitioning = true;
            renderStep(quiz.step1, { animate: true, shouldScroll: true });
          });
        }

        if (window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('track_quiz_completed', { detail: { answers: answers, branch: currentBranch } }));
        }
      }
    }, options));
  }

  function pruneFutureAnswers(stepId) {
    var activeIds = getActiveStepIds();
    var currentIndex = activeIds.indexOf(stepId);
    if (currentIndex < 0) return;

    activeIds.slice(currentIndex + 1).forEach(function(id) {
      delete answers[id];
    });
    history = activeIds.slice(0, currentIndex + 1);
  }

  function saveAnswer(step, label, branch) {
    answers[step.id] = {
      label: label,
      answerKey: step.answerKey || ('step_' + step.id),
      summaryLabel: step.summaryLabel || step.question,
      branch: step.id === quiz.step1.id ? branch : currentBranch
    };
  }

  function advanceFromStep(step, label, branch) {
    saveAnswer(step, label, branch);

    if (step.id === quiz.step1.id) {
      if (currentBranch !== branch) {
        Object.keys(answers).forEach(function(key) {
          if (String(key) !== String(quiz.step1.id)) delete answers[key];
        });
      }

      currentBranch = branch || currentBranch || 'estetica';
      history = [quiz.step1.id];

      var firstBranchStep = getBranchSteps()[0];
      if (firstBranchStep) {
        history.push(firstBranchStep.id);
        renderStep(firstBranchStep, { animate: true, shouldScroll: true });
      } else {
        renderResult({ animate: true, shouldScroll: true });
      }
      return;
    }

    pruneFutureAnswers(step.id);

    var activeIds = getActiveStepIds();
    var currentIndex = activeIds.indexOf(step.id);
    var nextId = activeIds[currentIndex + 1];
    var nextStep = nextId ? getStepById(nextId) : null;

    if (nextStep) {
      history.push(nextStep.id);
      renderStep(nextStep, { animate: true, shouldScroll: true });
    } else {
      renderResult({ animate: true, shouldScroll: true });
    }
  }

  function handleOptionClick(event) {
    if (isTransitioning) return;

    var button = event.currentTarget;
    var stepId = Number(button.getAttribute('data-step'));
    var step = getStepById(stepId);
    if (!step) return;

    var label = button.getAttribute('data-label');
    var branch = button.getAttribute('data-branch');
    isTransitioning = true;
    quizBox.classList.add('is-locked');

    var siblings = button.closest('.quiz-options');
    if (siblings) {
      siblings.querySelectorAll('.quiz-option').forEach(function(item) {
        item.classList.remove('selected');
        item.setAttribute('aria-pressed', 'false');
      });
    }
    button.classList.add('selected');
    button.setAttribute('aria-pressed', 'true');

    window.setTimeout(function() {
      advanceFromStep(step, label, branch);
    }, isReducedMotion() ? 0 : 180);
  }

  function handleBackClick() {
    if (isTransitioning || history.length <= 1) return;

    isTransitioning = true;
    history.pop();

    var previousStep = getStepById(history[history.length - 1]) || quiz.step1;
    renderStep(previousStep, { animate: true, shouldScroll: true });
  }

  function bindControls() {
    quizBox.querySelectorAll('.quiz-option').forEach(function(btn) {
      btn.addEventListener('click', handleOptionClick);
    });

    var backButton = quizBox.querySelector('.quiz-back');
    if (backButton) backButton.addEventListener('click', handleBackClick);
  }

  renderStep(quiz.step1, { animate: false, shouldFocus: false, shouldScroll: false });
}
