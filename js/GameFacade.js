import { GameSubmarine } from "./GameSubmarine.js";
import { UI } from "./UI.js";
import { Board } from "./Board.js";

export class GameFacade {
  constructor(column_number) {
    this.board = new Board();
    this.submarine = null;
    this.UI = UI;
    this.column_number = column_number;
  }
  startNewGame() {
    this.UI.init({
      board: "gameBoard",
      status: "gameStatus",
      template: "box-template",
      columns_number: this.column_number,
      x: "num_x",
      y: "num_y",
    });

    this.submarine = new GameSubmarine(this.UI);

    this.board.innit({
      size: this.UI.control.columns_number,
      submarine_Instance: this.submarine,
    });

    this.generateBoard();
  }
  generateBoard() {
    UI.generateBoard(this.UI.control.columns_number);
    this.setEvents();
  }
  setEvents() {
    UI.setEvent({
      btnShot: ["btnShot", () => this.submarine.shot()],
    });
  }
}
