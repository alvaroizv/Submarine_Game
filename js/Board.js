import { Celda } from "./Celda.js";
class Board {
  constructor() {
    this.tablero = null;
    this.maxX = 0;
    this.maxY = 0;
    this.properSubmarine = null;
  }

  innit(config) {
    this.properSubmarine = config.submarine_Instance;

    this.maxX = config.size;
    this.maxY = this.maxX;
    console.log("Board Created");

    let malla = Array.from({ length: this.maxX + 1 }, (v, i) =>
      Array.from({ length: this.maxX }, (v, j) => new Celda(i, j))
    );

    //Aplanamos la malla y le asiganmos el tablero
    this.tablero = malla.flat();

    //Colocamos los vecinos a cada celda.
    this.tablero.forEach((celda, i) => {
      this.getVecinos(celda);
    });

    //Coloco al submarino en una casilla aleatoria de mi tablero.
    this.properSubmarine.initialmovement();

    //Le asigno a dicha casilla el submarino:
    let celda = this.tablero.find(
      (item) =>
        item.positionX === this.properSubmarine.posX &&
        item.positionY === this.properSubmarine.posY
    );
  }

  getVecinos(celda_selected) {
    let vecinoUp = this.tablero.find(
      (item) =>
        item.positionX === celda_selected.positionX + 1 &&
        item.positionY === celda_selected.positionY
    );

    let vecinoDown = this.tablero.find(
      (item) =>
        item.positionX === celda_selected.positionX &&
        item.positionY === celda_selected.positionY - 1
    );

    let vecinoLeft = this.tablero.find(
      (item) =>
        item.positionX === celda_selected.positionX - 1 &&
        item.positionY === celda_selected.positionY
    );

    let vecinoRight = this.tablero.find(
      (item) =>
        item.positionX === celda_selected.positionX &&
        item.positionY === celda_selected.positionY + 1
    );

    const set = new Set([vecinoUp, vecinoDown, vecinoLeft, vecinoRight]);
    let arrayVecinos = Array.from(set);

    celda_selected.setVecinos(arrayVecinos.filter((item) => item != undefined));
  }
}

export { Board };
