import { FormAPIBuilder } from "./FormAPIBuilder.js";

const formAPI = FormAPIBuilder.getFormAPI("formulario");

formAPI.addInput("hola", "text", "este es mi Formulario perro", false);
console.log("Formulario hecho");
