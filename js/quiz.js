'use strict';

import { client } from '../data/client.js';
import { quiz, quizIcons } from '../data/quiz.js';
import { buildWhatsAppLink } from './whatsapp.js';

export function initQuiz() {
  var quizBox = document.querySelector('.quiz-box');
  if (!quizBox) return;

  var answers = {};
  var currentBranch = null; // 'estetica' | 'cilios'
  var branchSteps = [];
  var totalBranchSteps = 0;
  var currentStepIndex = 0; // index within branchSteps (0-based), -1 = step1

  // ── Helpers ──────────────────────────────────────────────────────────────
  function starSVG() {
    return '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor"><path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 17.8l-6.2 3.3 1.2-6.9-5-4.9 6.9-1z"/></svg>';
  }

  function buildProgressHTML(stepNum, total) {
    return [
      '<div class="quiz-progress-header">',
      '  <span class="quiz-step-counter">Passo ' + stepNum + ' de ' + total + '</span>',
      '  <div class="quiz-progress"><div class="quiz-progress-bar" id="quiz-progress-bar" style="width:' + Math.round((stepNum / total) * 100) + '%"></div></div>',
      '</div>'
    ].join('\n');
  }

  function buildOptionHTML(opt, stepId) {
    var svgIcon = quizIcons[opt.icon] || '';
    return [
      '<button type="button" class="quiz-option" data-step="' + stepId + '" data-label="' + opt.label + '" data-branch="' + (opt.branch || '') + '" aria-pressed="false">',
      '  <span class="quiz-option-icon">' + svgIcon + '</span>',
      '  <span class="quiz-option-copy">',
      '    <strong>' + opt.label + '</strong>',
      '    <small>' + opt.sublabel + '</small>',
      '  </span>',
      '</button>'
    ].join('\n');
  }

  function buildStepHTML(step, stepNum, total) {
    var optionsHtml = step.options.map(function(opt) {
      return buildOptionHTML(opt, step.id);
    }).join('\n');
    return [
      buildProgressHTML(stepNum, total),
      '<div class="quiz-step active" id="quiz-step-' + step.id + '">',
      '  <h3 class="quiz-question">' + step.question + '</h3>',
      '  <div class="quiz-options">',
      optionsHtml,
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function buildResultHTML() {
    return [
      buildProgressHTML(totalBranchSteps + 1, totalBranchSteps + 1),
      '<div class="quiz-result active" id="quiz-result">',
      '  <div class="quiz-result-icon">' + (quizIcons[quiz.result.icon] || '') + '</div>',
      '  <h3 id="quiz-result-title">' + quiz.result.title + '</h3>',
      '  <p id="quiz-result-desc">' + quiz.result.desc + '</p>',
      '  <div class="quiz-summary">',
      '    <div class="quiz-summary-item"><strong>' + quiz.result.summaryGoalLabel + '</strong><span id="quiz-summary-goal">' + quiz.result.summaryGoalDefault + '</span></div>',
      '    <div class="quiz-summary-item"><strong>' + quiz.result.summaryRegionLabel + '</strong><span id="quiz-summary-region">' + quiz.result.summaryRegionDefault + '</span></div>',
      '    <div class="quiz-summary-item"><strong>' + quiz.result.summaryPreferenceLabel + '</strong><span id="quiz-summary-preference">' + quiz.result.summaryPreferenceDefault + '</span></div>',
      '  </div>',
      '  <div class="quiz-actions">',
      '    <a href="#" id="quiz-result-wa" class="btn btn-whatsapp" target="_blank" rel="noopener">' + quiz.result.whatsappCta + '</a>',
      '    <button type="button" id="quiz-restart" class="btn btn-outline">' + quiz.result.restartCta + '</button>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function buildQuizMessage() {
    var journey = answers[1] || 'Não informado';
    var detail = answers[2] || 'Não informado';
    var timing = answers[3] || answers[4] || 'Não informado';
    return [
      'Olá, vim pelo site da ' + client.branding.name + ' e quero um pré-atendimento.',
      'Jornada escolhida: ' + journey + '.',
      'Resultado desejado: ' + detail + '.',
      'Prazo para realização: ' + timing + '.',
      'Pode me orientar sobre o protocolo mais indicado?'
    ].join('\n');
  }

  function resolveSpecialist() {
    return currentBranch === 'cilios' ? 'erica' : 'analucia';
  }

  // ── Render Step 1 ────────────────────────────────────────────────────────
  function renderStep1() {
    var total = 1; // total unknown until branch selected; show step 1 of at least 1
    var optionsHtml = quiz.step1.options.map(function(opt) {
      return buildOptionHTML(opt, quiz.step1.id);
    }).join('\n');

    quizBox.innerHTML = [
      buildProgressHTML(1, '?'),
      '<div class="quiz-step active" id="quiz-step-1">',
      '  <h3 class="quiz-question">' + quiz.step1.question + '</h3>',
      '  <div class="quiz-options quiz-options--journey">',
      optionsHtml,
      '  </div>',
      '</div>'
    ].join('\n');

    bindOptions();
  }

  // ── Render a branch step ─────────────────────────────────────────────────
  function renderBranchStep(idx) {
    var step = branchSteps[idx];
    var stepNum = idx + 2; // step 1 was the journey selector
    var total = totalBranchSteps + 1;
    quizBox.innerHTML = buildStepHTML(step, stepNum, total);
    bindOptions();
  }

  // ── Render result ────────────────────────────────────────────────────────
  function renderResult() {
    quizBox.innerHTML = buildResultHTML();

    var goal = document.getElementById('quiz-summary-goal');
    var region = document.getElementById('quiz-summary-region');
    var pref = document.getElementById('quiz-summary-preference');
    if (goal) goal.textContent = answers[1] || quiz.result.summaryGoalDefault;
    if (region) region.textContent = answers[2] || quiz.result.summaryRegionDefault;
    if (pref) pref.textContent = answers[3] || answers[4] || quiz.result.summaryPreferenceDefault;

    var waLink = document.getElementById('quiz-result-wa');
    if (waLink) waLink.href = buildWhatsAppLink(buildQuizMessage(), resolveSpecialist());

    var restartBtn = document.getElementById('quiz-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', function() {
        answers = {};
        currentBranch = null;
        branchSteps = [];
        totalBranchSteps = 0;
        currentStepIndex = -1;
        renderStep1();
      });
    }

    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('track_quiz_completed', { detail: { answers: answers, branch: currentBranch } }));
    }
  }

  // ── Bind click events (called after each render) ─────────────────────────
  function bindOptions() {
    quizBox.querySelectorAll('.quiz-option').forEach(function(btn) {
      btn.addEventListener('click', handleOptionClick);
    });
  }

  function handleOptionClick(e) {
    var button = e.currentTarget;
    var step = parseInt(button.getAttribute('data-step'), 10);
    var label = button.getAttribute('data-label');
    var branch = button.getAttribute('data-branch');

    answers[step] = label;

    // Visual feedback
    var siblings = button.closest('.quiz-options');
    if (siblings) {
      siblings.querySelectorAll('.quiz-option').forEach(function(item) {
        item.classList.remove('selected');
        item.setAttribute('aria-pressed', 'false');
      });
    }
    button.classList.add('selected');
    button.setAttribute('aria-pressed', 'true');

    setTimeout(function() {
      if (step === 1) {
        // Branch selection
        currentBranch = branch || (label === 'Cílios e Sobrancelhas' ? 'cilios' : 'estetica');
        branchSteps = quiz.branches[currentBranch] || [];
        totalBranchSteps = branchSteps.length;
        currentStepIndex = 0;
        if (branchSteps.length > 0) {
          renderBranchStep(0);
        } else {
          renderResult();
        }
      } else {
        // Advance within branch
        currentStepIndex++;
        if (currentStepIndex < branchSteps.length) {
          renderBranchStep(currentStepIndex);
        } else {
          renderResult();
        }
      }
    }, 220);
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  currentStepIndex = -1;
  renderStep1();
}
