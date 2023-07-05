// import Game from "./game/game";
import Game from "./game/game";
import { Bullet } from "./gameobjects/bullet";
import { Player } from "./gameobjects/player";
import { LinkedList } from "./library/linked-list";
import "./styles/main.css";

import f from './images/image.jpg' ;



(function () {


  const root = document.querySelector<HTMLElement>(".root");
  const gameFieldHTMLContainer =
    document.querySelector<HTMLElement>("#game-field");
  const playerCardHTMLContainer =
    document.querySelector<HTMLElement>("#player-stats");

  const canvas = document.querySelector("canvas");

  const gameFieldResolution = { width: 40, height: 20 };
  const theGame = new Game({
    // gameFieldHTMLContainer,
    // playerCardHTMLContainer,
    fieldResolution: gameFieldResolution,
    canvas,
    gameCellDimentions: { width: 50, height: 50 },
  });

  const mainLoop = function () {
    theGame.update();
    theGame.render(root);

    window.requestAnimationFrame(mainLoop);
  };

  window.requestAnimationFrame(mainLoop);
})();
