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

io.attachApp(app);

io.on("connection", (socket) => {
  console.log("Ha llegado nueva conexion");
  socket.on("move", (socket)=>{
        console.log("Nuevo movimiento");
        usuarios.forEach(element => {
            element.emit("move",{contenido:"se ha movido"});
        });
    });
  socket.emit("saludo",{contenido:"hola buenos dias"});
  usuarios.push(socket);
  usuarios.forEach(element => {
    element.emit("nuevo",{contenido:"se ha conectado un nuevo usuario"});
  });
});



app.listen(3000, (token) => {
    console.log("escuchando por el puerto 3000");
  if (!token) {
    console.warn("port already in use");
  }
});
