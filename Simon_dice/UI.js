export const UI = {
  board: null,
  control: {
    template: null,
    colorArray: null,
  },

  init: (config) => {
    template = document.getElementById(config.board);
    this.setcolorArray();
  },

  setcolorArray: (initial_colors) => {
    colorArray = initial_colors;
  },
};
