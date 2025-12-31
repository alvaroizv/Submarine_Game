const { App } = require("uWebSockets.js");
const { Server } = require("socket.io");
const usuarios = [];

const app = App();
const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: false,
  },
});

// Adjuntamos el servidor a socket.IO
io.attachApp(app);

//Establecemos un evento al conectarse una persona
io.on("connection", (socket) => {
  console.log("Nuevo dinosaurio conectado");

  usuarios.push({
    playerId: socket.id,
    x: 100,
    y: 450,
    flip: false,
  });

  //Pasamos la lista de usuarios conectados para que genere los dinosaurios
  socket.on("playerReady",(args)=>{
    socket.emit("currentPlayers", usuarios);
  })
  

  //Aqui avisamos a los demas de que se ha conectado un nuevo usuario y le pasamos sus datos
  // Con .broadcast para que no emita el mensaje al jugador que emitió ese mensaje
  socket.broadcast.emit("newPlayer",usuarios.find((item) => item.playerId === socket.id));

  //Recibimos el movimiento del Cliente
  socket.on("playerMovement", (data) =>{
    let selectedPlayer = usuarios.find((item) => item.playerId === socket.id);
    selectedPlayer.x = data.x;
    selectedPlayer.y = data.y;

    socket.broadcast.emit("playerMoved",selectedPlayer);
  })
});

//Lo ponemos a escuchar en el puerto 3000
app.listen(3000, (token) => {
  console.log("escuchando por el puerto 3000");
  if (!token) {
    console.warn("port already in use");
  }
});
