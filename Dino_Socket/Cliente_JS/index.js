import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
// Importamos asi Phaser ya que el archivo en concreto no tiene objeto por defecto ni un objeto llamado Phaser, entonces obtenemos todo y lo metemos en un objeto nuevo.
import * as Phaser from "./node_modules/phaser/dist/phaser.esm.js";
import {GameScene} from "./GameScene.js";
import { UIScene } from "./UI.js";

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

const socket = io("ws://localhost:3000");
const game = new Phaser.Game(config);

socket.on("saludo", (dato) => {
  console.log("Ha llegado un nuevo dato");
  console.log(dato);
});

socket.on("nuevo", (dato) => {
  console.log("Se ha conectado");
});

socket.on("move", (dato) => {
  console.log("Se ha movido");
});

document.getElementById("boton").addEventListener("click", () => {
  socket.emit("move", { x: 28, y: 34 });
});


