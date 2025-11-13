import { GameFacade } from "./GameFacade.js";

//Llamamos al Facade pasándole el tamaño de tablero que queremos
const game = new GameFacade(5);
//Inicializamos el juego
game.startNewGame();
