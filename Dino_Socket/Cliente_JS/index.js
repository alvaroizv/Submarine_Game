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
  this.load.spritesheet("bird", "./assets/BirdSprite.png",{
    frameWidth: 16,
    frameHeight: 16,
  });
  this.load.spritesheet("dude", "./assets/DinoSprites-doux.png", {
    frameWidth: 24,
    frameHeight: 24,
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
let birds = null;
let gameOver = false;

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

  // Suelo principal
  platforms.create(400, 568, "ground").setScale(13, 2).refreshBody();

  //Otras plataformas aleatoriamente:
  let xActual = 500;  
  let yActual = 450;  

for (let i = 0; i < 20; i++) {
    // Avanzamos en X de forma constante
    xActual += 250;

    // Cambiamos la Y solo un poco hacia arriba o hacia abajo (-80 a 80)
    yActual += Phaser.Math.Between(-80, 80);

    // Limites para que las plataformas no se salgan del cielo o del suelo
    if (yActual < 200) yActual = 250; 
    if (yActual > 480) yActual = 400;

    // Creamos la plataforma con el tamaño reducido
    platforms.create(xActual, yActual, "ground").setScale(0.5, 1).refreshBody();
}

  //Declaramos aqui el jugador porque sino se queda detrás de las anteriores capas
  player = this.physics.add.sprite(100, 450, "dude");

  //Le asignamos a la cámara que siga al jugador.
  this.cameras.main.startFollow(player);
  //Valor de Rebote
  player.setBounce(0.2);
  player.setScale(2);

  //Colisiona con los límites del juego
  player.setCollideWorldBounds(true);

  // Le ajustamos una Gravedad
  player.body.setGravityY(300);

  //Definimos los cursores y sus animaciones correspondientes:
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 4, end: 9 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 0 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 4, end: 9 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "dead",
    frames: [{ key: "dude", frame: 14 }],
    frameRate: 20,
  })

  // Animación del pájaro
  this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("bird", { start: 9, end: 17 }),
        frameRate: 12,
        repeat: -1,
    });

  //Creamos las rocas del juego
  rocks = this.physics.add.group({
    key: "rock",
    repeat: 29,
  });

  rocks.children.iterate(function (child) {
    //Colocamos las piedras de manera aleatoria
    let x = Phaser.Math.Between(400, 4900);
    child.setPosition(x, 520);

    child.refreshBody();
  });

  //Creamos los pájaros del juego
  birds = this.physics.add.group();

  //Colocamos los pájaros de manera aleatoria
  for (let i = 0; i < 5  ; i++) {
    let x = Phaser.Math.Between(800, 5000);
    let y = Phaser.Math.Between(100, 400);

    let bird = birds.create(x, y, "bird");

    // Activamos animación
    bird.anims.play("fly", true);
    // Los escalamos a x2 y le quitamos la gravedad
    bird.setScale(2);
    bird.body.allowGravity = false;

    //Le damos velocidad hacia la izquierda
    bird.setVelocityX(Phaser.Math.Between(-150, -250));

  }

  //Creación de Bombas:
  bombs = this.physics.add.group();

  //Detectores de colisiones :
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(rocks, platforms);

  this.physics.add.collider(player, bombs, hitObstacle, null, this);
  this.physics.add.collider(player, birds, hitObstacle, null, this);
  this.physics.add.overlap(player, rocks, hitObstacle, null, this);
}

// Lo que pasa si el jugador impacta con una bomba
function hitObstacle(player, bomb) {
  //Detenemos el juego y pintamos al jugador de rojo
  this.physics.pause();

 player.anims.play("dead", true);

  gameOver = true;
}

function update() {

  if (gameOver) return;
  //Lógica de cursores
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    //Giramos el sprite del dinosaurio
    player.setFlipX(true)

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.setFlipX(false);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-530);
  }

  //Devolver el pájaro a su sitio si se sale de la pantalla
  birds.children.iterate(function (bird) {
        if (bird.x < -50) {
            bird.x = 5050;

            // Le damos una altura nueva para que no sea siempre igual
            bird.y = Phaser.Math.Between(100, 400);
        }
    });
}
