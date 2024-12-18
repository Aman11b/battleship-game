import GameBoard from "../src/gameboard";
import Player from "../src/player";
import Ship from "../src/ship";
import GameLoop from "../src/GameLoop";

describe('Game Loop Tests',()=>{
    test('Player alternate turns',()=>{
        const player1=Player(false);
        const player2=Player(true);
        const board1=GameBoard();
        const board2=GameBoard();

        board1.placeShip(Ship(2),[0, 0],'horizontal');
        board2.placeShip(Ship(2),[1,1],'horizontal');

        const game= GameLoop(player1,player2,board1,board2);

        expect(()=>game.playTurn([1,1])).not.toThrow();

        expect(()=>game.playTurn([2,2])).toThrow('not your turn');

        expect(()=>game.playTurn()).not.toThrow();
    }); 

});