export const renderBoard = (container, gameBoard) => {
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
    });
  });
};
