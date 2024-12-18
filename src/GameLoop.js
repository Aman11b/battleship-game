const GameLoop=(player1,player2,board1,board2)=>{
    let currentPlayer=player1;
    let opponentBoard=board2;

    const switchTurn=()=>{
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        opponentBoard = opponentBoard === board1 ? board2 : board1;
    };

    const playTurn=(coordinate=null)=>{
        if(currentPlayer.isComputer && !coordinate){
            currentPlayer.attack(opponentBoard);
        }else if(!currentPlayer.isComputer && coordinate){
            currentPlayer.attack(opponentBoard,coordinate);
        }else{
            throw new Error("not your turn");
        }

        if(opponentBoard.allShipSunk()){
            return `${currentPlayer.isComputer ? "Computer" : "Player"} wins!`;
        }

        switchTurn();
        return 'Next Turn'
    };

    return {
        playTurn,
    }
};

export default GameLoop;