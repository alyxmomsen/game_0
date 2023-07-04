// import Game from "./game/game";
import Game from "./game/game";
import { Bullet } from "./gameobjects/bullet";
import { Player } from "./gameobjects/player";
import { LinkedList } from "./library/linked-list";
import "./styles/main.css";

(function () {

  const linkedList = new LinkedList<Player> (new Player({id:0 , position:{x:0 , y:0} , weapons:[]})) ;

  linkedList.append(new Player({id:1 , position:{x:0 , y:0} , weapons:[]})) ;
  linkedList.append(new Player({id:2 , position:{x:0 , y:0} , weapons:[]})) ;
  linkedList.append(new Player({id:3 , position:{x:0 , y:0} , weapons:[]})) ;
  linkedList.append(new Player({id:4 , position:{x:0 , y:0} , weapons:[]})) ;


  console.log(linkedList.currentIteration);
  linkedList.next();
  linkedList.next();
  linkedList.next();
  linkedList.next();
  linkedList.next();

  console.log(linkedList.currentIteration);



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
