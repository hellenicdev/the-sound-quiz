const soundAnswers = {
  's1': ['ship', 'boat', 'ship horn', 'boat horn', 'foghorn'],
  's2': ['car', 'sports car', 'engine', 'car engine', 'aston martin'],
  's3': ['bird', 'birds', 'bird song', 'birdsong', 'birds singing'],
  's4': ['star wars', 'lightsaber', 'light saber'],
  's5': ['espresso machine', 'espresso macchiato', 'espresso machiatto', 'coffee machine', 'espresso', 'coffee']
};

// Lower-case, drop accents, punctuation, spaces and a leading article so
// "A Ship!", "the ship" and "ship" all match.
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^(an?|the)\s+/, '')
    .replace(/[^a-z0-9]/g, '');
}

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
  // A sound that is playing but not yet answered does not count as done.
  const answered = usedSounds.length - (currentSound ? 1 : 0);
  progressFill.style.width = (answered / totalSounds) * 100 + '%';
  const current = Math.min(answered + 1, totalSounds);
  progressText.textContent = `Question ${current} of ${totalSounds}`;
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

  replaySound();

  guessInput.value = '';
  resultEl.textContent = '';
  resultEl.className = 'result';
  questionEl.style.display = 'block';
  guessInput.focus();
}

function replaySound() {
  if (!currentSound) return;
  const audio = document.getElementById(currentSound);
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function submitAnswer() {
  if (!currentSound) return;

  if (!guessInput.value.trim()) {
    guessInput.focus();
    return;
  }

  const guess = normalize(guessInput.value);
  const validAnswers = soundAnswers[currentSound] || [];
  const normalizedAnswers = validAnswers.map(normalize);

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
  updateProgress();

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
  updateProgress();

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
document.getElementById('replayBtn').addEventListener('click', replaySound);
restartBtn.addEventListener('click', startGame);

guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    submitAnswer();
  }
});

startGame();
