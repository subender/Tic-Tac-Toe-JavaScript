//Element Selection.
const turnEl = document.querySelector("#turn");
const allCellsEl = document.querySelectorAll(".cells");
const grid = document.querySelector(".grid");
const cellTextEl = document.querySelectorAll(".cell-text");

//Winning Combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Variables
const moveAudio = new Audio("/Audio/move.mp3");
const winnerAudion = new Audio("/Audio/gameover.mp3");
let currentPlayer = "X";

grid.addEventListener("click", draw);

function draw(e) {
  let clickedElement = e.target.firstElementChild;

  if (clickedElement.innerHTML == "") {
    clickedElement.innerHTML = currentPlayer;
    currentPlayer = shift();
    turnEl.innerHTML = currentPlayer;
    moveAudio.play();
    checkForWinner();
  }
}

//switching player
const shift = () => (currentPlayer === "X" ? "0" : "X");

//Checking if we have a winner
const checkForWinner = () => {
  winningCombinations.forEach((i) => {
    if (
      cellTextEl[i[0]].innerHTML === cellTextEl[i[1]].innerHTML &&
      cellTextEl[i[1]].innerHTML === cellTextEl[i[2]].innerHTML &&
      cellTextEl[i[0]].innerHTML !== ""
    ) {
      winner(cellTextEl[i[0]].innerHTML);
      winnerAudion.play();
    }
  });
};

// Creating winning screen
function winner(name) {
  const win = document.createElement("div");
  win.classList.add("winner");
  const html = `
   <div class="winner">
  <div class="content">
    <h4>Winner! Winner! Winner!</h4>
    <p>${name} wins..</p>
    <img src="/img/winner.webp" alt="dancing robo" />
    <button onclick="location.reload();">Play Again</button>
  </div>
</div>
  `;
  win.insertAdjacentHTML("afterbegin", html);
  document.body.appendChild(win);
}
