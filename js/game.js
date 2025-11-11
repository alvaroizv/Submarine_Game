import { UI } from "./UI.js";
import { GameSubmarine } from "./GameSubmarine.js";

UI.init({
  board: "gameBoard",
  status: "gameStatus",
  template: "box-template",
});

const gameInstance = new GameSubmarine(UI);

UI.setEvent({
  btnShot: ["btnShot", () => gameInstance.shot()],
});

UI.generateBoard(8);

/* Esto es otra forma, cuidado con la perdida del contexto this.
/*
UI.setEvent({
    btnShot: ['btnShot', gameInstance.shot.bind(gameInstance)]
});
*/
