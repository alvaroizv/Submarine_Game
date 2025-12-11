export class FormAPI {
  controlForm = null;
  uiControl = null;

  constructor(ui) {
    this.controlForm = [];
    this.uiControl = ui;
  }

  addInput(name, type, placeholder, required) {
    //let regularExpression = null;
    this.controlForm.push({
      name: name,
      type: type,
      placeholder: placeholder,
      required: required,
      //regularExpression: regularExpression,
    });
    this.uiControl.createElementInput(name, type, placeholder, required);
  }

  buildForm() {
    this.controlForm.forEach((item) => {});
  }

  getRegularExpression(regexType) {
    let found = false;
    const regexList = {
      dni: "^[0-9]{8}[A-Z]$",
      email: "^.+@.+..+$",
    };

    Object.values(regexList).forEach((item) => {
      if (item === regexType) return item;
    });

    return null;
  }

  addError(name, message, regex) {}

  clearFormInput(name) {
    this.uiControl.clearFormInput(name);
  }
}
