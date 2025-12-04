const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;


export class Simon {
  constructor(UI) {
    this.UIControl = UI;
    this.userSequence = [];
    this.setSequence();
    this.colorSelection = ["green","blue","yellow","red"];

    /*Invocamos a el reconocedor de Voz de la API*/
    this.voiceRecognition();
  }

  pushUserSequence = (index) => {
    if (!this.UIControl.busy) {
      this.userSequence.push(index);
      this.checkUserSequence();
    }
  };

  checkUserSequence = () => {
    console.log(this.userSequence);
    let revision = true;
    for (let index = 0; index < this.userSequence.length; index++) {
      if (this.userSequence[index] != this.UIControl.indexList[index]) {
        this.UIControl.changeMessage("Has perdido mequetrefe");
        this.UIControl.changeElementView(this.UIControl.message, "flex");
        this.UIControl.changeElementView(this.UIControl.button, "flex");
        revision = false;
        return revision;
      }
    }

    if (
      revision &&
      this.userSequence.length === this.UIControl.indexList.length
    ) {
      this.UIControl.changeMessage("Has ganado! Ejecutando siguiente ronda ");
      this.UIControl.changeElementView(this.UIControl.message, "flex");
      this.indexList = [];
      this.userSequence = [];
      this.addMoreKeys();
    }
  };

  addMoreKeys = () => {
    let random = Math.floor(
      Math.random() * this.UIControl.initial_quarter.length - 1
    );
    this.UIControl.indexList.push(random);
    console.log(this.UIControl.indexList);
    this.UIControl.play();
  };

  setSequence = () => {
    this.UIControl.indexList = [0, 1];
  };

  voiceRecognition = () =>{
   this.recognition = new SpeechRecognition();
   this.recognition.continuous = false;
   this.recognition.lang = "en-US";
   this.recognition.interimResults = false;
   this.recognition.maxAlternatives = 1;

   this.recognition.onresult = (event) =>{
    
  }

  this.recognition.onspeechend = () => {
    let result = this.recognition.stop();

    console.log(result);
  };

  }
}
