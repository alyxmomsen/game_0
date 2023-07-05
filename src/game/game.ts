import { Bullet } from "../gameobjects/bullet";
import { Enemy } from "../gameobjects/enemy";
import GameObject from "../gameobjects/gameobject";
import { Player } from "../gameobjects/player";
import { SupplyBox } from "../gameobjects/supply-box";
import { Damage } from "../library/damage";
import { GameObjectHTMLs } from "../library/game-object-htmls";
import KeysManager from "../library/keysManager";
import { TickController } from "../library/main";
import { Dimentions } from "../library/types";
import { UIManager } from "../library/uimanager";
import { Weapon } from "../library/weapon";


import f from './../images/health.png' ;

const img = new Image();
      img.src = f ;

export default class Game {

  handleTicker = new TickController(1000);

  /* ---------------------- */

  UIManager: UIManager;

  creatorEnemyTicker: TickController;

  supplyBoxCreatingTicker: TickController;

  // gameObjectsPull

  keysManager: KeysManager = null; // Объект менеджера ключей клавиш

  field: {
    resolution: Dimentions;
    gameCellDimentions: {
      width: number;
      height: number;
    };
  };
  weapons: Weapon[];

  spawnQueue: (Enemy | Bullet | SupplyBox)[];

  player: Player; // объект игрока
  enemies: Enemy[] = [];
  gameObjects: GameObject[] = [];
  bullets: Bullet[] = [];
  supplyBoxes: SupplyBox[];

  // IDManager: IDManager;

  /* ======== html| / UI  ========== */

  // UI_gameField: HTMLElement ;
  UI: {
    playerCardHTMLContainer: HTMLElement;
    // gameFieldHTMLContainer: HTMLElement;
  };
  // UI_playerCard:HTMLElement ;

  /* ======================== */

  createEnemyRandomly() {
    // beta beta beta beta !!!!!!!

    if (!this.creatorEnemyTicker) {
      this.creatorEnemyTicker = new TickController(
        Math.floor(Math.random() * 1000)
      );
    }

    if (this.creatorEnemyTicker.tick()) {
      // console.log(this.enemies , 'this.enemies.length');

      if (this.enemies.length < 5) {
        this.spawnQueue.push(
          new Enemy({
            id: 0,
            position: {
              x: Math.floor(Math.random() * this.field.resolution.width),
              y: Math.floor(Math.random() * this.field.resolution.height),
            },
            weapons: [],
          })
        );
      }
    }

    this.creatorEnemyTicker.setTickInterval(Math.floor(Math.random() * 5000));
  }

  sortSpawnQueue() {
    this.spawnQueue.forEach((objectToSpawn) => {
      if (objectToSpawn instanceof Bullet) {
        this.bullets.push(objectToSpawn);
      } else if (objectToSpawn instanceof Enemy) {
        this.enemies.push(objectToSpawn);
      } else if (objectToSpawn instanceof SupplyBox) {
      }
    });
  }

  update() {
    // получение ключей нажатых клавиш
    const keys = this.keysManager.getPressedKeys();

    /* ========================================= */

    this.sortSpawnQueue();

    this.spawnQueue = [];

    /* ========================================= */

    //GameObject.update возвращает объект Bullet
    const objectToSpawn = this.player.update({
      keys,
      objects: [...this.enemies, ...this.supplyBoxes],
      fieldDimentions: this.field.resolution,
    });
    if (objectToSpawn !== false) {
      this.spawnQueue.push(objectToSpawn);
    }

    this.enemies.forEach((enemy) => {
      enemy.update({
        keys,
        objects: [...this.bullets],
        fieldDimentions: this.field.resolution,
      });
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.isDied);

    this.bullets.forEach((bullet) => {
      bullet.update({
        keys,
        objects: [...this.enemies, this.player],
        fieldDimentions: this.field.resolution,
      });
    });
    this.bullets = this.bullets.filter((elem) => !elem.isDied);

    this.supplyBoxes.forEach((supBox) => {
      supBox.update({
        fieldDimentions: this.field.resolution,
      });
    });
    this.supplyBoxes = this.supplyBoxes.filter((elem) => !elem.isDied);

    /* ================================== */

    this.createEnemyRandomly();

    if (!this.creatorEnemyTicker) {
      this.creatorEnemyTicker = new TickController(1000);
    }

    /* ================================ */

    
    const arr:['armore , health'] =  ['armore , health'] ;

    if (this.supplyBoxCreatingTicker.tick()) {
      this.supplyBoxes.push(
        new SupplyBox({
          position: {
            x: Math.floor(Math.random() * this.field.resolution.width),
            y: Math.floor(Math.random() * this.field.resolution.height),
          },
        })
      );
    }

    this.player.displayStatsIntoTheBrowserConsole() ;

  }

  render(field: HTMLElement = null) {
    this.UIManager.clearCanvas();

    this.UIManager.draw(
      this.player.position.x,
      this.player.position.y,
      this.player.getDimentions().width,
      this.player.getDimentions().height,
      this.player.getColor()
    );

    this.bullets.forEach((elem) => {
      // this.renderGameObject({ elem });

      this.UIManager.draw(
        elem.position.x,
        elem.position.y,
        elem.getDimentions().width,
        elem.getDimentions().height,
        elem.getColor()
      );
    });

    // this.renderGameObject({ elem: this.player });

    this.gameObjects.forEach((elem) => {
      // this.renderGameObject({ elem });

      this.UIManager.draw(
        elem.position.x,
        elem.position.y,
        elem.getDimentions().width,
        elem.getDimentions().height,
        elem.getColor()
      );
    });

    this.enemies.forEach((elem) => {
      // this.renderGameObject({ elem });

      this.UIManager.draw(
        elem.position.x,
        elem.position.y,
        elem.getDimentions().width,
        elem.getDimentions().height,
        elem.getColor()
      );
    });

    this.supplyBoxes.forEach((elem) => {
      // this.UIManager.draw(
      //   elem.position.x,
      //   elem.position.y,
      //   elem.getDimentions().width,
      //   elem.getDimentions().height,
      //   elem.getColor()
      // );

      



      this.UIManager.drawImg(img , 0 , 0 , 100 , 100 ,elem.position.x * elem.getDimentions().width , elem.position.y * elem.getDimentions().height ,50 , 50);
      // this.renderGameObject({ elem });
    });
  }

  constructor({
    fieldResolution,
    // playerCardHTMLContainer,
    // gameFieldHTMLContainer,
    canvas,
    gameCellDimentions,
  }: {
    // gameFieldHTMLContainer: HTMLElement; // для рендеринга игрового поля
    // playerCardHTMLContainer: HTMLElement; // для рендеринга статистики Player
    fieldResolution: Dimentions; // размеры поля
    canvas: HTMLCanvasElement;
    gameCellDimentions: Dimentions;
  }) {
    this.supplyBoxCreatingTicker = new TickController(10000);
    this.supplyBoxes = [];

    // this.UIManager = new UIManager ({canvas , w:fieldDimentions.width , h:fieldDimentions.height}) ;

    this.keysManager = new KeysManager(); // управленец нажатыми клавишами

    this.field = {
      resolution: fieldResolution,
      gameCellDimentions,
    };

    this.spawnQueue = []; // массив объектов (пока что Bullet) подлежащие добавлению в массив объектов для дальнейшей итерации в игр/м. цикле

    // создаем игрока
    this.player = new Player({
      id: 0,
      position: { x: 6, y: 6 },
      // даем игроку арсенал
      weapons: [
        new Weapon({
          damage: new Damage({ damageClass: "phisical", value: 100 }),
          fireRate: 100, // интервал между выстрелами
          stepRate: 1, // скорость полета
          stepRateFadeDown: true, // будет ли замедляться
          stepsLimit: 0, // остановится ли после колличества указанных шагов (если "0", то не остановится вовсе)
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

    this.UIManager = new UIManager({
      canvas,
      canvasHeight: 600 * 2,
      canvasWidth: 800 * 2,
      gameCellDimentions,
    });
  }
}
