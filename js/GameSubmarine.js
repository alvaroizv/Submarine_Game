export class GameSubmarine {
    constructor(UIControl) {
        this.UIControl = UIControl;
        this.UIControl.start(this);
    }

    shot() {
        // Lógica para manejar el disparo en el juego de submarinos
        // Actualizo interfaz
        console.log(this);
        this.UIControl.changeStatus("¡Disparo realizado!");
    }
}