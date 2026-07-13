'use strict';

import { client } from '../data/client.js';
import { quiz, quizIcons } from '../data/quiz.js';
import { buildWhatsAppLink } from './whatsapp.js';

export function initQuiz() {
  var quizBox = document.querySelector('.quiz-box');
  if (!quizBox) return;

  var answers = {};
  var steps = quiz.steps;
  var totalSteps = steps.length;

  function renderQuizStructure() {
    var progressHtml = '<div class="quiz-progress"><div class="quiz-progress-bar" id="quiz-progress-bar"></div></div>';
    
    var stepsHtml = steps.map(function(step, index) {
      var isActive = index === 0 ? ' active' : '';
      var optionsHtml = step.options.map(function(opt) {
        var svgIcon = quizIcons[opt.icon] || '';
        return [
          '<button type="button" class="quiz-option" data-step="' + step.id + '" data-label="' + opt.label + '" aria-pressed="false">',
          '  <span class="quiz-option-icon">' + svgIcon + '</span>',
          '  <span class="quiz-option-copy">',
          '    <strong>' + opt.label + '</strong>',
          '    <small>' + opt.sublabel + '</small>',
          '  </span>',
          '</button>'
        ].join('\n');
      }).join('\n');

      return [
        '<div class="quiz-step' + isActive + '" id="quiz-step-' + step.id + '">',
        '  <h3 class="quiz-question">' + step.question + '</h3>',
        '  <div class="quiz-options">',
        optionsHtml,
        '  </div>',
        '</div>'
      ].join('\n');
    }).join('\n');

    var resultHtml = [
      '<div class="quiz-result" id="quiz-result">',
      '  <div class="quiz-result-icon">' + (quizIcons[quiz.result.icon] || '') + '</div>',
      '  <h3 id="quiz-result-title">' + quiz.result.title + '</h3>',
      '  <p id="quiz-result-desc">' + quiz.result.desc + '</p>',
      '  <div class="quiz-summary">',
      '    <div class="quiz-summary-item">',
      '      <strong>' + quiz.result.summaryGoalLabel + '</strong>',
      '      <span id="quiz-summary-goal">' + quiz.result.summaryGoalDefault + '</span>',
      '    </div>',
      '    <div class="quiz-summary-item">',
      '      <strong>' + quiz.result.summaryRegionLabel + '</strong>',
      '      <span id="quiz-summary-region">' + quiz.result.summaryRegionDefault + '</span>',
      '    </div>',
      '    <div class="quiz-summary-item">',
      '      <strong>' + quiz.result.summaryPreferenceLabel + '</strong>',
      '      <span id="quiz-summary-preference">' + quiz.result.summaryPreferenceDefault + '</span>',
      '    </div>',
      '  </div>',
      '  <div class="quiz-actions">',
      '    <a href="#" id="quiz-result-wa" class="btn btn-whatsapp" target="_blank" rel="noopener">' + quiz.result.whatsappCta + '</a>',
      '    <button type="button" id="quiz-restart" class="btn btn-outline">' + quiz.result.restartCta + '</button>',
      '  </div>',
      '</div>'
    ].join('\n');

    quizBox.innerHTML = progressHtml + stepsHtml + resultHtml;
  }

  renderQuizStructure();

  var progressBar = document.getElementById('quiz-progress-bar');
  var resultBox = document.getElementById('quiz-result');
  var resultLink = document.getElementById('quiz-result-wa');
  var restartButton = document.getElementById('quiz-restart');
  var summaryGoal = document.getElementById('quiz-summary-goal');
  var summaryRegion = document.getElementById('quiz-summary-region');
  var summaryPreference = document.getElementById('quiz-summary-preference');

  function showStep(step) {
    quizBox.querySelectorAll('.quiz-step').forEach(function(el) {
      el.classList.remove('active');
    });
    var target = document.getElementById('quiz-step-' + step);
    if (target) target.classList.add('active');
    if (resultBox) resultBox.classList.remove('active');
    if (progressBar) progressBar.style.width = Math.round((step / totalSteps) * 100) + '%';
  }

  function buildQuizMessage() {
    return [
      'Olá, vim pelo site da ' + client.branding.name + ' e quero um pré-atendimento.',
      'Meu principal objetivo é: ' + (answers[1] || 'Ainda não defini.') + '.',
      'A região/necessidade principal é: ' + (answers[2] || 'Ainda não sei.') + '.',
      'Minha preferência agora é: ' + (answers[3] || 'Receber indicação do melhor protocolo.') + '.',
      'Pode me orientar sobre o cuidado mais indicado e os horários disponíveis?'
    ].join('\n');
  }

  function showResult() {
    quizBox.querySelectorAll('.quiz-step').forEach(function(el) {
      el.classList.remove('active');
    });
    if (progressBar) progressBar.style.width = '100%';
    if (summaryGoal) summaryGoal.textContent = answers[1] || quiz.result.summaryGoalDefault;
    if (summaryRegion) summaryRegion.textContent = answers[2] || quiz.result.summaryRegionDefault;
    if (summaryPreference) summaryPreference.textContent = answers[3] || quiz.result.summaryPreferenceDefault;
    if (resultBox) resultBox.classList.add('active');
    if (resultLink) resultLink.href = buildWhatsAppLink(buildQuizMessage());

    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('track_quiz_completed', { detail: { answers: answers } }));
    }
  }

  quizBox.addEventListener('click', function(e) {
    var button = e.target.closest('.quiz-option');
    if (!button) return;

    var step = parseInt(button.getAttribute('data-step'), 10);
    answers[step] = button.getAttribute('data-label');
    
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
      if (step < totalSteps) {
        showStep(step + 1);
      } else {
        showResult();
      }
    }, 220);
  });

  if (restartButton) {
    restartButton.addEventListener('click', function() {
      answers = {};
      quizBox.querySelectorAll('.quiz-option').forEach(function(button) {
        button.classList.remove('selected');
        button.setAttribute('aria-pressed', 'false');
      });
      showStep(1);
    });
  }

  showStep(1);
}
