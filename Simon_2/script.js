import { UI } from "./UI.js";
import { Simon } from "./Simon2.js";

/*Inicializamos clase del Juego (lógica)*/
const simonSays = new Simon();

UI.init({
    /*Pasamos el elemento HTML de las teclas*/
    yellow : "teclaAmarillo",
    blue   : "teclaAzul",
    green  : "teclaVerde",
    red    : "teclaRoja",

    /*Pasamos los colores de encendido, por si el usuario quiere configurarlos*/
    yellowColorOn: "yellow",
    blueColorOn  : "blue",
    greenColorOn : "green",
    redColorOn   : "red",
})

UI.setSequence([0, 1, 1, 3, 2, 1]);

UI.sequence();



