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
    this.posX = this.getRandomInt();
    this.posY = this.getRandomInt();
  }

  movement() {
    //Reduzco rastos antiguos, en la primera llamada no hará nada
    this.UIControl.reduceInnerContent();

    //Randomizamos el numero que va a salir basado en los índices array de Vecinos de la casilla
    let movimiento = Math.floor(
      Math.random() * this.currentCelda.arrayVecinos.length
    );
    //Reconfiguramos la posición x e y del submarino y le asigamos su nueva celda.
    this.posX = this.currentCelda.arrayVecinos[movimiento].positionX;
    this.posY = this.currentCelda.arrayVecinos[movimiento].positionY;
    this.setPosition(this.currentCelda.arrayVecinos[movimiento]);
    // Le asigno a la nueva casilla el 3
    this.UIControl.changeInnerContent(
      this.currentCelda.positionX,
      this.currentCelda.positionY
    );
  }

  shot() {
    //Compruebo a través de los inputs de la UI si el usuario ha acertado o no.
    if (
      this.posX === parseInt(this.UIControl.userActivity.inputX.value) &&
      this.posY === parseInt(this.UIControl.userActivity.inputY.value)
    ) {
      //Si se ha movido marcamos el mensaje de que ha acertado
      this.UIControl.changeStatus("Has dado en el clavo tio");
    } else {
      //Si no, nos reimos de él y movemos el submarino
      this.UIControl.changeStatus(
        "¡Has fallado pringado!, el submarino se ha movido"
      );

      //Muevo al submarino a un vecino de su celda actual
      this.movement();
    }
  }
  getRandomInt() {
    //Generamos un número aleatorio, redondenadolo y estableciendo como máxima el número de columnas +1, para que pueda salir la última columna
    return Math.floor(Math.random() * this.UIControl.control.columns_number);
  }

  setPosition(currentCelda) {
    //Asignamos la celda al submarino
    this.currentCelda = currentCelda;
  }
}
