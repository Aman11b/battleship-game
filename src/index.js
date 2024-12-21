import "./style.css";
import { renderBoard } from './dom';
import Player from './player';
import GameBoard from "./gameboard";
import Ship from "./ship";

const playerBoardContainer=document.getElementById('player-board');
const computerBoardContainer=document.getElementById('computer-board');

const playerBoard=GameBoard();
const computerBoard=GameBoard();

const player=Player(false);
const computer=Player(true);

playerBoard.placeShip(Ship(3),[0,0],'horizontal');
computerBoard.placeShip(Ship(3),[1,5],'vertical');

renderBoard(playerBoardContainer,playerBoard);
renderBoard(computerBoardContainer,computerBoard);