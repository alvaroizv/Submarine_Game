Buenas noches Raul. Acabo de terminar la primera práctica y quiero comentarte como ha ido.

En primer lugar me he desenvolvido bien con la plantilla, pues atendí bastante cuando la explicastes y no me ha resultado un problema. 
Cuando veas mi proyecto, verás algunas cosas como que he utilizado un Set, simplemente lo he utilizado porque ví en Mozilla.JS, concretamente en la sección Array.from a Set. No te preocupes que he aprendido lo que es.

Pasando al otro plato fuerte de mi proyecto, he "intentado" utilizar el patrón de diseño Facade, aunque, viendo la web que vimos en clase, sobre cómo lo explicaba, lo veo algo escueto. Pero bueno, ya me comentarás.
Para su realización simplemente he pillado toda la lógica que tenía en el game.js (lo que para mi es el main) y la he pasado a otra clase con varios métodos que se llaman entre sí.

He de decir también que el Facade ha sido lo último que he hecho, ya que basandome en la manera en la que lo he realizado era lo que más sentio tenía.

He intentado recrear la fórmula de los vecinos que tu utilizastes, aunque, en vez de copiar y pegar de nuestras otras versiones, he decidido intentarlo por mi mismo, ya que el tema de los enums y tal no es mi fuerte.

Otras complicaciones que se me han dado es hacer el rastro, pues al tener que atacar la interfaz no tenía tan claro el orden lógico de el cambio del contenido en dicha UI.
También lo he realizado atacando directamente a la UI, lo que luego me ha dado que pensar diversas mejoras que verás más adelante

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
