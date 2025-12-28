  import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

  const socket = io("ws://localhost:3000");

  console.log(socket);

  socket.on("saludo", (dato)=>{
    console.log("Ha llegado un nuevo dato");
    console.log(dato);
  });

  socket.on("nuevo", (dato)=>{
    console.log("Se ha conectado");
  });

  socket.on("move", (dato)=>{
    console.log("Se ha movido");
  });

  document.getElementById("boton").addEventListener("click", ()=>{
    console.log("esto se ejecuta");
    socket.emit("move",{x:28,y:34});
  });