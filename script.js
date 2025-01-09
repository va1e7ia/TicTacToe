let title;
let player1;
let player2;
let turn = "x";
let squares = [];
let currentPlayer;
let gameLog = [];

let player1Wins = 0;
let player2Wins = 0;
let draws = 0;
let player1Losses = 0;
let player2Losses = 0;

let fromGameOver = false;

let gameHistory = [];

function goBackToStartScreen() {
  document.querySelector(".stats-screen").style.display = "none";
  if (fromGameOver) {
    document.querySelector(".game-over-screen").style.display = "block";
  } else {
    document.querySelector(".start-screen").style.display = "flex";
  }
}

function showStats() {
  const startScreen = document.querySelector(".start-screen");
  if (startScreen && startScreen.style.display !== "none") {
    startScreen.style.display = "none";
    fromGameOver = false;
  }

  const gameOverScreen = document.querySelector(".game-over-screen");
  if (gameOverScreen && gameOverScreen.style.display !== "none") {
    gameOverScreen.style.display = "none";
    fromGameOver = true;
  }

  document.querySelector(".stats-screen").style.display = "block";

  const historyDiv = document.getElementById("game-history");
  historyDiv.innerHTML = ""; // это чтобы два раза не повторялось
  gameHistory.forEach((game, index) => {
    const gameEntry = document.createElement("p");
    gameEntry.textContent = `Партия ${index + 1}: ${game.player1} vs ${
      game.player2
    } — ${game.result}`;
    historyDiv.appendChild(gameEntry);
  });
}

function end() {
  const winnerName = currentPlayer === player1 ? player2 : player1;
  gameHistory.push({
    player1,
    player2,
    result: `Игрок ${winnerName} победил!`,
  });

  displayGameLog();
  showGameOverScreen(`Игрок ${winnerName} победил!  &#127881;`);
}

function draw() {
  gameHistory.push({
    player1,
    player2,
    result: "Ничья",
  });

  displayGameLog();
  showGameOverScreen("Ничья!  &#129309;");
}

function winner() {
  for (let i = 1; i < 10; i++) {
    squares[i] = document.getElementById("item" + i).innerHTML;
  }

  if (
    squares[1] == squares[2] &&
    squares[2] == squares[3] &&
    squares[1] != ""
  ) {
    end();
  } else if (
    squares[4] == squares[5] &&
    squares[5] == squares[6] &&
    squares[5] != ""
  ) {
    end();
  } else if (
    squares[7] == squares[8] &&
    squares[8] == squares[9] &&
    squares[8] != ""
  ) {
    end();
  } else if (
    squares[1] == squares[4] &&
    squares[4] == squares[7] &&
    squares[1] != ""
  ) {
    end();
  } else if (
    squares[2] == squares[5] &&
    squares[5] == squares[8] &&
    squares[5] != ""
  ) {
    end();
  } else if (
    squares[3] == squares[6] &&
    squares[6] == squares[9] &&
    squares[6] != ""
  ) {
    end();
  } else if (
    squares[1] == squares[5] &&
    squares[5] == squares[9] &&
    squares[5] != ""
  ) {
    end();
  } else if (
    squares[3] == squares[5] &&
    squares[5] == squares[7] &&
    squares[5] != ""
  ) {
    end();
  } else {
    if (!squares.includes("")) {
      draw();
    }
  }
}

function showGameOverScreen(message) {
  let gameOverScreen = document.querySelector(".game-over-screen");

  if (!gameOverScreen) {
    gameOverScreen = document.createElement("div");
    gameOverScreen.className = "game-over-screen";
    gameOverScreen.innerHTML = `
      <h2>${message}</h2>
      <button onclick="restartGame()">Играть снова</button>
      <button onclick="showStats()">Статистика</button>
    `;
    document.body.appendChild(gameOverScreen);
  }

  document.querySelector(".game").style.display = "none";
  gameOverScreen.style.display = "block";
}

function restartGame() {
  const gameOverScreen = document.querySelector(".game-over-screen");
  if (gameOverScreen) {
    gameOverScreen.remove();
  }

  document.querySelector(".game").style.display = "none";

  document.querySelector(".start-screen").style.display = "flex";

  squares = [];
  gameLog = [];
  turn = "x";
  currentPlayer = player1;

  for (let i = 1; i <= 9; i++) {
    const square = document.getElementById("item" + i);
    square.innerHTML = "";
    square.style.background = "";
  }

  displayGameLog();
}

function game(id) {
  let element = document.getElementById(id);
  if (element.innerHTML === "") {
    if (turn === "x") {
      element.innerHTML = "X";
      gameLog.push(`${currentPlayer} поставил X `);
      turn = "o";
      currentPlayer = player2;
      title.innerHTML = `${currentPlayer} ходит`;
    } else if (turn === "o") {
      element.innerHTML = "O";
      gameLog.push(`${currentPlayer} поставил O`);
      turn = "x";
      currentPlayer = player1;
      title.innerHTML = `${currentPlayer} ходит`;
    }
    winner();
    displayGameLog();
  }
}

function displayGameLog() {
  const gameLogDiv = document.getElementById("game-log");
  gameLogDiv.innerHTML = gameLog.join("<br>");
}

function startGame() {
  title = document.querySelector(".game-title");

  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;

  if (!player1.trim() || !player2.trim()) {
    document.getElementById("error-message").style.display = "block";
    return;
  }
  if (player1.trim() === player2.trim()) {
    document.getElementById("error-message-same").style.display = "block";
    return;
  }

  if (Math.random() > 0.5) {
    [player1, player2] = [player2, player1];
  }

  currentPlayer = player1;
  title.innerHTML = `${currentPlayer} ходит`;
  document.querySelector(".start-screen").style.display = "none";
  document.querySelector(".nickname-form").style.display = "none";
  document.querySelector(".game").style.display = "flex";
}

function showNicknameForm() {
  document.querySelector(".start-screen").style.display = "none";
  document.querySelector(".nickname-form").style.display = "block";
}
