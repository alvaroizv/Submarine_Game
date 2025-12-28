import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
import { Phaser } from "./phaser";

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

// JUEGO DEL DINOSAURIO CON PHASER
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

function preload() {

  // Aqui precargamos los recursos necesarios, que son 4 imagenes y un spritesheet
  this.load.image("sky", "./assets/sky.png");
  this.load.image("ground", "./assets/ground.png");
  this.load.image("star", "./assets/star.png");
  this.load.image("bomb", "./assets/bomb.png");
  this.load.spritesheet('dude', 
        './assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {}

function update() {}
