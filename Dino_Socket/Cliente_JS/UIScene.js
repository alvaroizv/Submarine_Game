import * as Phaser from "./node_modules/phaser/dist/phaser.esm.js";

export class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        //Generamos el texto de arriba a la izquierda
        this.scoreText = this.add.text(16, 16, "Touch the Flag to Win!", {
            fontSize: "32px",
            fill: "#000",
        });
    }

    //Generar Texto de Victoria
    changeMessage(msg) {
        this.scoreText.setText(msg);
        this.scoreText.setTint(0x00ff00);
    }
}