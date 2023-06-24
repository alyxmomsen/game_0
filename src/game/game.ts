// import GameObject, { Enemy } from "../gameobjects/gameobject";
import { ids } from "webpack";
import { Bullet } from "../gameobjects/bullet";
import { Enemy } from "../gameobjects/enemy";
import GameObject, {
  Dimentions,
  GameObjectConstructor,
  GameObjectType,
  Position,
} from "../gameobjects/gameobject";
import { Player } from "../gameobjects/player";
import { ArmorClass } from "../library/armore";
import { Attack } from "../library/attack";
import { Damage } from "../library/damage";
import { generatePostion } from "../library/generatePosition";
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
  // объект игрока
  player: Player;

  weapons:Weapon[] ;

  // Объект менеджера ключей клавиш
  keysManager: KeysManager = null;

  IDManager: IDManager;

  /* ======== html ========== */

  infcDisplay: HTMLElement = null;

  /* ======================== */

  createGameObject({
    kind = "game_object",
    fieldDimentions,
    ownDamage,
  }: {
    kind: GameObjectType;
    ownDamage: Damage;
    fieldDimentions: { width: number; height: number };
  }) {
    // объект автоматического выбора класса

    const obj = {
      enemy: () => {
        return new Enemy({
          id: this.IDManager.genID(),
          position: generatePostion(fieldDimentions),
          weapons:[] ,
          
        });
      },
      player: () => {
        return new Player({
          id: this.IDManager.genID(),
          position: generatePostion(fieldDimentions),
          weapons:[] ,
        });
      },
      game_object: () => {
        return new GameObject({
          id: this.IDManager.genID(),
          kind: "game_object",
          position: generatePostion(fieldDimentions),
          backgroundColor: "grey",
          walkTickValue: 10,
          color: "grey",
          ownDamage ,
          direction: { x: 1, y: 0 },
          health: 100,
          weapons:[] ,
        });
      },
      "damage-entity": () => {
        return new GameObject({
          id: this.IDManager.genID(),
          kind: "game_object",
          position: generatePostion(fieldDimentions),
          backgroundColor: "white",
          walkTickValue: 1,
          color: "white",
          ownDamage ,
          weapons:[] ,
          direction: { x: 1, y: 0 },
          health: 100,
        });
      },
    };

    return obj[kind]();
  }

  update() {
    /* Game управляет действиями Player (bdw, возможно они названны иначе, но это "пока" )
    на самом деле, как правило, игра сама наносит урон другим объектам, не создавая событие Attack у Player

    так же Player, как и другие объекты могут генерировать состояния такие как голод , усталость и т. д. */

    // получение ключей нажатых клавиш
    const keys = this.keysManager.getPressedKeys();

    /* generation objects */

    if (this.player.attack.status) {
      this.bullets.push(
        new Bullet({
          position: {
            x: this.player.position.x + this.player.movement.direction.x,
            y: this.player.position.y + this.player.movement.direction.y,
          },
          id: this.IDManager.genID(),
          direction: this.player.movement.direction,
          // damage: new Damage(this.player.attack.ownDamage),
          health: 1,
          ownDamage:this.player.attack.weapons[0].damage // hard set
        })
      );
      this.player.attack.reset();
    }

    /* ================== */

    
    this.bullets.forEach((elem) => {
      elem.update({
        keys,
        objects: [...this.enemies],
      });
    });

    // обновление объектов
    this.player.update({ keys, objects: [] });

    // const diedEnemies: GameObject[] = [];

    this.enemies.forEach((enemy, i) => {
      enemy.update({
        keys,
        objects: [...this.bullets],
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
    this.IDManager = new IDManager();
    this.field = { dimentions: fieldDimentions };

    this.infcDisplay = infcDisplay;

    root.append(
      buildField(this.field.dimentions.height, this.field.dimentions.width)
    );

    //////////////////////////////////

    this.player = new Player({
      id: this.IDManager.genID(),
      position: generatePostion(this.field.dimentions),
      weapons:[new Weapon({damage:new Damage({damageClass:'phisical' , value:20})})] ,
    });

    for (let i=0 ; i<5 ; i++) {
      this.gameObjects.push(
        this.createGameObject({
          kind: "game_object",
          fieldDimentions: this.field.dimentions,
          ownDamage: new Damage({damageClass:"phisical", value:0}),
        })
      );
    }

    for(let i=0 ; i<10 ; i++) {

      this.enemies.push(
        this.createGameObject({
          kind: "enemy",
          fieldDimentions: this.field.dimentions,
          ownDamage: new Damage({damageClass:"phisical", value:100}),
        })
      );
    }

    //////////////////////////////////////////////

    this.enemies.forEach((enemy) => {
      this.infcDisplay.append(enemy.infc_display.mainHTMLElement);
    });

    this.infcDisplay.append(this.player.infc_display.mainHTMLElement);
  }
}
