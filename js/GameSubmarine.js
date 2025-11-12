export class GameSubmarine {
  constructor(UIControl) {
    this.posX = 0;
    this.posY = 0;
    this.UIControl = UIControl;
    this.UIControl.start(this);
  }

  initialmovement() {
    //Generamos un número aleatorio que determine la posición X e Y de manera inicial
    this.posX = 0;
    this.posY = 0;
  }
  movement() {
    let random = this.getRandomInt();
  }
  shot() {
    // Lógica para manejar el disparo en el juego de submarinos
    // Actualizo interfaz
    console.log(this);
    console.log(this.UIControl.userActivity.inputX.value);
    console.log(this.UIControl.userActivity.inputY.value);
    //Compruebo a través de los inputs si el usuario ha acertado o no.
    if (
      this.posX === parseInt(this.UIControl.userActivity.inputX.value) &&
      this.posY === parseInt(this.UIControl.userActivity.inputY.value)
    ) {
    }
    this.UIControl.changeStatus("¡Disparo realizado!");
  }
  getRandomInt() {
    //Generamos un número aleatorio, redondenadolo y estableciendo como máxima el número de columnas +1, para que pueda salir la última columna
    return Math.floor(
      Math.random() * this.UIControl.control.columns_number + 1
    );
  }
}
