export const UI = {
  //
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
    //Asignamos los objetos HTML a los atributos de la UI
    UI.control.board = document.getElementById(domControl.board);
    UI.control.status = document.getElementById(domControl.status);
    UI.control.template = document.getElementById(domControl.template);
    UI.control.columns_number = domControl.columns_number;
    UI.control.restart = document.getElementById(domControl.restart_button);

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
  //Generamos el tablero utilizando el template de HTML y la propiedad CSS grid.
  generateBoard() {
    UI.control.board.style.gridTemplateColumns = `repeat(${UI.control.columns_number}, 1fr)`;
    for (
      let index = 0;
      index < UI.control.columns_number * UI.control.columns_number;
      index++
    ) {
      //Clonamos el contenido de la plantilla y por si acaso filtramos por las cajas, que son lo que nos interesan
      const clonated_template = UI.control.template.content.cloneNode(true);
      const box = clonated_template.querySelector(".box");
      box.textContent = `${Math.floor(index / UI.control.columns_number)},${
        index % UI.control.columns_number
      }`;
      UI.control.board.appendChild(box);
    }
  },
  //Buscamos todas las cajas y cambiamos su contenido a 3, solo para la que le venga por parámetro
  changeInnerContent(x, y) {
    let arrayBoxes = document.getElementsByClassName("box");
    for (let index = 0; index < arrayBoxes.length; index++) {
      if (arrayBoxes[index].textContent === `${x},${y}`) {
        arrayBoxes[index].textContent = 3;
      }
    }
  },
  //Buscamos todas las cajas y reducimos su contenido desplegado en 1,siempre que se cumpla el if
  reduceInnerContent() {
    let arrayBoxes = document.getElementsByClassName("box");
    for (let index = 0; index < arrayBoxes.length; index++) {
      if (
        arrayBoxes[index].textContent <= 3 &&
        arrayBoxes[index].textContent != 0
      ) {
        arrayBoxes[index].textContent--;
      }
    }
  },
  //Esto no lo uso, ya que me quedé a medias "pensando" en un botón de restart.
  restartInnerContent() {
    let arrayBoxes = document.getElementsByClassName("box");
    for (let index = 0; index < arrayBoxes.length; index++) {
      arrayBoxes[index].textContent = `${Math.floor(
        index / UI.control.columns_number
      )},${index % UI.control.columns_number}`;
    }
  },
};
