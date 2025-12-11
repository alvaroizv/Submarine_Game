import { FormAPIBuilder } from "./FormAPIBuilder.js";

const formAPI = FormAPIBuilder.getFormAPI("formulario");

formAPI.addInput("hola", "text", "este es mi Formulario perro", false);
console.log("Formulario hecho");

formAPI.addError(
  "hola",
  "Este es mi mensaje de error",
  formAPI.getRegularExpression("email")
);
// buildForm();
// addRegularExpresion();
// getExpression()
// y tmb el build
