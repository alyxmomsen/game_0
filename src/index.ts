// import Game from "./game/game";
import Game from "./game/game";
import "./styles/main.css";

(function () {
  const start = true;
  const root = document.querySelector<HTMLElement>(".root");
  const infcDisplay = document.querySelector<HTMLElement>("#stats-display");

  if (!start) {
    console.log("switched off");
    return false;
  } else {
    console.log("switched on");
  }

  if (!root) {
    console.log("no root");
    return false;
  } else {
    console.log("root is exist");
  }

  const time = new Date();
  const fieldDimentions = { width: 40, height: 20 };
  const theGame = new Game({ root, infcDisplay, fieldDimentions });

  const mainLoop = function () {
    theGame.update();
    theGame.render(root);

    window.requestAnimationFrame(mainLoop);
  };

  window.requestAnimationFrame(mainLoop);
})();
