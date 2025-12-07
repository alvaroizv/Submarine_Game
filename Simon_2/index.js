import { UI } from "./UI.js";
import { Simon } from "./SimonGame.js";


/*Pasamos la secuencia de teclas a la UI*/
UI.init([
  {
    id: "teclaAmarillo",
    colorOn: "yellow",
    colorOff: "lightyellow",
    speechColor: "amarillo"
  },
  {
    id: "teclaAzul",
    colorOn: "blue",
    colorOff: "lightblue",
    speechColor: "azul"
  },
  {
    id: "teclaRoja",
    colorOn: "red",
    colorOff: "lightcoral",
    speechColor: "rojo"
  },
  {
    id: "teclaVerde",
    colorOn: "green",
    colorOff: "lightgreen",
    speechColor: "verde"
  },
]);

/*Pasamos id del boton de juego y de el mensaje a la UI*/

UI.setButton({
  id: "statusButton",
});

UI.setMessage({
  id: "msg",
});

/*Inicializamos clase del Juego (lógica) y la enlazamos con la UI.*/
const simonSays = new Simon(UI);
UI.initGame(simonSays);