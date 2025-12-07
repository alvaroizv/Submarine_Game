import {
  animate,
  spring,
  createTimeline,
  stagger,
} from "https://esm.sh/animejs";
import { splitText } from "./node_modules/animejs/dist/modules/text/split.js";

export const UI = {
  simonGame: null,
  button: null,
  message: null,
  initial_quarter: [],
  indexList: [],
  busy: true,

  divKeys: {
    yellow: null,
    blue: null,
    red: null,
    green: null,
  },

  status: {
    ON: 1,
    OFF: 0,
  },

  init: (keyList) => {
    /*Asigno la lista de objetos de configuracion a mi array de teclas.*/
    UI.initial_quarter = keyList;

    /*Parseamos el id pasado a su elemento html*/
    for (let item of UI.initial_quarter) {
      item.id = document.getElementById(item.id);
    }

    /*Añadimos el evento a todas las teclas a traves de un bucle for*/
    UI.addEvent();
    UI.animateText();
  },

  setButton: (button) => {
    /*Añadimos el boton como propiedad del UI y su evento correspondiente*/
    UI.button = document.getElementById(button.id);
    UI.button.addEventListener("click", () => {
      UI.simonGame.recognition.start();
      UI.changeElementView(UI.button, "none");
      UI.changeElementView(UI.message, "none");
      UI.play();
    });
  },

  changeElementView: (element, status) => {
    /*Cambiamos visibilidad, ya sea para mostrar u ocultar un elemento*/
    element.style.display = status;
  },

  setMessage: (message) => {
    UI.message = document.getElementById(message.id);
  },

  changeMessage: (msg) => {
    UI.message.innerHTML = msg;
  },

  initGame: (game) => {
    UI.simonGame = game;
  },

  addEvent: () => {
    for (let item of UI.initial_quarter) {
      item.id.addEventListener("click", () => {
        /*Animacion al pulsar las teclas*/
        animate(item.id, {
          rotate: "+=360",
          duration: 700,
          ease: spring({
            bounce: 0.5,
            duration: 700,
          }),
        });
        UI.simonGame.pushUserSequence(UI.initial_quarter.indexOf(item));
      });
    }
  },

  play: async () => {
    UI.busy = true;
    for (let item of UI.indexList) {
      await UI.pushKey(UI.initial_quarter[item], UI.status.ON);
      await UI.pushKey(UI.initial_quarter[item], UI.status.OFF);
    }
    UI.busy = false;
  },
  pushKey: (selectedKey, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let color = selectedKey.colorOff;
        if (status === UI.status.ON) color = selectedKey.colorOn;

        selectedKey.id.style.backgroundColor =
          status === UI.status.ON ? selectedKey.colorOn : selectedKey.colorOff;
        resolve(true);
      }, 2000);
    });
  },

  animateText: () => {
    /*Animación de anime.js */
    /*Mi elemento lo obtiene splitText ('p'), que selecciona todos los p de mi HTML automáticamente*/
    const { words, chars } = splitText("p", {
      words: { wrap: "clip" },
      chars: true,
    });

    createTimeline({
      loop: true,
      defaults: { ease: "inOut(3)", duration: 650 },
    })
      .add(
        words,
        {
          y: [($el) => (+$el.dataset.line % 2 ? "100%" : "-100%"), "0%"],
        },
        stagger(125)
      )
      .add(
        chars,
        {
          y: ($el) => (+$el.dataset.line % 2 ? "100%" : "-100%"),
        },
        stagger(10, { from: "random" })
      )
      .init();
  },
};
