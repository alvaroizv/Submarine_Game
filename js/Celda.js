class Celda {
  constructor(i, j) {
    this.positionX = i;
    this.positionY = j;
    this.arrayVecinos = null;
  }

  setVecinos(filteredArray) {
    this.arrayVecinos = filteredArray;
  }
}

export { Celda };
