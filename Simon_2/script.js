import { UI } from "./UI.js";
import { Simon } from "./Simon2.js";
import { animate } from "animejs";

UI.init([
  {
    id: "teclaAmarillo",
    colorOn: "yellow",
    colorOff: "lightyellow",
  },
  {
    id: "teclaAzul",
    colorOn: "blue",
    colorOff: "lightblue",
  },
  {
    id: "teclaRoja",
    colorOn: "red",
    colorOff: "lightcoral",
  },
  {
    id: "teclaVerde",
    colorOn: "green",
    colorOff: "lightgreen",
  },
]);

UI.setButton({
  id: "statusButton",
});

UI.setMessage({
  id: "msg",
});

/*Inicializamos clase del Juego (lógica)*/
const simonSays = new Simon(UI);
UI.initGame(simonSays);
