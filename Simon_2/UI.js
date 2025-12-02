export const UI = {
  simonGame : null,
  initial_quarter: [],
  list: [],
  indexList: [],

  status: {
    ON: 1,
    OFF: 0,
  },

  keys: {
    yellow: null,
    blue: null,
    green: null,
    red: null,
  },

  colorOn: {
    yellow:null,
    blue:null,
    green:null,
    red:null,
  },

  init : (domConfig) => {
    /*Asignamos div del HTML a la UI*/
    UI.keys.yellow = document.getElementById(domConfig.yellow);
    UI.keys.blue = document.getElementById(domConfig.blue);
    UI.keys.green = document.getElementById(domConfig.green);
    UI.keys.red = document.getElementById(domConfig.red);

    /*Asignamos colores de encendido*/
    UI.colorOn.yellow = domConfig.yellowColorOn;
    UI.colorOn.blue = domConfig.blueColorOn;
    UI.colorOn.green = domConfig.greenColorOn;
    UI.colorOn.red = domConfig.redColorOn;
    UI.addInitialKey();
  },

  addInitialKey: () => {
    /*Recorremos las teclas para meterlas en el array de teclas Iniciales, ya que podemos tener 4 o 5 más x ejemplo*/
    /*Parseamos las propiedades de keys y las de colores a un array*/
    let keyArray= Object.values(UI.keys);
    let colorArray= Object.values(UI.colorOn);

    console.log(UI.keys.yellow.style.backgroundColor);
    /*console.log(getComputedStyle(UI.keys.red).backgroundColor);
    /*document.getElementById("teclaAmarillo").style.backgroundColor = "blue";*/

    keyArray.forEach((item, index) =>{
      console.log(item.style.backgroundColor);
      UI.initial_quarter.push({
        id: item,
        colorOn : colorArray[index],
        colorOff : getComputedStyle(item).backgroundColor,
      })
    })

    console.log(UI.initial_quarter)
    console.log(UI.initial_quarter[0].colorOff);
  },
  setSequence: (simonSequence) => {
    UI.indexList = simonSequence;
  },
  sequence: async () => {
    for ( let item of UI.indexList){
        await UI.pushKey(
        UI.initial_quarter[item],
        UI.status.ON
      );
      await UI.pushKey(
        UI.initial_quarter[item],
        UI.status.OFF
      );
    }
    },
  pushKey: (selectedKey, status) => {
    return new Promise((resolve) => {
      console.log(selectedKey);
      setTimeout(() => {
        let color = selectedKey.colorOff;
        if (status === UI.status.ON) color = selectedKey.colorOn;

        selectedKey.id.style.backgroundColor = (status === UI.status.ON ) ? selectedKey.colorOn : selectedKey.colorOff;
        resolve(true);
      }, 2000);
    });
  },
};


