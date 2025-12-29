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
  this.load.image("rock", "./assets/rock.png");
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
let rocks = null;

function create() {

   //Declaración de variables
  score = 0;
  cursors = this.input.keyboard.createCursorKeys();

  // Configuración mundo y cámara

  //Hacemos que el límite del juego sea 5000 de ancho y no los 800 de la pantalla.
  this.physics.world.setBounds(0, 0, 5000, 600);

   //La cámara seguirá al jugador
  this.cameras.main.setBounds(0, 0, 5000, 600);

  //Cambiamos el cielo a un tileSprite para que se repita constantemente:
  this.add.tileSprite(0, 0, 5000, 600, "sky").setOrigin(0, 0);

  //Cargamos texto de Score:
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000",
  });

  //Hacemos que se mantenga fijo a la izquierda
  scoreText.setScrollFactor(0);

  // Metemos fisicas a las plataformas
  platforms = this.physics.add.staticGroup();

  // Escalamos la imagen x2 ya que sino no ocupa todo el ancho de la pantala, reseteamos el sistema de físicas.
  platforms.create(400, 568, "ground").setScale(13,2).refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  //Declaramos aqui el jugador porque sino se queda detrás de las anteriores capas
   player = this.physics.add.sprite(100, 450, "dude");

   //Le asignamos a la cámara que siga al jugador.
   this.cameras.main.startFollow(player);
  //Valor de Rebote
  player.setBounce(0.2);

  //Colisiona con los límites del juego
  player.setCollideWorldBounds(true);

  // Le ajustamos una Gravedad
  player.body.setGravityY(300);

  //Definimos los cursores y sus animaciones correspondientes:
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

  //Creación de Estrellas y asignamos rebote.
  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });
  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  //Creamos los cactus del juego
  rocks = this.physics.add.group({
    key: "rock",
    repeat: 15,
    setXY: { x: 300, y: 521, stepX: 300 },
  });

  //Creación de Bombas:
  bombs = this.physics.add.group();

  //Detectores de colisiones :
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(rocks, platforms);
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
    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
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
