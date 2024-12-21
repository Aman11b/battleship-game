const GameLoop = (player1, player2, board1, board2) => {
  let currentPlayer = player1; // Start with player1
  let opponentBoard = board2;
  let gameOver = false;
  let winner = null;

  // Switch between players after every turn
  const switchTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    opponentBoard = opponentBoard === board1 ? board2 : board1;
  };

  const playTurn = (coordinate = null) => {
    if (gameOver) throw new Error("Game Over");

    // Ensure that only the current player can play
    if (currentPlayer.isComputer && coordinate) {
      // Computer should attack only if the coordinate is not provided
      throw new Error("Computer shouldn't receive coordinate");
    } else if (!currentPlayer.isComputer && !coordinate) {
      // Player should always provide a coordinate
      throw new Error("Player must provide coordinate");
    }

    // Proceed with the attack
    if (!currentPlayer.isComputer) {
      // Human player's turn: Attack at the given coordinate
      currentPlayer.attack(opponentBoard, coordinate);
    } else {
      // Computer's turn: Generate random coordinate and attack
      currentPlayer.attack(opponentBoard);
    }

    // Check if all ships of the opponent are sunk
    if (opponentBoard.allShipSunk()) {
      gameOver = true;
      winner = currentPlayer;
      return `${currentPlayer.isComputer ? "Computer" : "Player"} wins!`;
    }

    // Switch to the next turn
    switchTurn();
    return "Next Turn";
  };

  const getWinner = () => {
    if (!gameOver) return null;
    return winner;
  };

  return {
    playTurn,
    getWinner,
    currentPlayer, // Expose current player for turn validation
  };
};

export default GameLoop;
