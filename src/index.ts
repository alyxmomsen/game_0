// import Game from "./game/game";
// import f from './images/image.jpg' ;
// import fff from './images/image.jpg' ;

import Game from "./game/game";
import { Bullet } from "./gameobjects/bullet";
import { Player } from "./gameobjects/player";
import { LinkedList } from "./library/linked-list";
import "./styles/main.css";

(function () {
  const root = document.querySelector<HTMLElement>(".root");
  const gameFieldHTMLContainer =
    document.querySelector<HTMLElement>("#game-field");
  const playerCardHTMLContainer =
    document.querySelector<HTMLElement>("#player-stats");

  const canvas = document.querySelector("canvas");

  const gameFieldResolution = { horizontal: 50, vertical: 50 };

  let theGame: Game | null;

  theGame = canvas
    ? new Game({
        fieldResolution: gameFieldResolution,
        gameCellDimentions: { width: 100, height: 100 },
        canvas,
      })
    : null;

  const mainLoop = function () {
    if (theGame) {
      theGame.update();
      theGame.render();
    }

    window.requestAnimationFrame(mainLoop);
  };

  window.requestAnimationFrame(mainLoop);
})();
