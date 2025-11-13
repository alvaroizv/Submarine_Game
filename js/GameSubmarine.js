export class GameSubmarine {
  constructor(UIControl) {
    this.posX = 0;
    this.posY = 0;
    this.currentCelda = null;
    this.UIControl = UIControl;
    this.UIControl.start(this);
  }

  initialmovement() {
    //Generamos un número aleatorio que determine la posición X e Y de manera inicial
    this.posX = 0;
    this.posY = 0;
  }

  movement() {
    let movimiento = Math.floor(
      Math.random() * this.currentCelda.arrayVecinos.length
    );
    this.posX = this.currentCelda.arrayVecinos[movimiento].positionX;
    this.posY = this.currentCelda.arrayVecinos[movimiento].positionY;

    this.setPosition(this.currentCelda.arrayVecinos[movimiento]);
  }

  shot() {
    //Compruebo a través de los inputs de la UI si el usuario ha acertado o no.
    if (
      this.posX === parseInt(this.UIControl.userActivity.inputX.value) &&
      this.posY === parseInt(this.UIControl.userActivity.inputY.value)
    ) {
      this.UIControl.changeStatus("Has dado en el clavo tio");
    } else {
      this.UIControl.changeStatus(
        "¡Has fallado pringado!, el submarino se ha movido"
      );

      //Muevo al submarino a un vecino de su celda actual
      this.movement();
    }
  }
  getRandomInt() {
    //Generamos un número aleatorio, redondenadolo y estableciendo como máxima el número de columnas +1, para que pueda salir la última columna
    return Math.floor(
      Math.random() * this.UIControl.control.columns_number + 1
    );
  }

  setPosition(currentCelda) {
    this.currentCelda = currentCelda;
    console.log(currentCelda);
  }
}
