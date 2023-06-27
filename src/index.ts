// import Game from "./game/game";
import Game from "./game/game";
import "./styles/main.css";

(function () {
  const root = document.querySelector<HTMLElement>(".root");
  const UI = document.querySelector<HTMLElement>("#stats-display");

  const fieldDimentions = { width: 40, height: 20 };
  const theGame = new Game({ root, UI, fieldDimentions });

  const mainLoop = function () {
    theGame.update();
    theGame.render(root);

    window.requestAnimationFrame(mainLoop);
  };

  window.requestAnimationFrame(mainLoop);
})();
