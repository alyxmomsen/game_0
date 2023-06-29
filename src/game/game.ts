import { Bullet } from "../gameobjects/bullet";
import { Enemy } from "../gameobjects/enemy";
import GameObject, { Dimentions } from "../gameobjects/gameobject";
import { Player } from "../gameobjects/player";
import { Damage } from "../library/damage";
import { GameObjectHTMLs } from "../library/game-object-htmls";
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

  // UI_gameField: HTMLElement ;
  UI: {
    playerCardHTMLContainer: HTMLElement ;
    gameFieldHTMLContainer:HTMLElement ;
  } ;
  // UI_playerCard:HTMLElement ;

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
  }: {
    elem: GameObject | Enemy | Player;
  }) {
    if (
      !elem.isDied &&
      this.UI.gameFieldHTMLContainer &&
      elem.HTLM_untit &&
      this.UI.gameFieldHTMLContainer.childNodes[0]?.childNodes[elem.position.y]?.childNodes[
        elem.position.x /* если html нода с такими координатами существет */
      ] !== undefined
    ) {
      this.UI.gameFieldHTMLContainer.childNodes[0]?.childNodes[elem.position.y]?.childNodes[
        elem.position.x
      ].appendChild(elem.HTLM_untit.body);
      elem.render();
      elem.HTLM_untit.body.style.display = "block";
    } else {
      elem.render();
      elem.HTLM_untit.body.style.display = "none";

    }
  }

  render(field: HTMLElement = null) {
    this.bullets.forEach((elem) => {
      this.renderGameObject({ elem });

    });
    this.renderGameObject({ elem: this.player });

    this.gameObjects.forEach((elem) => {
      this.renderGameObject({ elem });
    });

    this.enemies.forEach((elem) => {
      this.renderGameObject({ elem });
    });

  }

  constructor({
    fieldDimentions,
    playerCardHTMLContainer ,
    gameFieldHTMLContainer ,
  }: {
    gameFieldHTMLContainer:HTMLElement ; // для рендеринга игрового поля
    playerCardHTMLContainer: HTMLElement ; // для рендеринга статистики Player
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
          stepsLimit:0 , // остановится ли после колличества указанных шагов (если "0", то не остановится вовсе)
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
    this.UI = {
      playerCardHTMLContainer ,
      gameFieldHTMLContainer ,
    }

    this.UI.playerCardHTMLContainer.append(this.player.UI.armor.HTML , this.player.UI.health.HTML);

    // создаем игровое поле
    this.UI.gameFieldHTMLContainer.append(buildField(this.field.dimentions.height, this.field.dimentions.width));
  }
}
