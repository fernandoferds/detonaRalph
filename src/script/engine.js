const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        gameOver: document.querySelector(".game-over"),
        restart: document.querySelector("#button"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        countDownTimerId: setInterval(countDown, 1000),
        hitPosition: 0,
        result: 0,
        currentTime: 10,
    }
}
function countDown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        state.view.gameOver.style.display = "flex";
        state.values.currentTime = 0;
    }
}
function restartHitbox() {
    state.view.restart.addEventListener("click", function () {
        state.view.gameOver.style.display = "none";
        state.values.currentTime = 10;
        state.values.result = 0;
        state.view.score.textContent = 0;
        init();

    });
}
function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
    if (state.values.currentTime === 1) {
        clearInterval(state.values.timerId);
    }
}
function moveEnemy(velocidade) {
    clearInterval(state.values.timerId);
    state.values.timerId = setInterval(randomSquare, velocidade);
}
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
}
function init() {
    moveEnemy(state.values.gameVelocity);
    addListenerHitBox();
    restartHitbox();
}
init();