import "./style.css";
import { renderBoard, updateAttackResult } from "./dom";
import Player from "./player";
import GameBoard from "./gameboard";
import Ship from "./ship";
import GameLoop from "./GameLoop";

// Get board containers
const playerBoardContainer = document.getElementById("player-board");
const computerBoardContainer = document.getElementById("computer-board");

// Create boards
const playerBoard = GameBoard();
const computerBoard = GameBoard();

// Create players
const player = Player(false); // Human player
const computer = Player(true); // Computer player

// Place ships
playerBoard.placeShip(Ship(3), [0, 0], "horizontal");
computerBoard.placeShip(Ship(3), [1, 5], "vertical");

// Create game loop
const gameLoop = GameLoop(player, computer, playerBoard, computerBoard);

// Function to handle the player's attack
const handlePlayerAttack = (row, col) => {
  // Ensure that it's the player's turn
  if (gameLoop.getWinner()) {
    alert("Game Over");
    return;
  }

  // Only allow the player to attack if it's their turn
  if (gameLoop.currentPlayer !== player) {
    alert("It's not your turn!");
    return;
  }

  // Make the player's attack
  const result = gameLoop.playTurn([row, col]);

  // Update the result of the attack (hit/miss)
  updateAttackResult(
    computerBoardContainer,
    row,
    col,
    result === "Next Turn" ? "miss" : "hit"
  );

  if (result !== "Next Turn") {
    // Check if the game is over and if a winner is declared
    const winner = gameLoop.getWinner();
    if (winner) {
      showGameOver(winner); // Show game over screen
      return;
    }
  }

  // After player's turn, it's the computer's turn automatically
  setTimeout(() => {
    if (!gameLoop.getWinner()) {
      const compResult = gameLoop.playTurn(); // Let the computer attack randomly
      const [compRow, compCol] = computer.generateRandomCoordinate();
      updateAttackResult(
        playerBoardContainer,
        compRow,
        compCol,
        compResult === "Next Turn" ? "miss" : "hit"
      );
      const winner = gameLoop.getWinner();
      if (winner) {
        showGameOver(winner); // Show game over screen
      }
    }
  }, 1000); // Delay for the computer's turn
};

// Function to show game over modal
const showGameOver = (winner) => {
  const gameOverMessage = document.getElementById("game-over-message");
  const gameOverModal = document.getElementById("game-over-modal");

  gameOverMessage.textContent = `${
    winner.isComputer ? "Computer" : "Player"
  } wins!`;
  gameOverModal.style.display = "flex"; // Show the modal
};

// Function to restart the game
const restartGame = () => {
  // Reset the boards and game state
  playerBoard.clearBoard();
  computerBoard.clearBoard();

  // Place ships again
  playerBoard.placeShip(Ship(3), [0, 0], "horizontal");
  computerBoard.placeShip(Ship(3), [1, 5], "vertical");

  // Reset players and the game loop
  player.reset();
  computer.reset();

  // Close the modal
  const gameOverModal = document.getElementById("game-over-modal");
  gameOverModal.style.display = "none"; // Hide the modal

  // Re-render the boards
  renderBoard(playerBoardContainer, playerBoard, handlePlayerAttack);
  renderBoard(computerBoardContainer, computerBoard, handlePlayerAttack);
};

// Add event listener to restart button
document.getElementById("restart-btn").addEventListener("click", restartGame);

// Render the boards
renderBoard(playerBoardContainer, playerBoard, handlePlayerAttack);
renderBoard(computerBoardContainer, computerBoard, handlePlayerAttack);
