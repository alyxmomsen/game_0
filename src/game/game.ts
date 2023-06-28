import { Bullet } from "../gameobjects/bullet";
import { Enemy } from "../gameobjects/enemy";
import GameObject, { Dimentions } from "../gameobjects/gameobject";
import { Player } from "../gameobjects/player";
import { Damage } from "../library/damage";
import KeysManager from "../library/keysManager";
import { Tick, buildField } from "../library/main";
import { Weapon } from "../library/weapon";

export default class Game {
  creatorEnemyTicker: Tick;

  keysManager: KeysManager = null; // Объект менеджера ключей клавиш

  field: { dimentions: Dimentions };
  weapons: Weapon[];

  toCreate: (Enemy | Bullet)[];

  player: Player; // объект игрока
  enemies: Enemy[] = [];
  gameObjects: GameObject[] = [];
  bullets: Bullet[] = [];

  // IDManager: IDManager;

  /* ======== html ========== */

  UI: HTMLElement;

  /* ======================== */

  createEnemyRandomly() {
    // beta beta beta beta !!!!!!!

    if (!this.creatorEnemyTicker) {
      this.creatorEnemyTicker = new Tick(Math.floor(Math.random() * 1000));
    }

    if (this.creatorEnemyTicker.tick()) {
      // console.log(this.enemies , 'this.enemies.length');

      if (this.enemies.length < 5) {
        this.toCreate.push(
          new Enemy({
            id: 0,
            position: {
              x: Math.floor(Math.random() * this.field.dimentions.width),
              y: Math.floor(Math.random() * this.field.dimentions.height),
            },
            weapons: [],
          })
        );
      }
    }

    this.creatorEnemyTicker.setSpeed(Math.floor(Math.random() * 5000));
  }

  update() {
    // получение ключей нажатых клавиш
    const keys = this.keysManager.getPressedKeys();

    /* ========================================= */

    this.toCreate.forEach((objectToCreate) => {
      if (objectToCreate instanceof Bullet) {
        this.bullets.push(objectToCreate);
      } else if (objectToCreate instanceof Enemy) {
        this.enemies.push(objectToCreate);
      }
    });

    this.toCreate = [];

    /* ========================================= */
    const toCreate = this.player.update({
      keys,
      objects: [],
      fieldDimentions: this.field.dimentions,
    });

    if (toCreate !== false) {
      this.toCreate.push(toCreate);
    }

    this.enemies.forEach((enemy) => {
      enemy.update({
        keys,
        objects: [],
        fieldDimentions: this.field.dimentions,
      });
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.isDied);

    this.bullets.forEach((bullet) => {
      bullet.update({
        keys,
        objects: [...this.enemies, this.player],
        fieldDimentions: this.field.dimentions,
      });
    });

    this.bullets = this.bullets.filter((elem) => !elem.isDied);

    /* ================================== */

    this.createEnemyRandomly();

    if (!this.creatorEnemyTicker) {
      this.creatorEnemyTicker = new Tick(1000);
    }

    if (this.creatorEnemyTicker?.tick()) {
      console.log(this.enemies.length, this.bullets.length);
    }

    /* ================================ */
  }

  renderGameObject({
    elem,
    field,
  }: {
    elem: GameObject | Enemy | Player;
    field: HTMLElement;
  }) {
    if (
      !elem.isDied &&
      field &&
      elem.HTLM_untit &&
      field.childNodes[0]?.childNodes[elem.position.y]?.childNodes[
        elem.position.x /* если html нода с такими координатами существет */
      ] !== undefined
    ) {
      field.childNodes[0]?.childNodes[elem.position.y]?.childNodes[
        elem.position.x
      ].appendChild(elem.HTLM_untit.body);
      elem.HTLM_untit.body.style.display = "block";
      elem.render();
    } else {
      elem.HTLM_untit.body.style.display = "none";

      elem.render();
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
    fieldDimentions,
    UI,
  }: {
    root: HTMLElement;
    UI: HTMLElement;
    fieldDimentions: Dimentions;
  }) {
    this.keysManager = new KeysManager();
    this.field = { dimentions: fieldDimentions };

    this.player = new Player({
      id: 0,
      position: { x: 6, y: 6 },
      weapons: [
        new Weapon({
          damage: new Damage({ damageClass: "phisical", value: 50 }),
          fireRate: 100,
        }),
      ],
    });

    // for (let i = 0; i < 1; i++) {
    //   this.enemies.push(
    //     new Enemy({
    //       id: 0,
    //       position: { x: Math.floor(Math.random() * this.field.dimentions.width), y: Math.floor(Math.random() * this.field.dimentions.height) },
    //       weapons: [],
    //     })
    //   );
    // }

    this.toCreate = [];

    /* ============================= */

    this.UI = UI;

    this.enemies.forEach((enemy) => {
      this.UI.append(enemy.UI.wrapper);
    });

    root.append(
      buildField(this.field.dimentions.height, this.field.dimentions.width)
    );
  }
}
