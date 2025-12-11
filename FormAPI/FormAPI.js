export class FormAPI {
  controlForm = null;
  uiControl = null;

  constructor(ui) {
    this.controlForm = [];
    this.uiControl = ui;
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
    this.uiControl.createElementInput(name, type, placeholder, required);
  }

  buildForm() {
    // this.controlForm.forEach(inputData => {
  }

  clearFormInput(name) {
    this.uiControl.clearFormInput(name);
  }
}
