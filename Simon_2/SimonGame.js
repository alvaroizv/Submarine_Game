/*Inicializamos constantes de la API WebSpeech*/
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

export class Simon {
  constructor(UI) {
    // Pasamos la interfaz como parámetro, inicializamos la secuencia de usuario y la secuencia del juego
    this.UIControl = UI;
    this.userSequence = [];
    this.isFirst = true;
    this.setSequence();
    

    /*Invocamos a el reconocedor de Voz de la API*/
    this.voiceRecognition();
  }

  pushUserSequence = (index) => {
    /*Al hacer click en el boton solo hacemos las acciones si NO esta ocupado*/
    if (!this.UIControl.busy) {
      this.userSequence.push(index);
      this.checkUserSequence();
    }
  };

  checkUserSequence = () => {
    let revision = true;
    /*Comprobamos si los arrays son iguales mediante un for con un if anidado*/
    for (let index = 0; index < this.userSequence.length; index++) {
      if (this.userSequence[index] != this.UIControl.indexList[index]) {
        this.UIControl.changeMessage("Has perdido mequetrefe");
        this.UIControl.changeElementView(this.UIControl.message, "flex");
        this.UIControl.changeElementView(this.UIControl.button, "flex");
        revision = false;
        return revision;
      }
    }

     // Si la revisión es verdadera y la secuencia del usuario es igual en longitud a la del juego, avanzamos de ronda
    if (
      revision &&
      this.userSequence.length === this.UIControl.indexList.length
    ) {
      this.UIControl.changeMessage("Has ganado! Ejecutando siguiente ronda ");
      this.UIControl.changeElementView(this.UIControl.message, "flex");
      this.userSequence = [];
      /*Establecemos que ya no es la primera vez que se juega, para que inicie la secuencia automaticamente, sin necesidad de interacción del usuario*/
      this.isFirst = false;
      /*Añadimos más teclas*/
      this.addMoreKeys();
    }
  };

  addMoreKeys = () => {
     // Buscamos una tecla de la lista de manera aleatoria y se la pasamos directamente al índice de la lista.
    let random = Math.floor(
      Math.random() * this.UIControl.initial_quarter.length
    );

    this.UIControl.indexList.push(random);
    // Le damos a jugar otra vez directamente,solo si no es la primera vez, ya que sino se iniciaria automaticamente.
    if(!this.isFirst){
      this.UIControl.play();
    } 
  };

  setSequence = () => {
    this.addMoreKeys();
  };

  voiceRecognition = () => {
    let resultados = null;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.lang = "en-US";
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event) => {
       console.log(event.results[0][0].transcript);
       resultados = event.results;
    };

    this.recognition.onspeechend = () => {
      console.log(resultados);
    };
  };
}
