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
    /*Animamos el texto del botón de Jugar.*/
    UI.animateText();
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

  setEvent: (domControl) => {
    /*Guardo el boton ya que luego lo necesito para ocultarlo/mostrarlo*/
    UI.button = document.getElementById(domControl.playBtn[0]);
    document
      .getElementById(domControl.playBtn[0])
      .addEventListener("click", () => {
        domControl.playBtn[1]();
      });

    document
      .getElementById(domControl.voiceBtn[0])
      .addEventListener("click", () => {
        domControl.voiceBtn[1]();
      });
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
    /*Cambiamos al estado ocupado y luego a libre*/
    UI.busy = true;
    /*De manera asíncrona, vamos encendiendo y apagando las luces, siempre esperandose unas a otras (await) mediante Promesas */
    for (let item of UI.indexList) {
      await UI.pushKey(UI.initial_quarter[item], UI.status.ON);
      await UI.pushKey(UI.initial_quarter[item], UI.status.OFF);
    }
    UI.busy = false;
  },
  pushKey: (selectedKey, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        /*Obtenemos el color y segun el estado de la ficha en concreto le ponemos uno u otro */
        let color = selectedKey.colorOff;
        if (status === UI.status.ON) color = selectedKey.colorOn;

        selectedKey.id.style.backgroundColor =
          status === UI.status.ON ? selectedKey.colorOn : selectedKey.colorOff;
        resolve(true);
      }, 1000);
    });
  },

  /*Metodo para iluminar una tecla por voz */
  illuminateKey: async (selectedKey) => {
    await UI.pushKey(selectedKey, UI.status.ON);
    await UI.pushKey(selectedKey, UI.status.OFF);
  },

  animateText: () => {
    /*Animación de anime.js */
    /*Mi elemento lo obtiene splitText ('p'), que selecciona el primer "p" de mi HTML automáticamente*/
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
