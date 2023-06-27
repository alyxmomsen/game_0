
import GameObject, { Dimentions } from "../gameobjects/gameobject";
import { Player } from "../gameobjects/player";
import { IDManager } from "../library/id_manager";
import KeysManager from "../library/keysManager";
import { Tick, buildField, generateColor } from "../library/main";
import { Weapon } from "../library/weapon";

export default class Game {
  // hero: GameObject = null;
  field: { dimentions: Dimentions };

  enemies: GameObject[] = [];
  gameObjects: GameObject[] = [];
  bullets: GameObject[] = [];
  
  player: Player; // объект игрока

  weapons: Weapon[];

  
  keysManager: KeysManager = null; // Объект менеджера ключей клавиш

  IDManager: IDManager;

  /* ======== html ========== */

  infcDisplay: HTMLElement = null;

  /* ======================== */

  
    

  update() {
    /* Game управляет действиями Player (bdw, возможно они названны иначе, но это "пока" )
    на самом деле, как правило, игра сама наносит урон другим объектам, не создавая событие Attack у Player

    так же Player, как и другие объекты могут генерировать состояния такие как голод , усталость и т. д. */

    // получение ключей нажатых клавиш
    const keys = this.keysManager.getPressedKeys();

    this.player.update({keys , objects:[]});

    this.bullets ;

    

    

    

    
    this.player.update({ keys, objects: [] });

    // const diedEnemies: GameObject[] = [];

    this.enemies.forEach((enemy, i) => {
      enemy.update({
        keys,
        objects: [/* ...this.bullets */],
      });
    });

    // delete diedEnemies[0];
  }

  renderGameObject({ elem, field }: { elem: GameObject; field: HTMLElement }) {
    if (
      !elem.isDied &&
      field &&
      field.childNodes[0]?.childNodes[elem.position.y]?.childNodes[
        elem.position.x /* если html нода с такими координатами существет */
      ] !== undefined
    ) {
      field.childNodes[0]?.childNodes[elem.position.y]?.childNodes[
        elem.position.x
      ].appendChild(elem.main_html_element);
      elem.main_html_element.style.display = "block";
      elem.render();
    } else {
      elem.main_html_element.style.display = "none";
    }
  }

  render(field: HTMLElement = null) {
    this.bullets.forEach((elem) => {
      this.renderGameObject({ elem, field });
    });

    this.renderGameObject({ elem: this.player, field });

    this.gameObjects.forEach((elem) => {
      this.renderGameObject({ elem, field });
    });

    this.enemies.forEach((elem) => {
      this.renderGameObject({ elem, field });
    });
  }

  constructor({
    root,
    infcDisplay,
    fieldDimentions,
  }: {
    root: HTMLElement;
    infcDisplay: HTMLElement;
    fieldDimentions: { width: number; height: number };
  }) {
    this.keysManager = new KeysManager();
    this.field = { dimentions: fieldDimentions };

    this.player = new Player({
      id:Date.now() , position:{x:0 , y:0} , weapons:[]
    }) ;
    this.bullets = [] ;
    this.enemies = [] ;
    
    this.infcDisplay = infcDisplay;

    root.append(
      buildField(this.field.dimentions.height, this.field.dimentions.width)
    );

    

    

    this.infcDisplay.append(this.player.infc_display.mainHTMLElement);
  }
}
