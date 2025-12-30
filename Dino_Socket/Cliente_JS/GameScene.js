import * as Phaser from "./node_modules/phaser/dist/phaser.esm.js";
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

export class GameScene extends Phaser.Scene {
  //Conexión al Servidor
  socket = io("ws://localhost:3000");

  platforms = null;
  player = null;
  cursors = null;
  rocks = null;
  birds = null;
  gameOver = false;
  flags = null;
  gameWon = false;

  constructor() {
    //Le pasamos una Key a la clase que será el identificador de toda la escena,
    //  tanto si queremos reiniciar como obtener datos, etc ...
    super({ key: "GameScene" });
  }

  preload() {
    // Aqui precargamos los recursos necesarios, que son las imagenes y spritesheets
    this.load.image("sky", "./assets/sky.png");
    this.load.image("ground", "./assets/platform.png");
    this.load.image("star", "./assets/star.png");
    this.load.image("bomb", "./assets/bomb.png");
    this.load.image("rock", "./assets/rock.png");
    this.load.spritesheet("bird", "./assets/BirdSprite.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("dude", "./assets/DinoSprites-doux.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("flag", "./assets/flag_animation.png", {
      frameWidth: 60,
      frameHeight: 60,
    });
  }

  create() {
    this.gameOver = false;
    this.gameWon = false;
    this.cursors = this.input.keyboard.createCursorKeys();

    // Configuración mundo y cámara
    this.physics.world.setBounds(0, 0, 5000, 600);
    this.cameras.main.setBounds(0, 0, 5000, 600);

    // Cambiamos el cielo a un tileSprite para que se repita constantemente:
    this.add.tileSprite(0, 0, 5000, 600, "sky").setOrigin(0, 0);

    // Lanzamos la UI, llamandola por su KEY.
    this.scene.launch("UIScene");

    // Metemos fisicas a las plataformas
    this.platforms = this.physics.add.staticGroup();

    // Suelo principal
    this.platforms.create(2500, 568, "ground").setScale(13, 2).refreshBody();

    // Otras plataformas aleatoriamente:
    let xActual = 500;
    let yActual = 450;
    for (let i = 0; i < 20; i++) {
      xActual += 250;
      yActual += Phaser.Math.Between(-80, 80);
      if (yActual < 200) yActual = 250;
      if (yActual > 480) yActual = 400;

      this.platforms
        .create(xActual, yActual, "ground")
        .setScale(0.5, 1)
        .refreshBody();
    }

    // Declaramos aqui el jugador porque sino se queda detrás de las anteriores capas
    this.player = this.physics.add.sprite(100, 450, "dude");

    this.cameras.main.startFollow(this.player);
    this.player.setBounce(0.2);
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(300);

    // Definimos las animaciones correspondientes:
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
    });
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("bird", { start: 9, end: 17 }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "ondulate",
      frames: this.anims.generateFrameNumbers("flag", { start: 0, end: 5 }),
      frameRate: 12,
      repeat: -1,
    });

    // Creamos las rocas del juego
    this.rocks = this.physics.add.group();
    let xRocaActual = 600;
    for (let i = 0; i < 80; i++) {
      xRocaActual += Phaser.Math.Between(200, 400);
      if (xRocaActual < 4900) {
        let rock = this.rocks.create(xRocaActual, 520, "rock");
      }
    }

    // Rocas de las plataformas (caen del cielo)
    let xRocaCielo = 600;
    for (let i = 0; i < 25; i++) {
      xRocaCielo += Phaser.Math.Between(120, 200);
      if (xRocaCielo < 4900) {
        let rock = this.rocks.create(xRocaCielo, 0, "rock");
        rock.body.setSize(20, 20);
      }
    }

    // Creamos los pájaros del juego
    this.birds = this.physics.add.group();
    for (let i = 0; i < 5; i++) {
      let bird = this.birds.create(
        Phaser.Math.Between(800, 5000),
        Phaser.Math.Between(100, 400),
        "bird"
      );

      bird.anims.play("fly", true);
      bird.setScale(2);
      bird.body.allowGravity = false;
      bird.setVelocityX(Phaser.Math.Between(-150, -250));
    }

    // Creamos la Bandera
    this.flags = this.physics.add.sprite(4950, 450, "flag");
    this.flags.anims.play("ondulate", true);

    // Detectores de colisiones :
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.rocks, this.platforms);
    this.physics.add.collider(this.flags, this.platforms);

    this.physics.add.collider(
      this.player,
      this.birds,
      this.hitObstacle,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.rocks,
      this.hitObstacle,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.flags,
      this.finishGame,
      null,
      this
    );

    // Creamos grupo de jugadores, ya que si lo hacemos desde una variable, al querer mover al primer jugador no lo tenemos guardado, pues se machaca su contenido
    this.otherPlayers = this.physics.add.group();

    this.physics.add.collider(this.otherPlayers, this.platforms);

    this.physics.add.collider(
      this.otherPlayers,
      this.birds,
      this.hitObstacle,
      null,
      this
    );
    this.physics.add.overlap(
      this.otherPlayers,
      this.rocks,
      this.hitObstacle,
      null,
      this
    );
    this.physics.add.overlap(
      this.otherPlayers,
      this.flags,
      this.finishGame,
      null,
      this
    );

    //Escucha de eventos por si hay un jugador conectado
    this.socket.on("newPlayer", (data) => {
      this.addNewPlayer(data);
    });

    //Escuchamos si hay jugadores conectados previamente a nosotros
    this.socket.on("currentPlayers", (userList) => {
      userList.forEach((player) => {
        
        //Nos aseguramos de que no sea el cliente actual para añadirlo
        if (player.playerId != this.socket.id) this.addNewPlayer(player);  
      });
    });
  }

  update() {
    if (this.gameOver) return;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-500);
      this.player.setFlipX(true);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(500);
      this.player.setFlipX(false);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-430);
    }

    // Devolver el pájaro a su sitio si se sale de la pantalla
    this.birds.children.iterate((bird) => {
      if (bird.x < -50) {
        bird.x = 5050;
        bird.y = Phaser.Math.Between(100, 400);
      }
    });
  }

  hitObstacle(player, bomb) {
    this.physics.pause();
    this.player.anims.play("dead", true);
    this.gameOver = true;
    //Llamamos a la UI para que cambie el mensaje
    this.scene.get("UIScene").mostrarMuerte();
  }

  finishGame(player, flag) {
    this.physics.pause();
    this.player.anims.play("turn", true);
    this.gameWon = true;

    this.scene.get("UIScene").mostrarVictoria();
  }

  addNewPlayer(playerConfig){
    //Creo el Sprite del nuevo jugador
    const newPlayer = this.physics.add.sprite(playerConfig.x, playerConfig.y, "dude");

    //Guardo su ID para más adelante en un nuevo atributo
    newPlayer.playerId = playerConfig.playerId;

    //Le asigno sus propieades correspondientes
    newPlayer.setBounce(0.2);
    newPlayer.setScale(2);
    newPlayer.setCollideWorldBounds(true);
    newPlayer.body.setGravityY(300);

    //Lo añado al grupo para no perderlo
    this.otherPlayers.add(newPlayer);
  }
}
