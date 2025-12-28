import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
// Importamos asi Phaser ya que el archivo en concreto no tiene objeto por defecto ni un objeto llamado Phaser, entonces obtenemos todo y lo metemos en un objeto nuevo.
import * as Phaser from "./node_modules/phaser/dist/phaser.esm.js";

// Configuración del juego:
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
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



function preload() {

  // Aqui precargamos los recursos necesarios, que son 4 imagenes y un spritesheet
  // "sky", es el idenfiticador, que tiene una imagen asociada a el
  this.load.image("sky", "./assets/sky.png");
  this.load.image("ground", "./assets/platform.png");
  this.load.image("star", "./assets/star.png");
  this.load.image("bomb", "./assets/bomb.png");
  this.load.spritesheet('dude', 
        './assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

let platforms = null;
function create() {
  // El orden de carga importa, utiliza un sistema de capas
  this.add.image(400, 300, 'sky');
  // Metemos fisicas a las plataformas
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
}

function update() {}
