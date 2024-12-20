import "./style.css";


import { renderBoard } from "./dom"; // Import your renderBoard function

// Sample game board object (simplified for the test)
const gameBoard = {
  ships: [
    {
      coordinates: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    }, // Ship placed at (0,0), (0,1), (0,2)
    {
      coordinates: [
        [1, 5],
        [1, 6],
        [1, 7],
      ],
    }, // Ship placed at (1,5), (1,6), (1,7)
  ],
};

// Get the container element from the DOM
const container = document.getElementById("board");

// Call the renderBoard function to display the board
renderBoard(container, gameBoard);
