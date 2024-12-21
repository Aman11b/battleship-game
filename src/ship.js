const Ship = (length) => {
  const coordinates = []; // To store the coordinates where the ship is placed
  let hits = 0;

  // This function sets the ship's coordinates (should be called from GameBoard)
  const setCoordinates = (coords) => {
    coordinates.push(...coords);
  };

  const hit = (coordinate) => {
    // If the coordinate matches one of the ship's coordinates, increase hits
    if (
      coordinates.some(([x, y]) => x === coordinate[0] && y === coordinate[1])
    ) {
      hits += 1;
    }
  };

  const isSunk = () => hits >= length; // Ship is sunk when all coordinates are hit

  return {
    length,
    coordinates, // Adding coordinates here
    hit,
    isSunk,
    setCoordinates,
    hits: () => hits, // Getter for number of hits
  };
};

export default Ship;
