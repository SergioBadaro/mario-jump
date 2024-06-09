const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");
const pauseButton = document.getElementById("pause");
const continueButton = document.getElementById("continue");

let score = 0;
let gameRunning = true;
let gamePaused = false;

const jump = () => {
  if (gameRunning && !gamePaused) {
    mario.classList.add("jump");

    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  }
};

const loop = setInterval(() => {
  if (!gameRunning || gamePaused) return;

  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./img/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    const cloudsPosition = clouds.offsetLeft;
    clouds.style.animation = "none";
    clouds.style.left = `${cloudsPosition}px`;

    gameRunning = false;

    pauseButton.classList.add("hidden");
    continueButton.classList.add("hidden");
    restartButton.classList.remove("hidden");

    clearInterval(loop);
  } else {
    score++;
    scoreElement.textContent = score;
  }
}, 10);

pauseButton.addEventListener("click", () => {
  gamePaused = true;
  pauseButton.classList.add("hidden");
  continueButton.classList.remove("hidden");

  pipe.style.animationPlayState = "paused";
  clouds.style.animationPlayState = "paused";
  mario.style.animationPlayState = "paused";
});

continueButton.addEventListener("click", () => {
  gamePaused = false;
  continueButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");

  pipe.style.animationPlayState = "running";
  clouds.style.animationPlayState = "running";
  mario.style.animationPlayState = "running";
});

restartButton.addEventListener("click", () => {
  location.reload();
});

document.addEventListener("mousedown", jump);
document.addEventListener("keydown", jump);
