// Function to render the game board
export const renderBoard = (container, gameBoard, handleAttack) => {
  // Clear any previous content in the container
  container.innerHTML = "";

  // Create a 10x10 grid dynamically
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row"); // Add class for styling

    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell"); // Add class for styling each cell
      row.appendChild(cell);

      // Add event listener for clicks to handle attacks
      cell.addEventListener("click", () => {
        handleAttack(i, j); // Handle attack on the cell
      });
    }

    container.appendChild(row); // Append the row to the container
  }

  // Now that the grid is created, place the ships on the board
  placeShips(container, gameBoard);
};

// Function to place ships on the board (based on ship coordinates)
export const placeShips = (container, gameBoard) => {
  gameBoard.ships.forEach((ship) => {
    ship.coordinates.forEach((coord) => {
      const row = coord[0]; // Row index
      const col = coord[1]; // Column index

      // Access the corresponding cell in the grid
      const cell = container.children[row].children[col];

      // Add a class to visually mark the cell as a ship
      cell.classList.add("ship");

      // If the ship is already sunk, mark the cell as 'sunk'
      if (ship.isSunk()) {
        cell.classList.add("sunk"); // Add a sunk class to show it is hit and sunk
      }
    });
  });
};

// Function to show a hit or miss in the cell
export const updateAttackResult = (container, row, col, result) => {
  const cell = container.children[row].children[col];

  if (result === "hit") {
    cell.style.backgroundColor = "red"; // Show hit with red
  } else if (result === "miss") {
    cell.style.backgroundColor = "blue"; // Show miss with blue
  } else if (result === "sunk") {
    cell.style.backgroundColor = "darkred"; // Mark a sunk ship with dark red
    cell.classList.add("sunk"); // Optionally, add a "sunk" class for additional styling
  }
};
