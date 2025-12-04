export const UI = {
  simonGame: null,
  button: null,
  message: null,
  initial_quarter: [],
  indexList: [],
  busy: false,

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
    UI.addEvent();
  },

  setButton: (button) => {
    UI.button = document.getElementById(button.id);
    UI.button.addEventListener("click", () => {
      UI.changeElementView(UI.button, "none");
      UI.changeElementView(UI.message, "none");
      UI.play();
    });
  },

  changeElementView: (element, status) => {
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
};
