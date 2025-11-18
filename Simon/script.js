const pulsarTecla = (tecla, colorOn, colorOff) => {
  tecla.style.backgroundColor = colorOn;

  setTimeout(() => {
    tecla.style.backgroundColor = colorOff;

    setTimeout(() => {
      objetoTecla.start();
    }, 3000);
  }, 2000);
};

const encenderTecla = (tecla, colorOn, colorOff) => {
  tecla.style.backgroundColor = colorOn;

  setTimeout(() => {
    tecla.style.backgroundColor = colorOff;
  }, 100);
};


const objetoTecla = {
  teclas_Iniciales: [],
  list: [],
  user_list : [],
  total_record: [],
  setEvents: ()=>{
    objetoTecla.teclas_Iniciales.forEach(element => {
        element.id.addEventListener("click",()=>{
            //Cada vez que se haga click, se enciende y se apaga el boton, se mete a la lista de teclas del usuario, y ,
            // Se comprueba si la longitud es igual a la del historial para empezar la comparativa.
            encenderTecla(element.id,element.colorOn,element.colorOff);           
            objetoTecla.addToUserSequence(element);
            objetoTecla.comprobarLongitudes();
        }) 
    });
  },
  addInitialTeclas: (tecla, colorOn, colorOff) => {
    //Metemos las teclas iniciales al array de teclasIniciales
    objetoTecla.teclas_Iniciales.push({
      id: tecla,
      colorOn: colorOn,
      colorOff: colorOff,
    });
  },
  createSequence: ()=>{
    //Se busca una tecla inicial de manera random y se mete a la lista que se va a ejecutar.
    let random_index= Math.floor(Math.random()*objetoTecla.teclas_Iniciales.length);
    let tecla_selected = objetoTecla.teclas_Iniciales[random_index];
    objetoTecla.list.push(tecla_selected);
  },

  addToUserSequence: (element)=> {
    //Añadimos tecla a la lista del usuario
    objetoTecla.user_list.push({
        id: element.id,
        colorOn : element.colorOn,
        colorOff: element.colorOff,
    });
  },
  compararSecuencias: (a,b)=>{
    //Stringificamos las listas para compararlas, esto es entre el total_record y la del usuario
    return JSON.stringify(a) === JSON.stringify(b);
  },

  comprobarLongitudes: ()=>{
        //Si le pedimos x numero de teclas al usuario y las ha pulsado nos metemos al if
        if(objetoTecla.total_record.length === objetoTecla.user_list.length){
            console.log("Comprobando si tienes bien la secuencia");
            //Llamamos a compararSecuencias y si acierta le decimos que ganó, sino que perdió
            if(objetoTecla.compararSecuencias(objetoTecla.total_record,objetoTecla.user_list)){
                console.log("Acertaste burlancaster, ampliando Secuencia");

                //Aqui debo recuperar las teclas anteriores y añadir nuevas:
                objetoTecla.list = objetoTecla.total_record.map(v => ({
                    id: v.id,
                    colorOn: v.colorOn,
                    colorOff: v.colorOff,
                }));
                //Agrego 2 casillas mas:
                objetoTecla.createSequence();
                objetoTecla.createSequence();

                //Inicio la secuencia automática
                setTimeout(() => {
      objetoTecla.start();
                    }, 3000);
            }else{
                console.log("Perdiste tio")
            }
        }
  },
  start: () => {
    //Sacamos una tecla de la lista de teclas a ejecutar
    let teclaActual = objetoTecla.list.shift();  
    if (teclaActual != undefined){
        //Vemos que no es undefined y la agregamos al historial total y la pulsamos, llamando a la siguiente
       objetoTecla.total_record.push(teclaActual);
       pulsarTecla(teclaActual.id, teclaActual.colorOn, teclaActual.colorOff); 
    }else{
        //Cuando acaba de mostrar todas le dice al usuario que le toca a el, y que siga.
        console.log("Ahora te toca a ti introducir la secuencia");
        
    }
      
  },
};

//Añadimos las teclas Iniciales --> En este caso, sacandolas del HTML los 4 divs y sus colores
objetoTecla.addInitialTeclas(document.getElementById("teclaAzul"), "blue", "lightblue");
objetoTecla.addInitialTeclas(document.getElementById("teclaRoja"), "red", "lightcoral");
objetoTecla.addInitialTeclas(document.getElementById("teclaVerde"), "green", "lightgreen");
objetoTecla.addInitialTeclas(document.getElementById("teclaAmarillo"), "yellow", "lightyellow");

// Añadimos los addEventListener a los divs.
objetoTecla.setEvents();

//Creamos la secuencia inicial
objetoTecla.createSequence();

//Comenzamos el desplegado de la secuencia del juego
objetoTecla.start()
