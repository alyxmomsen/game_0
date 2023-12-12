// import Game from "./game/game";
// import f from './images/image.jpg' ;
// import fff from './images/image.jpg' ;

import Game from "./game/game";
import { Bullet } from "./gameobjects/bullet";
import { Player } from "./gameobjects/player";
import LocationManager from "./library/location-manager";
import { LinkedList } from "./library/linked-list";
import "./styles/main.css";

(function () {
  const root = document.querySelector<HTMLElement>(".root");
  const gameFieldHTMLContainer =
    document.querySelector<HTMLElement>("#game-field");
  const playerCardHTMLContainer =
    document.querySelector<HTMLElement>("#player-stats");

  const canvas = document.querySelector<HTMLCanvasElement>("#main-canvas");

  // canvas?.style.display = ''
  // const gameFieldResolution = { horizontal: 20, vertical: 20 };

  let theGame: Game | null;

  theGame = canvas
    ? new Game({
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

/* const secondCanvas =
  document.querySelector<HTMLCanvasElement>("#second-canvas");

const mapManager = new LocationManager({ doors: 4 });

type Directions = "up" | "right" | "down" | "left";

let directions: Directions[] = ["up", "right", "down", "left"];

// mapManager.

do {
  const directionID = Math.floor(Math.random() * directions.length);
  const direction = directions[directionID];

  const result = mapManager.setCell(direction , 'path');

  if (result === false) {
    directions = directions.filter((elem) => elem !== direction);
  } else {
    directions = ["up", "right", "down", "left"];
  }
} while (directions.length > 0);

console.log("map manager : ", mapManager);
// console.log(mapManager);

let ctx_: CanvasRenderingContext2D | null = null;

// secondCanvas?.width
if (secondCanvas) {
  secondCanvas.width = 1000;
  secondCanvas.height = 1000;

  ctx_ = secondCanvas.getContext("2d");
}

if (ctx_) {
  mapManager.resetIterator();

  let cell = mapManager.getCell();

  let last: { x: number; y: number } | undefined;

  while (cell) {
    ctx_.fillStyle = "white";
    ctx_.fillRect(cell.x * 25 + 600, cell.y * 25 + 600, 24, 24);

    cell = mapManager.getCell();
  }
}

//

console.log(secondCanvas); */
