**PRACTICA 2: SIMÓN**
Buenos días/tardes/noches, Raúl, dependiendo de la hora a la que mires esto.

En cuanto a la realización del proyecto, no me ha parecido excesivamente compleja, pues al haber visto en clase las Promesas y la separación UI–Lógica, no me ha resultado tan difícil.

También es verdad que la primera versión que hice del Simón fue todo junto en una clase y sin Promesas. Pero, al trabajar antes de tiempo, la lógica ya la tenía en mente desde el primer momento en el que empecé, algo que, sin haberlo valorado previamente, me ha ayudado mucho para esta versión definitiva.

Sobre todo, me ha servido mucho tu estrategia enseñada en clase: empezar pasito a pasito y luego ir a cosas más grandes.

Donde he tenido algunos quebraderos de cabeza ha sido con el tema de las APIs/librerías:

Por parte de anime.js, la verdad es que los ejemplos que ponían eran demasiado complejos y específicos, y no encajaban mucho con la idea del Simón. Para aprender a utilizar la animación que hay en el juego (la vuelta de 360 grados), he tenido que leer la documentación de dicha API. Tampoco ha sido tedioso, pero no estaba tan al alcance como pensaba.

La he importado de manera local mediante npm install y también usando URLs que apuntan al sitio web. No sé cuál es la más correcta, pero la verdad es que poner la ruta relativa entera no me parece lo más rápido.

El caso totalmente contrario me ha sucedido con WebSpeech API, donde, con la poca documentación que había en Mozilla JS, estaba tan bien concentrada que me ha servido para realizar las pruebas por voz.

Eso sí, se me ha quedado en el tintero jugar con la secuencia, pues investigando descubrí que con la propiedad continuous puedes permitir la escucha de más de una palabra a la vez. Pero claro, no sabía cómo recoger los resultados para después procesarlos y “sustituirlos” por lo que serían los clics (esto último sí que lo sabría hacer, pero no cómo obtener esos datos).

Al tener una palabra por instancia, también había pensado en ir diciendo cada color continuamente, pero luego lo vi demasiado tosco y poco intuitivo para el usuario, por lo que lo he dejado estar esperando tu validación/consejo.

Para que el usuario detecte que ha tocado las teclas, he añadido el giro. Me habría gustado poner alguna luz, pero pensé que podría llegar a confundirse fácilmente con lo que es la secuencia de la máquina.

Y poco más, la verdad. He intentado utilizar un método para poner los eventos correspondientes, pero al asignar directamente el array a las teclas en el método init, no sabía cómo separar de ahí los diferentes botones si los metía.

Como opinión personal, me ha gustado mucho hacer este proyecto y he aprendido bastante. Te parecerá raro o no, pero cada día me gusta más aprender sobre programación y codificar.

Un saludo,
Álvaro Becerril Robles
---
**PRACTICA 1 : SUBMARINO**
Buenas noches Raul. Acabo de terminar la primera práctica y quiero comentarte como ha ido.

En primer lugar me he desenvolvido bien con la plantilla, pues atendí bastante cuando la explicastes y no me ha resultado un problema. 
Cuando veas mi proyecto, verás algunas cosas como que he utilizado un Set, simplemente lo he utilizado porque ví en Mozilla.JS, concretamente en la sección Array.from a Set. No te preocupes que he aprendido lo que es.

Pasando al otro plato fuerte de mi proyecto, he "intentado" utilizar el patrón de diseño Facade, aunque, viendo la web que vimos en clase, sobre cómo lo explicaba, lo veo algo escueto. Pero bueno, ya me comentarás.
Para su realización simplemente he pillado toda la lógica que tenía en el game.js (lo que para mi es el main) y la he pasado a otra clase con varios métodos que se llaman entre sí.

He de decir también que el Facade ha sido lo último que he hecho, ya que basandome en la manera en la que lo he realizado era lo que más sentio tenía.

He intentado recrear la fórmula de los vecinos que tu utilizastes, aunque, en vez de copiar y pegar de nuestras otras versiones, he decidido intentarlo por mi mismo, ya que el tema de los enums y tal no es mi fuerte.

Otras complicaciones que se me han dado es hacer el rastro, pues al tener que atacar la interfaz no tenía tan claro el orden lógico de el cambio del contenido en dicha UI.
Esto luego me ha dado que pensar diversas mejoras que verás más adelante

Además, he tenido bastantes quebraderos de cabeza con obtener el valor de los inputs del usuario, ya que en un primer momento, los tenía en tipo texto en vez de en numérico, y luego se me ocurrió en mi "gran idea" 
poner que su valor se obtenga directamente al inicializar la interfaz, FALLO GARRAFAL, pues el valor era nulo, y siempre me salía undefined o NaN.....

Luego he tenido que aprender de pasar String a Int, que no es nada del otro mundo pero bueno, ahí está también.

Me llevo una sensación amarga, como tú miles de veces nos has dicho, me quedo contento de que las cosas funcionan pero ves que has hecho tu primer programilla cutrillo y "horroroso" de primerillo.

Seguiré trabajando en mi casa una o varias versiones, ya que he detectado estas 4 mejoras:

  - Poner 3 modos con 3 botones, y luego ya desplegar el teclado
  - Botón de Reinicio
  - Hacer algo con las casillas que se rellenan con 0 (Y si pasa por una que ya ha estado, el rastro se pierde ???)
  - Refactorización de Clases, con la creación de nuevas o moviendo algunas

Por último te tengo que comentar que he intentado lo del reinicio (te he dejado la función en UI.js), pero no me ha dado tiempo del todo y era un poco mierdón, pues se quedaba bastante roto luego de darle y no limpiaba todo bien.
Luego he intentado hacerlo con el Facade pero tampoco he tenido mucho éxito ya que no sabía limpiar el tablero previo y luego crear un nuevo "juego"

En el último punto de esa lista, había pensando en más o menos dejar GameSubmarine.js como tú nos lo distes, y que el submarino sea una clase aparte (Un hijo ¿?), así si quieres meter un tanque de guerra, pues cambias la clase asociada y ya está.

En fin, como opinión personal, he tenido momentos en blanco, otros donde todo salía rápido, otros de frustación y otros de alegría.

Estoy deseando comenzar otro proyecto, y ver que depara la "dura" vida del programador.

Un saludo profesor, nos vemos en el aula.

Álvaro Becerril Robles
