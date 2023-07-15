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

  const gameFieldResolution = { width: 40, height: 20 };

  
  let theGame:Game|null ;

  theGame = canvas ? new Game({
    // gameFieldHTMLContainer,
    // playerCardHTMLContainer,
    fieldResolution: gameFieldResolution,
    canvas,
    gameCellDimentions: { width: 50, height: 50 },
  }) : null ;

  const mainLoop = function () {


    if(theGame) {

      theGame.update();
      theGame.render();
    }


    window.requestAnimationFrame(mainLoop);
  };

  window.requestAnimationFrame(mainLoop);
})();
