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

export default class Game {
  // hero: GameObject = null;
  field: { dimentions: Dimentions };

  enemies: GameObject[] = [];
  gameObjects: GameObject[] = [];
  bullets: GameObject[] = [];
  // объект игрока
  player: Player;

  // Объект менеджера ключей клавиш
  keysManager: KeysManager = null;

  IDManager: IDManager;

  /* ======== html ========== */

  infcDisplay: HTMLElement = null;

  /* ======================== */

  createGameObject({
    kind = "game_object",
    fieldDimentions,
    damage,
  }: {
    kind: GameObjectType;
    damage: Damage;
    fieldDimentions: { width: number; height: number };
  }) {
    // объект автоматического выбора класса

    const obj = {
      enemy: () => {
        return new Enemy({
          id: this.IDManager.genID(),
          position: generatePostion(fieldDimentions),
        });
      },
      player: () => {
        return new Player({
          id: this.IDManager.genID(),
          position: generatePostion(fieldDimentions),
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
          damage,
          direction: { x: 1, y: 0 },
          health: 100,
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
          damage,
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
          damage: new Damage("phisical", 10),
          health: 1,
        })
      );
      this.player.attack.reset();
    }

    /* ================== */

    // получение ключей нажатых клавиш
    const keys = this.keysManager.getPressedKeys();

    this.bullets.forEach((elem) => {
      elem.update({
        keys,
        objects: [...this.enemies],
      });
    });

    // обновление объектов
    this.player.update({ keys, objects: [] });

    const diedEnemies: GameObject[] = [];

    this.enemies.forEach((enemy, i) => {
      enemy.update({
        keys,
        objects: [...this.bullets],
      });
    });

    delete diedEnemies[0];
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
    });

    this.gameObjects.push(
      this.createGameObject({
        kind: "game_object",
        fieldDimentions: this.field.dimentions,
        damage: new Damage("phisical", 0),
      })
    );
    this.gameObjects.push(
      this.createGameObject({
        kind: "game_object",
        fieldDimentions: this.field.dimentions,
        damage: new Damage("phisical", 0),
      })
    );
    this.gameObjects.push(
      this.createGameObject({
        kind: "game_object",
        fieldDimentions: this.field.dimentions,
        damage: new Damage("phisical", 0),
      })
    );

    this.enemies.push(
      this.createGameObject({
        kind: "enemy",
        fieldDimentions: this.field.dimentions,
        damage: new Damage("phisical", 100),
      })
    );
    this.enemies.push(
      this.createGameObject({
        kind: "enemy",
        fieldDimentions: this.field.dimentions,
        damage: new Damage("phisical", 100),
      })
    );
    this.enemies.push(
      this.createGameObject({
        kind: "enemy",
        fieldDimentions: this.field.dimentions,
        damage: new Damage("phisical", 100),
      })
    );

    //////////////////////////////////////////////

    this.enemies.forEach((enemy) => {
      this.infcDisplay.append(enemy.infc_display.mainHTMLElement);
    });

    this.infcDisplay.append(this.player.infc_display.mainHTMLElement);
  }
}
