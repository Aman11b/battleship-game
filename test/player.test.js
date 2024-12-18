import GameBoard from '../src/gameboard';
import Player from '../src/player';
import Ship from '../src/ship';

describe('Player test module',()=>{
    test('Player can attack opponents game board at specific coordinate',()=>{
        const player=Player();
        const opponentBoard=GameBoard();

        opponentBoard.placeShip(Ship(2),[0,0],'horizontal');

        player.attack(opponentBoard,[0,0]);

        expect(opponentBoard.ships[0].hits()).toBe(1);
    });
    
    test('Computer player generate random valid attack',()=>{
        const computer =Player(true); //true indicate computer player
        const opponentBoard=GameBoard();

        for(let i=0;i<100;i++){
            computer.attack(opponentBoard);
        }

        expect(opponentBoard.attackedCoordinates.size).toBe(100);
    });

    test('computer does not repeat attacks on the same coordinate',()=>{
        const computer=Player(true);
        const opponentBoard=GameBoard();

        for(let i=0;i<10;i++){
            computer.attack(opponentBoard);
        }

        const uniqueAttacks=new Set(opponentBoard.attackedCoordinates);
        expect(uniqueAttacks.size).toBe(10);
    });
});