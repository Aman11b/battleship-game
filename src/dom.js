import GameBoard from "./gameboard";
import Ship from "./ship";
import GameLoop from "./GameLoop";
import Player from "./player";

const renderBoard=(boardId,board)=>{
    const boardElement=document.getElementById(boardId);
    boardElement.innerHTML='';

    for(let x=0;x<10;x++){
        for(let y=0;y<10;y++){
            const cell=document.createElement('div');
            cell.dataset.coord=`${x},${y}`;
            cell.addEventListener('click',()=>handleCellClick(x,y,board));
            boardElement.appendChild(cell);
        }
    }
};

const handleCellClick=(x,y,board)=>{
    const cell=document.querySelector(`[data-coord="${x},${y}"]`);

    console.log(`Clicked on cell: ${x},${y}`);

    if(board === playerBoard){
        placeShip(Ship(3),[x,y],'horizontal');
        renderBoard('player-board',playerBoard);
    }else{
        game.playTurn([x,y]);
        renderBoard('computer-board',computerBoard);
    }
};
document.getElementById('start-game').addEventListener('click',()=>{
    playerBoard=GameBoard();
    computerBoard=GameBoard();

    const player1=Player(false);
    const player2=Player(true);
    game=GameLoop(player1,player2,playerBoard,computerBoard);

    renderBoard('player-board'.playerBoard);
    renderBoard('computer-board',computerBoard);
});

export default startGame;