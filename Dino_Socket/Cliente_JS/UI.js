import { GameScene } from "./GameScene.js";
import { UIScene } from "./UIScene.js";

export class UI {
  game = null;
  restart = null;

  constructor(restartId,game) {
    
    this.restart = document.getElementById(restartId);
    this.game = game;

    console.log(this.restart);
  }

  addEvents() {
    this.restart.addEventListener("click", () => {
      this.game.scene.getScene("GameScene").scene.restart();
      this.game.scene.getScene("UIScene").scene.restart();
    });
  }
}
