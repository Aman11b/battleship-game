import GameBoard from "../src/gameboard";
import Ship from "../src/ship"; // Import the Ship module

const Player = (isComputer = false) => {
  const attackCoordinates = new Set();

  const generateRandomCoordinate = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [x, y];
  };

  const attack = (gameboard, coordinate = null) => {
    let target;

    if (isComputer) {
      do {
        target = generateRandomCoordinate();
      } while (attackCoordinates.has(target.toString()));
    } else {
      if (!coordinate)
        throw new Error("Coordinate require for human player attack");
      target = coordinate;
    }

    attackCoordinates.add(target.toString());
    gameboard.receiveAttack(target);
  };
  return {
    attack,
    isComputer,
  };
};
export default Player;
