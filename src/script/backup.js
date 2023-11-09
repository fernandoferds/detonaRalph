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
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        state.view.gameOver.style.display = "flex";
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);

    }
}

function restartHitbox() {
    state.view.restart.addEventListener("click", function () {
        state.view.gameOver.style.display = "none";
        state.values.currentTime = 10;

        setInterval(countDown, 1000),
            setInterval(randomSquare, 1000);
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

}

/*function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);

}*/

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
    // moveEnemy();
    addListenerHitBox();
    restartHitbox();


}

init();