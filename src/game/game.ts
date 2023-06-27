
import { Bullet } from "../gameobjects/bullet";
import { Enemy } from "../gameobjects/enemy";
import GameObject, { Dimentions } from "../gameobjects/gameobject";
import { Player } from "../gameobjects/player";
import { Damage } from "../library/damage";
import { IDManager } from "../library/id_manager";
import KeysManager from "../library/keysManager";
import { Tick, buildField, generateColor, generateUniqueID } from "../library/main";
import { Weapon } from "../library/weapon";

export default class Game {
  // hero: GameObject = null;
  keysManager: KeysManager = null; // Объект менеджера ключей клавиш
  
  field: { dimentions: Dimentions };
  weapons: Weapon[];

  toCreate:(Enemy|Bullet)[] ;
  
  
  player: Player; // объект игрока
  enemies: Enemy[] = [];
  gameObjects: GameObject[] = [];
  bullets: Bullet[] = [];

  // IDManager: IDManager;
  
  /* ======== html ========== */

  infcDisplay: HTMLElement = null;

  /* ======================== */

  update() {
    /* Game управляет действиями Player (bdw, возможно они названны иначе, но это "пока" )
    на самом деле, как правило, игра сама наносит урон другим объектам, не создавая событие Attack у Player

    так же Player, как и другие объекты могут генерировать состояния такие как голод , усталость и т. д. */

    // получение ключей нажатых клавиш
    const keys = this.keysManager.getPressedKeys();


    this.toCreate.forEach(objectToCreate => {
      
      if(objectToCreate instanceof Bullet) {

        this.bullets.push(objectToCreate);

      } else if (objectToCreate instanceof Enemy) {

        this.enemies.push(objectToCreate);
      }


    });

    const toCreate = this.player.update({keys , objects:[]});
    if(toCreate !== false) {
      this.toCreate.push(toCreate) ;
      
    }

    this.enemies.forEach((enemy, i) => {
      enemy.update({
        keys,
        objects: [],
      });
    });
    
    this.bullets.forEach(bullet => {
      bullet.update({
        keys,
        objects: [...this.enemies] ,
      });
    }) ;
    
    // delete diedEnemies[0];
  }

  renderGameObject({ elem, field }: { elem:GameObject|Enemy|Player; field: HTMLElement }) {
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
      id:0 , position:{x:6 , y:6} , weapons:[new Weapon({damage:new Damage({damageClass:'phisical' , value:5}) , fireRate:50})]
    }) ;

    for (let i=0 ; i<10 ; i++) {
      this.enemies.push(new Enemy({
        id:0 , position:{x:6 , y:6} , weapons:[]
      })) ;
    }

    this.toCreate = [] ;

    
    /* ============================= */
    
    this.infcDisplay = infcDisplay;

    root.append(
      buildField(this.field.dimentions.height, this.field.dimentions.width)
    );

    

    

    this.infcDisplay.append(this.player.infc_display.mainHTMLElement);
  }
}
