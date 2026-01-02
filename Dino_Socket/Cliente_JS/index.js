// Importamos asi Phaser ya que el archivo en concreto no tiene objeto por defecto ni un objeto llamado Phaser, entonces obtenemos todo y lo metemos en un objeto nuevo.
import * as Phaser from "./node_modules/phaser/dist/phaser.esm.js";
import {GameScene} from "./GameScene.js";
import { UIScene } from "./UIScene.js";
import { UI } from "./UI.js";

// Configuración del juego:
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [GameScene, UIScene],
};

// Inicializamos el juego :
const game = new Phaser.Game(config);

const ui = new UI("restart",game);
ui.addEvents();

