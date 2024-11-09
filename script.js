const bird = document.getElementById('bird');
const pipe = document.getElementById('pipe');
const pipe2 = document.getElementById('pipe2');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart');

let birdY = 200;
let gravity = 2;
let velocity = 0;
let jump = -10;
let pipeX = 400;
let gap = 200;
let score = 0;
let gameInterval;

function startGame() {
  score = 0;
  birdY = 200;
  pipeX = 400;
  scoreDisplay.innerText = score;
  restartBtn.style.display = 'none';

  gameInterval = setInterval(gameLoop, 20);
}

function gameLoop() {
  // Gravity
  velocity += gravity;
  birdY += velocity;
  bird.style.top = birdY + 'px';

  // Pipe movement
  pipeX -= 5;
  if (pipeX < -60) {
    pipeX = 400;
    const pipeHeight = Math.floor(Math.random() * 300) + 100;
    pipe.style.height = pipeHeight + 'px';
    pipe2.style.height = (600 - pipeHeight - gap) + 'px';
    score++;
    scoreDisplay.innerText = score;
  }
  
  pipe.style.left = pipeX + 'px';
  pipe2.style.left = pipeX + 'px';

  // Collision detection
  if (birdY >= 560 || birdY <= 0 || checkCollision()) {
    endGame();
  }
}

function jumpBird() {
  velocity = jump;
}

function checkCollision() {
  const birdRect = bird.getBoundingClientRect();
  const pipeRect = pipe.getBoundingClientRect();
  const pipe2Rect = pipe2.getBoundingClientRect();
  return (
    birdRect.right > pipeRect.left &&
    birdRect.left < pipeRect.right &&
    (birdRect.top < pipeRect.bottom || birdRect.bottom > pipe2Rect.top)
  );
}

function endGame() {
  clearInterval(gameInterval);
  restartBtn.style.display = 'block';
}

document.addEventListener('keydown', jumpBird);
restartBtn.addEventListener('click', startGame);

// Start game on load
startGame();
