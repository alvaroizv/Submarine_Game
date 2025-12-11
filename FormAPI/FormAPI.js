export class FormAPI {
  controlForm = null;

  constructor(formId) {
    this.formId = formId;
    this.controlForm = [];
    this.form = document.getElementById(formId);
  }

  addInput(name, type, placeholder, required) {
    let regularExpression = null;
    this.controlForm.push({
      name: name,
      type: type,
      placeholder: placeholder,
      requiree: required,
      regularExpression: regularExpression,
    });
    this.createElementInput(name, type, placeholder, required);
  }

  buildForm() {
    // this.controlForm.forEach(inputData => {
  }

}
