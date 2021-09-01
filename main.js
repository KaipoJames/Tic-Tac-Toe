import { Tile } from "./tile.js"

const turn = document.querySelector("#turn");
const button = document.querySelector("#game-over");
const player1WinsText = document.querySelector(".player1-wins");
const player2WinsText = document.querySelector(".player2-wins");

let tiles;
let markedTiles;
let boxesArray;
let currentTurn;
let player1Selections;
let player2Selections;
let player1wins = 0;
let player2wins = 0;
let noWinner;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const game = {
    init() {
        this.setInitialVariables();
        this.drawBoard();
        this.addListeners();
    },
    setInitialVariables() {
        tiles = [];
        markedTiles = 0;
        boxesArray = [];
        currentTurn = "player1";
        player1Selections = [];
        player2Selections = [];
        turn.innerHTML = "Player 1 Starts";
        button.innerHTML = "";
        button.classList = "";
        noWinner = true;
    },
    drawBoard() {
        const gameboard = document.querySelector(".gameboard");
        gameboard.innerHTML = "";
        for (let i = 1; i < 10; i++) {
            const tile = new Tile(i);
            tiles.push(tile);
            const box = document.createElement("div");
            box.classList = "box " + "box" + i;
            gameboard.appendChild(box);
            boxesArray.push(box);
        }
    },
    addListeners() {
        const boxes = document.querySelectorAll(".box");
        for (const box of boxes) {
            box.addEventListener("click", () => {
                if (noWinner === true) {
                    let whoseTurn = this.getCurrentTurn();
                    const boxIndex = boxesArray.indexOf(box);
                    if (whoseTurn === "player1") {
                        if (!tiles[boxIndex].isMarked) {
                            this.drawX(box);
                            tiles[boxIndex].setElement("x");
                            player1Selections.push(parseInt(boxIndex));
                            player1Selections.sort(function(a, b) { return a - b});
                            turn.innerHTML = "Player 2's Turn";
                            if (player1Selections.length >= 3) {
                                this.checkForWinner(player1Selections);
                            }
                            currentTurn = "player2";
                            this.checkForEndGame();
                        }
                    } else {
                        if (!tiles[boxIndex].isMarked) {
                            this.drawO(box);
                            tiles[boxIndex].setElement("o");
                            player2Selections.push(parseInt(boxIndex));
                            player2Selections.sort(function(a, b) { return a - b});
                            turn.innerHTML = "Player 1's Turn";
                            if (player2Selections.length >= 3) {
                                this.checkForWinner(player2Selections);
                            }
                            currentTurn = "player1";
                            this.checkForEndGame();
                        }
                    }
                }
            });
        }
    },
    drawX(element) {
        const x = document.createElement("div");
        x.innerHTML = "X";
        x.classList.add("x");
        x.classList.add("shape");
        element.appendChild(x);
        markedTiles++;
    },
    drawO(element) {
        const o = document.createElement("div");
        o.innerHTML = "O";
        o.classList.add("o");
        o.classList.add("shape");
        element.appendChild(o);
        markedTiles++;
    },
    getCurrentTurn() {
        return currentTurn;
    },
    endGame(winner) {
        if (winner === "player1") {
            noWinner = false;
            player1wins++;
            console.log("Player1 Wins: " + player1wins);
            player1WinsText.innerHTML = "Player 1: " + player1wins;
            turn.innerHTML = winner + " Wins!";
        } else if (winner === "player2") {
            noWinner = false;
            player2wins++;
            console.log("Player2 Wins: " + player2wins);
            player2WinsText.innerHTML = "Player 2: " + player2wins;
            turn.innerHTML = winner + " Wins!";
        } else {
            turn.innerHTML = "It's A Tie!";
        }
        button.innerHTML = "Play Again";
        button.classList = "button";
        button.addEventListener("click", () => {
            game.init();
        });
    },
    checkForEndGame() {
        if (markedTiles === 9 && noWinner === true) {
            this.endGame("none");
        }
    },
    checkForWinner(playerMoves) {
        console.log(playerMoves);
        for (const el of winningConditions) {
            if (el.every(i => playerMoves.includes(i))) {
                this.endGame(currentTurn);
            }
        }
    }
}

game.init();
