import { UI } from "./UI.js";
import { Board } from "./Board.js";
import { GameSubmarine } from "./GameSubmarine.js";

const board = new Board();

UI.init({
  board: "gameBoard",
  status: "gameStatus",
  template: "box-template",
  columns_number: 8,
});

const gameInstance = new GameSubmarine(UI);

UI.setEvent({
  btnShot: ["btnShot", () => gameInstance.shot()],
});

UI.generateBoard(8);

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
