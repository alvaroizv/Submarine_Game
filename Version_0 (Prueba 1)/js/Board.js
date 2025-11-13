import { Celda } from "./Celda.js";
class Board {
  constructor() {
    //Ponemos todas las propiedades a 0 o a null
    this.tablero = null;
    this.maxX = 0;
    this.maxY = 0;
    this.properSubmarine = null;
  }

  innit(config) {
    //Inicializamos sus variables, aprovechamos que estamos en un cuadrado aplicando a maxY el tamaño de maxX
    this.properSubmarine = config.submarine_Instance;

    this.maxX = config.size;
    this.maxY = this.maxX;
    console.log("Board Created");

    //Recorremos la malla, insertando una celda (a la que asignamos su posición en el eje x e y) por cada posición.
    let malla = Array.from({ length: this.maxX }, (v, i) =>
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

    //Asigno la casilla inicial al atributo del submarino con su método
    this.properSubmarine.setPosition(celda);
  }

  getVecinos(celda_selected) {
    //Aquí buscamos los vecinos de cada celda,viendo si las posiciones X e Y en diferentes casos
    //Coinciden con las de nuestra casilla actual si "sumaramos" o "restaramos 1"
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

    //Creamos un nuevo set y luego un array de elementos con todos los vecinos (En Mozilla.JS sale cómo realizar un array a partir de un Set)
    const set = new Set([vecinoUp, vecinoDown, vecinoLeft, vecinoRight]);
    let arrayVecinos = Array.from(set);
    //Aqui filtro el array que le paso a la celda quitando los undefined, porque eso significa que dan con el borde.
    celda_selected.setVecinos(arrayVecinos.filter((item) => item != undefined));
  }
}

export { Board };
