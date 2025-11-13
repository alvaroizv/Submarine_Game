import { GameSubmarine } from "./GameSubmarine.js";
import { UI } from "./UI.js";
import { Board } from "./Board.js";

export class GameFacade {
  constructor(column_number) {
    //Inicializamos las variables a null menos el tablero y la UI que empezamos creandolas, UI no necesito new porque es una constante.
    this.board = new Board();
    this.submarine = null;
    this.UI = UI;
    this.column_number = column_number;
  }
  startNewGame() {
    //Inicializamos la UI con sus parametros necesarios
    this.UI.init({
      board: "gameBoard",
      status: "gameStatus",
      template: "box-template",
      columns_number: this.column_number,
      x: "num_x",
      y: "num_y",
    });
    //Creamos el submarino e inicializamos el tablero
    this.submarine = new GameSubmarine(this.UI);

    this.board.innit({
      size: this.UI.control.columns_number,
      submarine_Instance: this.submarine,
    });
    //Llamamos al método generar tablero
    this.generateBoard();
  }
  generateBoard() {
    //Generamos la interfaz tablero y llamamos a setEvents
    UI.generateBoard(this.UI.control.columns_number);
    this.setEvents();
  }
  setEvents() {
    //Le asignamos al boton de disparar su función que se ejecutará más adelante
    UI.setEvent({
      btnShot: ["btnShot", () => this.submarine.shot()],
    });
  }
}
