class Celda {
  constructor(i, j) {
    //Inicializamos sus variables, siendo su array de vecinos nulo en un primer momento
    this.positionX = i;
    this.positionY = j;
    this.arrayVecinos = null;
  }

  setVecinos(filteredArray) {
    //Asignamos sus vecinos, que va a ser un Array previamente filtrado
    this.arrayVecinos = filteredArray;
  }
}

export { Celda };
