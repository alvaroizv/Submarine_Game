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
});

UI.setEvent({
  btnShot: ["btnShot", () => gameInstance.shot()],
});

UI.generateBoard(8);

//Conectamos el submarino junto con la Interfaz Gráfica
const gameInstance = new GameSubmarine(UI);

//Inicializamos el Tablero, que tendrá como atributo el submarino.
board.innit({
  size: UI.control.columns_number,
  submarine_Instance: gameInstance,
});

/* Esto es otra forma, cuidado con la perdida del contexto this.
/*
UI.setEvent({
    btnShot: ['btnShot', gameInstance.shot.bind(gameInstance)]
});
*/
