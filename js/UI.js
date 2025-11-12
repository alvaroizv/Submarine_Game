export const UI = {
  game: null,
  control: {
    template: null,
    board: null,
    status: null,
    columns_number: null,
  },
  userActivity: {
    inputX: null,
    inputY: null,
  },
  init: (domControl, game) => {
    UI.control.board = document.getElementById(domControl.board);
    UI.control.status = document.getElementById(domControl.status);
    UI.control.template = document.getElementById(domControl.template);
    UI.control.columns_number = domControl.columns_number;

    //Asiganmos a los atributos de UI el contenido que tengan los inputs:
    UI.userActivity.inputX = document.getElementById(domControl.x);
    UI.userActivity.inputY = document.getElementById(domControl.y);
  },
  setEvent: (domControl) => {
    document
      .getElementById(domControl.btnShot[0])
      .addEventListener("click", () => {
        domControl.btnShot[1]();
      });
  },
  start(game) {
    UI.game = game;
    UI.control.status.textContent = "Juego iniciado";
  },
  changeStatus(newStatus) {
    UI.control.status.textContent = newStatus;
  },
  generateBoard() {
    UI.control.board.style.gridTemplateColumns = `repeat(${UI.control.columns_number}, 1fr)`;
    for (
      let index = 0;
      index < UI.control.columns_number * UI.control.columns_number;
      index++
    ) {
      const clonated_template = UI.control.template.content.cloneNode(true);
      const box = clonated_template.querySelector(".box");
      box.textContent = index + 1;
      UI.control.board.appendChild(box);
    }
  },
};
