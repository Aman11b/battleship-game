const GameLoop=(player1,player2,board1,board2)=>{
    let currentPlayer=player1;
    let opponentBoard=board2;
    let gameOver=false;
    let winner=null;

    const switchTurn=()=>{
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        opponentBoard = opponentBoard === board1 ? board2 : board1;
    };

    const playTurn=(coordinate=null)=>{
        if(gameOver) throw new Error('Game Over');

        if(currentPlayer.isComputer && !coordinate){
            currentPlayer.attack(opponentBoard);
        }else if(!currentPlayer.isComputer && coordinate){
            currentPlayer.attack(opponentBoard,coordinate);
        }else{
            throw new Error("not your turn");
        }

        if(opponentBoard.allShipSunk()){
            gameOver=true;
            winner=currentPlayer;
            return `${currentPlayer.isComputer ? "Computer" : "Player"} wins!`;
        }

        switchTurn();
        return 'Next Turn'
    };

    const getWinner=()=>{
        if(!gameOver) return null;
        return winner;
    }

    return {
        playTurn,
        getWinner,
    }
};

export default GameLoop;