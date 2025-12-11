import { UI } from "./UI.js";
import { Simon } from "./SimonGame.js";

/*Pasamos la secuencia de teclas a la UI*/
UI.init([
  {
    id: "teclaAmarillo",
    colorOn: "yellow",
    colorOff: "lightyellow",
    speechColor: "amarillo",
  },
  {
    id: "teclaAzul",
    colorOn: "blue",
    colorOff: "lightblue",
    speechColor: "azul",
  },
  {
    id: "teclaRoja",
    colorOn: "red",
    colorOff: "lightcoral",
    speechColor: "rojo",
  },
  {
    id: "teclaVerde",
    colorOn: "green",
    colorOff: "lightgreen",
    speechColor: "verde",
  },
]);

/*Pasamos id de mensaje a la UI*/
UI.setMessage({
  id: "msg",
});

UI.setEvent({
  playBtn: [
    "statusButton",
    () => {
      UI.changeElementView(UI.button, "none");
      UI.changeElementView(UI.message, "none");
      UI.play();
    },
  ],
  voiceBtn: [
    "voiceButton",
    () => {
      UI.simonGame.recognition.start();
    },
  ],
});

/*Inicializamos clase del Juego (lógica) y la enlazamos con la UI.*/
const simonSays = new Simon(UI);
UI.initGame(simonSays);
