import { UI } from "./UI.js";
import { Simon } from "./Simon2.js";
import { splitText } from './node_modules/animejs/dist/modules/text/split.js';
import { createTimeline, stagger, utils } from 'https://esm.sh/animejs';


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

/*Inicializamos clase del Juego (lógica) y la enlazamos con la UI.*/
const simonSays = new Simon(UI);
UI.initGame(simonSays);

/*Animación de anime.js */
/*Mi elemento lo obtiene splitText ('p'), que selecciona todos los p de mi HTML automáticamente*/
const { words, chars } = splitText('p', {
  words: { wrap: 'clip' },
  chars: true,
});

createTimeline({
  loop: true,
  defaults: { ease: 'inOut(3)', duration: 650 }
})
.add(words, {
  y: [$el => +$el.dataset.line % 2 ? '100%' : '-100%', '0%'],
}, stagger(125))
.add(chars, {
  y: $el => +$el.dataset.line % 2 ? '100%' : '-100%',
}, stagger(10, { from: 'random' }))
.init();
