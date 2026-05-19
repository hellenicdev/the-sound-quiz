const soundAnswers = {
  's1': ['ship', 'boat'],
  's2': ['car'],
  's3': ['bird'],
  's4': ['starwars', 'star wars'],
  's5': ['espressomachiatto', 'espresso machiatto']
};

const totalSounds = Object.keys(soundAnswers).length;

let currentSound = '';
let usedSounds = [];
let score = 0;

const playBtn      = document.getElementById('playButton');
const submitBtn    = document.getElementById('submitBtn');
const skipBtn      = document.getElementById('skipBtn');
const restartBtn   = document.getElementById('restartBtn');
const guessInput   = document.getElementById('userGuess');
const questionEl   = document.getElementById('question');
const resultEl     = document.getElementById('result');
const quizEl       = document.getElementById('quiz');
const creditsEl    = document.getElementById('credits');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const scoreValue   = document.getElementById('scoreValue');
const finalScore   = document.getElementById('finalScore');

function startGame() {
  currentSound = '';
  usedSounds = [];
  score = 0;
  scoreValue.textContent = '0';
  quizEl.style.display = 'block';
  creditsEl.style.display = 'none';
  questionEl.style.display = 'none';
  resultEl.textContent = '';
  resultEl.className = 'result';
  playBtn.disabled = false;
  updateProgress();
}

function updateProgress() {
  const pct = (usedSounds.length / totalSounds) * 100;
  progressFill.style.width = pct + '%';
  progressText.textContent = `Question ${usedSounds.length + 1} of ${totalSounds}`;
}

function playSound() {
  playBtn.disabled = true;

  if (usedSounds.length === totalSounds) {
    showCredits();
    return;
  }

  let sound;
  do {
    sound = 's' + (Math.floor(Math.random() * totalSounds) + 1);
  } while (usedSounds.includes(sound));
  usedSounds.push(sound);
  currentSound = sound;
  updateProgress();

  const audio = document.getElementById(currentSound);
  audio.currentTime = 0;
  audio.play().catch(() => {});

  guessInput.value = '';
  resultEl.textContent = '';
  resultEl.className = 'result';
  questionEl.style.display = 'block';
  guessInput.focus();
}

function submitAnswer() {
  if (!currentSound) return;

  const guess = guessInput.value.trim().toLowerCase();
  const validAnswers = soundAnswers[currentSound] || [];
  const normalizedAnswers = validAnswers.map(a => a.toLowerCase());

  const audio = document.getElementById(currentSound);
  audio.pause();
  audio.currentTime = 0;

  if (normalizedAnswers.includes(guess)) {
    resultEl.textContent = 'Correct!';
    resultEl.className = 'result correct';
    score++;
    scoreValue.textContent = score;
  } else {
    const hint = validAnswers[0];
    resultEl.textContent = `Incorrect! (it was: ${hint})`;
    resultEl.className = 'result incorrect';
  }

  currentSound = '';
  guessInput.value = '';
  questionEl.style.display = 'none';

  setTimeout(() => {
    resultEl.textContent = '';
    resultEl.className = 'result';

    if (usedSounds.length === totalSounds) {
      showCredits();
    } else {
      playBtn.disabled = false;
    }
  }, 1800);
}

function skipSound() {
  if (!currentSound) return;

  const audio = document.getElementById(currentSound);
  audio.pause();
  audio.currentTime = 0;

  const validAnswers = soundAnswers[currentSound] || [];
  const hint = validAnswers[0] || 'unknown';
  resultEl.textContent = `Skipped! (it was: ${hint})`;
  resultEl.className = 'result incorrect';

  currentSound = '';
  guessInput.value = '';
  questionEl.style.display = 'none';

  setTimeout(() => {
    resultEl.textContent = '';
    resultEl.className = 'result';

    if (usedSounds.length === totalSounds) {
      showCredits();
    } else {
      playBtn.disabled = false;
    }
  }, 1800);
}

function showCredits() {
  quizEl.style.display = 'none';
  creditsEl.style.display = 'block';
  finalScore.textContent = `You scored ${score} / ${totalSounds}`;
}

// --- Event listeners ---

playBtn.addEventListener('click', playSound);
submitBtn.addEventListener('click', submitAnswer);
skipBtn.addEventListener('click', skipSound);
restartBtn.addEventListener('click', startGame);

guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    submitAnswer();
  }
});

startGame();
