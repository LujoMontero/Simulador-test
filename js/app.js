const VERCEL_URL = 'https://simulador-test-sage.vercel.app';
const AUTH_ENDPOINT = `${VERCEL_URL}/api/auth`;
const QUESTIONS_ENDPOINT = `${VERCEL_URL}/api/preguntas`;

const SECTIONS = [
  { id: 'matematica', name: 'Matemática básica', emoji: '🔢' },
  { id: 'series', name: 'Series y secuencias', emoji: '📈' },
  { id: 'refranes', name: 'Frases y refranes', emoji: '💬' },
  { id: 'conceptos', name: 'Conceptos y significados', emoji: '📚' },
  { id: 'sinonimos', name: 'Sinónimos y antónimos', emoji: '🔄' }
];

const DIFFICULTIES = [
  { key: 'easy', label: 'Fácil', count: 2, color: 'easy' },
  { key: 'medium', label: 'Intermedio', count: 2, color: 'medium' },
  { key: 'hard', label: 'Difícil', count: 1, color: 'hard' }
];

const TIME_PER_QUESTION = 60;

// ============================================
// ESTADO
// ============================================
let state = {
  token: localStorage.getItem('sim_token') || null,
  questions: [],
  currentIndex: 0,
  answers: [],
  timer: null,
  timeLeft: TIME_PER_QUESTION,
  stats: JSON.parse(localStorage.getItem('sim_stats') || '{"total":0,"sum":0}')
};

// ============================================
// DOM ELEMENTS
// ============================================
const screens = {
  login: document.getElementById('login-screen'),
  dashboard: document.getElementById('dashboard-screen'),
  loading: document.getElementById('loading-screen'),
  quiz: document.getElementById('quiz-screen'),
  results: document.getElementById('results-screen'),
  error: document.getElementById('error-screen')
};

const els = {
  loginForm: document.getElementById('login-form'),
  passwordInput: document.getElementById('password-input'),
  loginError: document.getElementById('login-error'),
  logoutBtn: document.getElementById('logout-btn'),
  startBtn: document.getElementById('start-btn'),
  progressFill: document.getElementById('progress-fill'),
  currentSection: document.getElementById('current-section'),
  currentDiff: document.getElementById('current-diff'),
  timer: document.getElementById('timer'),
  trackFill: document.getElementById('track-fill'),
  questionCounter: document.getElementById('question-counter'),
  questionText: document.getElementById('question-text'),
  optionsContainer: document.getElementById('options-container'),
  nextBtn: document.getElementById('next-btn'),
  finalScore: document.getElementById('final-score'),
  finalPercent: document.getElementById('final-percent'),
  breakdownContainer: document.getElementById('breakdown-container'),
  retryBtn: document.getElementById('retry-btn'),
  homeBtn: document.getElementById('home-btn'),
  errorMsg: document.getElementById('error-msg'),
  errorRetry: document.getElementById('error-retry'),
  errorHome: document.getElementById('error-home'),
  statTotal: document.getElementById('stat-total'),
  statAvg: document.getElementById('stat-avg')
};

// ============================================
// NAVEGACIÓN
// ============================================
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ============================================
// AUTH
// ============================================
async function login(password) {
  try {
    const res = await fetch(AUTH_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (data.success) {
      state.token = data.token;
      localStorage.setItem('sim_token', data.token);
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

function logout() {
  state.token = null;
  localStorage.removeItem('sim_token');
  showScreen('login');
}

function isAuthenticated() {
  return !!state.token;
}

// ============================================
// DASHBOARD
// ============================================
function updateStats() {
  els.statTotal.textContent = state.stats.total;
  const avg = state.stats.total > 0 ? Math.round(state.stats.sum / state.stats.total) : 0;
  els.statAvg.textContent = avg + '%';
}

// ============================================
// GENERAR PREGUNTAS
// ============================================
async function generateQuestions() {
  showScreen('loading');
  els.progressFill.style.width = '10%';

  try {
    const res = await fetch(QUESTIONS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      }
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}`);
    }

    const data = await res.json();
    if (!data.questions || !Array.isArray(data.questions)) throw new Error('Formato inválido');

    state.questions = data.questions;
    state.currentIndex = 0;
    state.answers = [];
    els.progressFill.style.width = '100%';

    setTimeout(() => startQuiz(), 300);
  } catch (e) {
    console.error(e);
    els.errorMsg.textContent = e.message || 'No se pudieron generar las preguntas. Verifica tu conexión o intenta más tarde.';
    showScreen('error');
  }
}

// ============================================
// QUIZ
// ============================================
function startQuiz() {
  showScreen('quiz');
  renderQuestion();
}

function getCurrentQuestion() {
  return state.questions[state.currentIndex];
}

function renderQuestion() {
  const q = getCurrentQuestion();
  const section = SECTIONS.find(s => s.id === q.section) || SECTIONS[0];
  const diff = DIFFICULTIES.find(d => d.key === q.difficulty) || DIFFICULTIES[0];

  els.currentSection.textContent = `${section.emoji} ${section.name}`;
  els.currentDiff.className = `diff-badge ${diff.color}`;
  els.currentDiff.textContent = diff.label;

  els.timeLeft = TIME_PER_QUESTION;
  updateTimerDisplay();
  startTimer();

  const progress = ((state.currentIndex) / state.questions.length) * 100;
  els.trackFill.style.setProperty('--progress', `${progress}%`);
  els.questionCounter.textContent = `${state.currentIndex + 1} / ${state.questions.length}`;

  els.questionText.textContent = q.question;
  els.optionsContainer.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => selectOption(i, btn);
    els.optionsContainer.appendChild(btn);
  });

  els.nextBtn.disabled = true;
}

function selectOption(index, btnElement) {
  clearInterval(state.timer);
  const q = getCurrentQuestion();

  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === index && i !== q.correct) btn.classList.add('incorrect');
    if (i === index) btn.classList.add('selected');
  });

  state.answers.push({
    questionIndex: state.currentIndex,
    selected: index,
    correct: index === q.correct,
    timeUsed: TIME_PER_QUESTION - els.timeLeft,
    section: q.section,
    difficulty: q.difficulty
  });

  els.nextBtn.disabled = false;
}

function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    els.timeLeft--;
    updateTimerDisplay();

    if (els.timeLeft <= 0) {
      clearInterval(state.timer);
      timeUp();
    }
  }, 1000);
}

function updateTimerDisplay() {
  els.timer.textContent = els.timeLeft;
  els.timer.className = 'timer';
  if (els.timeLeft <= 10) els.timer.classList.add('danger');
  else if (els.timeLeft <= 20) els.timer.classList.add('warning');
}

function timeUp() {
  const q = getCurrentQuestion();
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
  });

  state.answers.push({
    questionIndex: state.currentIndex,
    selected: -1,
    correct: false,
    timeUsed: TIME_PER_QUESTION,
    section: q.section,
    difficulty: q.difficulty
  });

  els.nextBtn.disabled = false;
}

function nextQuestion() {
  clearInterval(state.timer);
  state.currentIndex++;

  if (state.currentIndex >= state.questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

// ============================================
// RESULTADOS
// ============================================
function showResults() {
  showScreen('results');

  const correct = state.answers.filter(a => a.correct).length;
  const total = state.questions.length;
  const percent = Math.round((correct / total) * 100);

  state.stats.total++;
  state.stats.sum += percent;
  localStorage.setItem('sim_stats', JSON.stringify(state.stats));

  els.finalScore.textContent = `${correct}/${total}`;
  els.finalPercent.textContent = `${percent}%`;
  els.finalPercent.style.color = percent >= 70 ? 'var(--success)' : percent >= 40 ? 'var(--warning)' : 'var(--danger)';

  els.breakdownContainer.innerHTML = '';
  SECTIONS.forEach(sec => {
    const secAnswers = state.answers.filter(a => a.section === sec.id);
    const secCorrect = secAnswers.filter(a => a.correct).length;
    const secTotal = secAnswers.length;
    const secPercent = secTotal > 0 ? Math.round((secCorrect / secTotal) * 100) : 0;

    const div = document.createElement('div');
    div.className = 'break-item';
    div.innerHTML = `
      <div class="break-label">${sec.emoji} ${sec.name}</div>
      <div class="break-value" style="color: ${secPercent >= 70 ? 'var(--success)' : secPercent >= 40 ? 'var(--warning)' : 'var(--danger)'}">
        ${secCorrect}/${secTotal} (${secPercent}%)
      </div>
    `;
    els.breakdownContainer.appendChild(div);
  });
}

// ============================================
// EVENT LISTENERS
// ============================================
els.loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const password = els.passwordInput.value;
  els.loginError.textContent = '';

  const success = await login(password);
  if (success) {
    updateStats();
    showScreen('dashboard');
  } else {
    els.loginError.textContent = 'Contraseña incorrecta o error de conexión';
  }
};

els.logoutBtn.onclick = logout;
els.startBtn.onclick = generateQuestions;
els.nextBtn.onclick = nextQuestion;
els.retryBtn.onclick = generateQuestions;
els.homeBtn.onclick = () => { updateStats(); showScreen('dashboard'); };
els.errorRetry.onclick = generateQuestions;
els.errorHome.onclick = () => showScreen('dashboard');

// ============================================
// INICIO
// ============================================
if (isAuthenticated()) {
  updateStats();
  showScreen('dashboard');
} else {
  showScreen('login');
}
