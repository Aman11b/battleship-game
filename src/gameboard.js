const GameBoard = () => {
    const ships = []; //All ships
    const boardSize=10;
    const missedAttacks=[];
    const attackedCoordinates=new Set();

    const placeShip = (ship, startCoord, orientation) => {
        const [x,y]=startCoord;
        const coordinates = [];

        if(
            (orientation === 'horizontal' && y+ship.length >boardSize) ||
            (orientation === 'vertical' && x+ship.length >boardSize)
        ){
            throw new Error('Ship placement is out of bound');
        }

        for(let i = 0; i<ship.length; i++){
            if(orientation === 'horizontal') {
                coordinates.push([x+i,y]);
            }else if (orientation === 'vertical') {
                coordinates.push ([x,y+i]);
            }
        }

        for(const placeShip of ships){
            for(const placeCoord of placeShip.coordinates){
                for(const coord of coordinates){
                    if(
                        placeCoord[0] === coord[0] &&
                        placeCoord[1] === coord[1]
                    ){
                        throw new Error ('Ships cannot overlap');
                    }
                }
            }
        }

        ship.coordinates=coordinates;
        ships.push(ship);
    };

    const receiveAttack=(coordinate)=>{
        const coordString=coordinate.toString();

        if(attackedCoordinates.has(coordString)){
            throw new Error("Coordinate already hit");
        }
        attackedCoordinates.add(coordString);

        for(const ship of ships){
            for(const coord of ship.coordinates){
                if(
                    coord[0] === coordinate[0] &&
                    coord[1] === coordinate[1]
                ){
                    ship.hit();
                    return;
                }
            }
        }

        missedAttacks.push(coordinate);
    };

    const allShipSunk=()=>{
        return ships.every((ship)=>ship.isSunk());
    }

    

    return{
        ships,
        missedAttacks,
        allShipSunk,
        placeShip,
        receiveAttack,
        attackedCoordinates,
    };
};

export default GameBoard;