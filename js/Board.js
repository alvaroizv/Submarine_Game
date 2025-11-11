class Board {
  constructor() {
    this.maxX = 0;
    this.maxY = 0;
    this.properSubmarine = null;
  }

  innit(config) {
    this.properSubmarine = config.submarine_Instance;
    this.maxX = config.size;
    this.maxY = this.maxX;
    console.log("Board Created");
  }
}

export { Board };
