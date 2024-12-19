import { experiments } from "webpack";
import GameBoard from "../src/gameboard";
import Ship from '../src/ship';

describe('GameBoard Factory',()=>{
    test('placeShip() places a ship at specific position',()=>{
        const gameBoard=GameBoard();
        const ship=Ship(3);

        gameBoard.placeShip(ship,[0,0],'horizontal');

        expect(gameBoard.ships[0].coordinates).toEqual([
            [0,0],
            [0,1],
            [0,2]
        ]);
    });

    test('placeShip() prevents ships from being placed out of bound',() =>{
        const gameBoard=GameBoard();
        const ship=Ship(3);

        expect(()=> gameBoard.placeShip(ship,[0,9],'horizontal')).toThrow('Ship placement is out of bound');
    });

    test('placeShip() prevents overlapping ship placement',()=>{
        const gameBoard=GameBoard();
        const ship1=Ship(3);
        const ship2=Ship(4);

        gameBoard.placeShip(ship1,[2,2],'horizontal');

        expect(()=>gameBoard.placeShip(ship2,[2,3],'horizontal')).toThrow(
            'Ships cannot overlap'
        );
    });

    test('receivedAttack() register a hit on a ship',()=>{
        const gameBoard=GameBoard();
        const ship=Ship(3);

        gameBoard.placeShip(ship,[2,2],'horizontal');

        gameBoard.receiveAttack([2,3]);

        expect(ship.hits()).toBe(1);
    });

    test('receiveAttack() register a missed attack',()=>{
        const gameBoard=GameBoard();
        const ship=Ship(3);

        gameBoard.placeShip(ship,[2,2],'horizontal');

        gameBoard.receiveAttack([5,5]);

        expect(gameBoard.missedAttacks).toContainEqual([5,5]);
    });

    test('receiveAttack() prevent attack the same coordinate twice ',()=>{
        const gameBoard=GameBoard();
        const ship=Ship(3);

        gameBoard.placeShip(ship,[2,2],'horizontal');

        gameBoard.receiveAttack([2,3]);
        expect(()=> gameBoard.receiveAttack([2,3])).toThrow('Coordinate already hit');
    });

    test('allShipSink() return false if not all ships are sunk',()=>{
        const gameBoard=GameBoard();
        const ship1=Ship(2);
        const ship2=Ship(3);

        gameBoard.placeShip(ship1,[0,0],'horizontal');
        gameBoard.placeShip(ship2,[2,2],'vertical');

        gameBoard.receiveAttack([0,0]);
        gameBoard.receiveAttack([0,1]);

        expect(gameBoard.allShipSunk()).toBe(false);
    });

    test('allShipSunk() return true if all ships are sunk',()=>{
        const gameBoard=GameBoard();
        const ship1=Ship(2);
        const ship2=Ship(3);

        gameBoard.placeShip(ship1,[0,0],'horizontal');
        gameBoard.placeShip(ship2,[2,2],'vertical');

        gameBoard.receiveAttack([0, 0]);
        gameBoard.receiveAttack([0, 1]);
        gameBoard.receiveAttack([2, 2]);
        gameBoard.receiveAttack([3, 2]);
        gameBoard.receiveAttack([4, 2]);

        expect(gameBoard.allShipSunk()).toBe(true);
    });

    test('place a ship on the board within bounds',()=>{
        const gameBoard=GameBoard();
        const ship=Ship(3);
        gameBoard.placeShip(ship,[0,0],'horizontal');
        expect(gameBoard.ships.length).toBe(1);
        expect(gameBoard.ships[0].coordinates.length).toBe(3);
    });

    test('throws error when placing ship out of bound',()=>{
        const gameBoard = GameBoard();
        const ship = Ship(3);
        expect(() => gameBoard.placeShip(ship, [8, 8], "horizontal")).toThrow(
          "Ship placement is out of bound"
        );
    });

    test('throws error when ships overlap',()=>{
        const gameBoard = GameBoard();
        const ship1 = Ship(3);
        const ship2=Ship(3);

        gameBoard.placeShip(ship1,[0,0],'horizontal');
        expect(()=>gameBoard.placeShip(ship2,[0,0],'horizontal')).toThrow('Ships cannot overlap');
    });

});
