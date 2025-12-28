import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
// Importamos asi Phaser ya que el archivo en concreto no tiene objeto por defecto ni un objeto llamado Phaser, entonces obtenemos todo y lo metemos en un objeto nuevo.
import * as Phaser from "./node_modules/phaser/dist/phaser.esm.js";

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
  this.load.spritesheet("dude", "./assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

let platforms = null;
let player = null;
let cursors = null;
let stars = null;
let score = null;
let scoreText = null;
let bombs = null;

function create() {
  cursors = this.input.keyboard.createCursorKeys();

  // El orden de carga importa, utiliza un sistema de capas
  this.add.image(400, 300, "sky");

  //Cargamos texto de Score:
  score = 0;
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000",
  });

  // Metemos fisicas a las plataformas
  platforms = this.physics.add.staticGroup();

  // Escalamos la imagen x2 ya que sino no ocupa todo el ancho de la pantala, reseteamos el sistema de físicas.
  platforms.create(400, 568, "ground").setScale(2).refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");
  //Creamos la lógica del jugador
  player = this.physics.add.sprite(100, 450, "dude");
  //Valor de Rebote
  player.setBounce(0.2);

  //Esto es para que colisione con los límites del juego
  player.setCollideWorldBounds(true);

  player.body.setGravityY(300);
  //Definimos animaciones
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  //Creación de Estrellas
  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  //Creación de Bombas:
  bombs = this.physics.add.group();

  //Detectores de colisiones :
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);

  this.physics.add.collider(player, bombs, hitBomb, null, this);

  this.physics.add.overlap(player, stars, collectStar, null, this);
}

//Esto es lo que pasa al coleccionar una Estrella
function collectStar(player, star) {
  //Desactivamos la Estrella
  star.disableBody(true, true);
  //Sumamos 10 al score y lo mostramos
  score += 10;
  scoreText.setText("Score: " + score);

  //Si las estrellas se quedan en 10, lanzamos una bomba
  //countActive es un metodo de grupo que cuenta el numero de elementos
  if (stars.countActive(true) === 10) {
    stars.children.iterate(function (child) {
      //Volvemos a habilitar todas las estrellas y ponemos su Y a 0
      child.enableBody(true, child.x, 0, true, true);
    });

    // Si el jugador esta en una posicion menor a 400 creamos una bomba en su lado contrario y viceversa
    var x = player.x < 400  ? Phaser.Math.Between(400, 800)  : Phaser.Math.Between(0, 400);
    //Creamos una bomba en la posicion dada por x , y = 16, y la textura bomb
    var bomb = bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}

// Lo que pasa si el jugador impacta con una bomba
function hitBomb(player, bomb) {
  //Detenemos el juego y pintamos al jugador de rojo
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  gameOver = true;
}

function update() {
  //Lógica de cursores
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
