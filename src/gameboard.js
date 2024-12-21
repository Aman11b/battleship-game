const GameBoard = () => {
  const ships = []; // All ships
  const boardSize = 10;
  const missedAttacks = [];
  const attackedCoordinates = new Set();

  const placeShip = (ship, startCoord, orientation) => {
    const [x, y] = startCoord;
    const coordinates = [];

    if (
      (orientation === "horizontal" && y + ship.length > boardSize) ||
      (orientation === "vertical" && x + ship.length > boardSize)
    ) {
      throw new Error("Ship placement is out of bound");
    }

    for (let i = 0; i < ship.length; i++) {
      if (orientation === "horizontal") {
        coordinates.push([x + i, y]);
      } else if (orientation === "vertical") {
        coordinates.push([x, y + i]);
      }
    }

    // Check if any ship overlaps with the new ship
    for (const placeShip of ships) {
      for (const placeCoord of placeShip.coordinates) {
        for (const coord of coordinates) {
          if (placeCoord[0] === coord[0] && placeCoord[1] === coord[1]) {
            throw new Error("Ships cannot overlap");
          }
        }
      }
    }

    ship.setCoordinates(coordinates); // Set the coordinates of the ship
    ship.coordinates = coordinates; // Also store coordinates on the ship object
    ships.push(ship);
  };

  const receiveAttack = (coordinate) => {
    const coordString = coordinate.toString();

    if (attackedCoordinates.has(coordString)) {
      throw new Error("Coordinate already hit");
    }
    attackedCoordinates.add(coordString);

    for (const ship of ships) {
      ship.hit(coordinate); // Call the hit method on the ship with the coordinate

      // After attacking, check if all ship's coordinates are hit and return
      if (ship.isSunk()) {
        console.log(`Ship sunk!`);
      }
      return;
    }

    missedAttacks.push(coordinate);
  };

  const allShipSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  const clearBoard = () => {
    ships.length = 0; // Clear the ships array
    missedAttacks.length = 0; // Clear missed attacks
    attackedCoordinates.clear(); // Clear the set of attacked coordinates
  };

  return {
    ships,
    missedAttacks,
    allShipSunk,
    placeShip,
    receiveAttack,
    attackedCoordinates,
    clearBoard,
  };
};

export default GameBoard;
