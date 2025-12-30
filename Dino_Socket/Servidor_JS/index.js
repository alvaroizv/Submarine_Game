const { App } = require("uWebSockets.js");
const { Server } = require("socket.io");
const usuarios = [];

const app = App();
const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: false
  }
});

// Adjuntamos el servidor a socket.IO
io.attachApp(app);


//Establecemos un evento al conectarse una persona
io.on("connection", (socket) => {
  console.log("Nuevo dinosaurio conectado");
  //Metemos en el array de usuarios los datos del usuario
  usuarios.push({
    playerId: socket.id,
    x: 100,
    y:450,
    flip:false,
  })

  //Aqui avisamos a los demas de que se ha conectado un nuevo usuario y le pasamos sus datos
  socket.broadcast.emit("newPlayer",usuarios.find((item) => item.playerId === socket.id ));

  /*Cuando al servidor le llegue un evento de tipo move,hace lo siguiente
  socket.on("move", (datos)=>{
        console.log("Nuevo movimiento");

        usuarios.forEach(element => {
          /*Todos los sockets emiten un evento de tipo move
            element.emit("move",{contenido:"se ha movido"});
        });
    });
  usuarios.push(socket);
  usuarios.forEach(element => {
    element.emit("nuevo",{contenido:"se ha conectado un nuevo usuario"});
  });*/
});



// Lo ponemos a escuchar en el puerto 3000
app.listen(3000, (token) => {
    console.log("escuchando por el puerto 3000");
  if (!token) {
    console.warn("port already in use");
  }
});
