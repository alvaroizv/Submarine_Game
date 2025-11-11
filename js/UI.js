export const UI = {
  game: null,
  control: {
    template: null,
    board: null,
    status: null,
  },
  init: (domControl, game) => {
    UI.control.board = document.getElementById(domControl.board);
    UI.control.status = document.getElementById(domControl.status);
    UI.control.template = document.getElementById(domControl.template);
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
  generateBoard(columns_number) {
    console.log(UI.board);
    UI.control.board.style.gridTemplateColumns = `repeat(${columns_number}, 1fr)`;
    for (let index = 0; index < columns_number * columns_number; index++) {
      const clonated_template = UI.control.template.content.cloneNode(true);
      const box = clonated_template.querySelector(".box");
      UI.control.board.appendChild(box);
    }
  },
};
