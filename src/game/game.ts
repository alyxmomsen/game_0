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

  toCreateObjects: (Enemy | Bullet)[];

  player: Player; // объект игрока
  enemies: Enemy[] = [];
  gameObjects: GameObject[] = [];
  bullets: Bullet[] = [];

  // IDManager: IDManager;

  /* ======== html| / UI  ========== */

  UI: HTMLElement;

  playerCard:'' ;

  /* ======================== */

  createEnemyRandomly() {
    // beta beta beta beta !!!!!!!

    if (!this.creatorEnemyTicker) {
      this.creatorEnemyTicker = new Tick(Math.floor(Math.random() * 1000));
    }

    if (this.creatorEnemyTicker.tick()) {
      // console.log(this.enemies , 'this.enemies.length');

      if (this.enemies.length < 5) {
        this.toCreateObjects.push(
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

    this.toCreateObjects.forEach((objectToCreate) => {
      if (objectToCreate instanceof Bullet) {
        this.bullets.push(objectToCreate);
      } else if (objectToCreate instanceof Enemy) {
        this.enemies.push(objectToCreate);
      }
    });

    this.toCreateObjects = [];

    /* ========================================= */

    // возвращает объект Bullet
    const objectToCreate = this.player.update({
      keys,
      objects: [],
      fieldDimentions: this.field.dimentions,
    });

    if (objectToCreate !== false) {
      this.toCreateObjects.push(objectToCreate);
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
    root: HTMLElement; // для рендеринга игрового поля
    UI: HTMLElement; // для рендеринга статистики
    fieldDimentions: Dimentions; // размеры поля
  }) {
    this.keysManager = new KeysManager(); // управленец нажатыми клавишами
    this.field = { dimentions: fieldDimentions };

    this.toCreateObjects = []; // массив объектов (пока что Bullet) подлежащие добавлению в массив объектов для дальнейшей итерации в игр/м. цикле

    // создаем игрока
    this.player = new Player({
      id: 0,
      position: { x: 6, y: 6 },
      // даем игроку арсенал
      weapons: [
        new Weapon({
          damage: new Damage({ damageClass: "phisical", value: 50 }),
          fireRate: 100, // интервал между выстрелами
          stepRate: 1, // скорость полета
          stepRateFadeDown: false, // будет ли замедляться
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

    /* ============================= */

    //
    this.UI = UI;

    // временно. выводим статистику по врагам
    this.enemies.forEach((enemy) => {
      this.UI.append(enemy.UI.wrapper);
    });

    // создаем игровое поле
    root.append(
      buildField(this.field.dimentions.height, this.field.dimentions.width)
    );
  }
}
