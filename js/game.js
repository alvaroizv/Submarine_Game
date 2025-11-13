import { UI } from "./UI.js";
import { Board } from "./Board.js";
import { GameSubmarine } from "./GameSubmarine.js";

const board = new Board();

//Definimos las variables para la interfaz gráfica,sus eventos y generamos el tablero dinámicanete.
UI.init({
  board: "gameBoard",
  status: "gameStatus",
  template: "box-template",
  columns_number: 8,
  x: "num_x",
  y: "num_y",
  restart_button: "restart",
});

//Creamos el Submarino
const gameInstance = new GameSubmarine(UI);

UI.setEvent({
  btnShot: ["btnShot", () => gameInstance.shot()],
  restart: ["restart", () => gameInstance.restart()],
});

UI.generateBoard(8);

//Inicializamos el Tablero, que tendrá como atributo el submarino.
board.innit({
  size: UI.control.columns_number,
  submarine_Instance: gameInstance,
});
