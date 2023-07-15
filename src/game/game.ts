import { Bullet } from "../gameobjects/bullet";
import { Enemy } from "../gameobjects/enemy";
import GameObject from "../gameobjects/gameobject";
import { Player } from "../gameobjects/player";
import { SupplyBox } from "../gameobjects/supply-box";
import { Controller } from "../library/controller";
import { Damage } from "../library/damage";
import { GameObjectHTMLs } from "../library/game-object-htmls";
import { GameController } from "../library/gameController";
import KeysManager from "../library/keysManager";
import { TickController } from "../library/main";
import { Dimentions, Position } from "../library/types";
import { UIManager } from "../library/uimanager";
import { ViewPort } from "../library/view-port";
import { Weapon } from "../library/weapon";

import file1 from "./../images/health.png";
import file2 from "./../images/image2.png";

import sound from "./../images/shot.mp3";

import knightIdleSprite from "./../images/spites/Heroes/Knight/Idle/Idle-Sheet.png";

import KnightRunSprite from "./../images/spites/Heroes/Knight/Run/Run-Sheet.png";

import bkg from "./../images/spites/Environment/Dungeon Prison/Assets/Tiles.png";
import { SpriteManager_beta } from "../library/sprite-manager-beta";

/* ====== Sprites ====== */
const img1 = new Image();
const img2 = new Image();
img1.src = file1;
img2.src = file2;

const sprite = new Image();
sprite.src = knightIdleSprite;
/* ===================== */

export default class Game {
  state: 0 | 1;

  spriteManager: SpriteManager_beta;

  /* test ^^^^ */

  handleTicker = new TickController(1000);

  audio: HTMLAudioElement;
  /* ---------------------- */

  UIManager: UIManager;
  creatorEnemyTicker: TickController;
  supplyBoxCreatingTicker: TickController;

  // gameObjectsPull

  keysManager: KeysManager; // Объект менеджера ключей клавиш

  field: {
    resolution: { horizontal: number; vertical: number }; // разрешение игрового поля
    gameCellDimentions: {
      width: number;
      height: number;
    };
  };
  weapons: Weapon[];

  spawnQueue: (Enemy | Bullet | SupplyBox)[];

  player: Player; // объект игрока
  enemies: Enemy[];
  gameObjects: GameObject[];
  bullets: Bullet[];
  supplyBoxes: SupplyBox[];

  /* ======================== */

  viewPort: ViewPort;
  controller: GameController;

  createEnemyRandomly(len: number = 0) {
    let newEnemy: Enemy | null = null;

    if (this.enemies.length < len) {
      newEnemy = new Enemy({
        id: 0,
        position: {
          x: Math.floor(Math.random() * this.calculateFieldDimentions().width),
          y: Math.floor(Math.random() * this.calculateFieldDimentions().height),
        },
        weapons: [
          new Weapon({
            bulletDimentions: { width: 50, height: 50 },
            damage: { damageClass: "magic", value: 50 },
            fireRate: Math.floor(Math.random() * 900) + 100,
            maxAllowedStepRange: 10,
            stepRateFadeDown: false,
            stepsLimit: 0,
          }),
        ],
      });

      console.log("enemy created", newEnemy);
    }

    this.creatorEnemyTicker.setTickInterval(Math.floor(Math.random() * 5000));

    return newEnemy;
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

  calculateFieldDimentions() {
    let width: number;
    let height: number;

    width =
      this.field.resolution.horizontal * this.field.gameCellDimentions.width;
    height =
      this.field.resolution.vertical * this.field.gameCellDimentions.height;

    return { width, height };
  }

  update() {
    let bulletOfNull: Bullet | null = null;

    // получение ключей нажатых клавиш
    const keys = this.keysManager.getPressedKeys();

    bulletOfNull = this.player.update({
      keys,
      objects: [...this.enemies, ...this.supplyBoxes],
      fieldDimentions: this.calculateFieldDimentions(),
    });

    if (bulletOfNull) {
      this.bullets.push(bulletOfNull);
    }

    this.bullets = this.bullets.filter((bullet) => !bullet.isDied);

    this.enemies.forEach((enemy) => {
      bulletOfNull = enemy.update({
        objects: [this.player],
        fieldDimentions: this.calculateFieldDimentions(),
      });

      if (bulletOfNull) {
        this.bullets.push(bulletOfNull);
      }
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.isDied);

    this.bullets.forEach((bullet) => {
      bullet.update({
        objects: [...this.enemies, this.player],
        fieldDimentions: this.calculateFieldDimentions(),
      });

      // if(
      // bullet.position.x > this.viewPort.position.x + this.field.resolution.width + this.field.gameCellDimentions.width ||
      // bullet.position.x < this.viewPort.position.x ||
      // bullet.position.y > this.viewPort.position.y + this.field.resolution.height + this.field.gameCellDimentions.height ||
      // bullet.position.y < this.viewPort.position.y
      //   ) {
      //   bullet.isDied = true ;
      // }
    });
    this.bullets = this.bullets.filter((elem) => !elem.isDied);

    this.supplyBoxes.forEach((supBox) => {
      supBox.update({
        fieldDimentions: this.calculateFieldDimentions(),
      });
    });

    this.supplyBoxes = this.supplyBoxes.filter((elem) => !elem.isDied);

    if (this.supplyBoxCreatingTicker.tick() && this.supplyBoxes.length < 3) {
      this.supplyBoxes.push(
        new SupplyBox({
          position: {
            x: Math.floor(
              Math.random() * this.calculateFieldDimentions().width
            ),
            y: Math.floor(
              Math.random() * this.calculateFieldDimentions().height
            ),
          },
        })
      );
    }

    if (true && this.creatorEnemyTicker.tick()) {
      const newEnemy = this.createEnemyRandomly(1); // генерит если в массиве меньше чем Аргумент
      if (newEnemy) {
        this.enemies.push(newEnemy);
      }
    }

    this.viewPort.updatePositionMoveStepRangeByKeys(
      this.keysManager.getPressedKeys()
    );
    this.viewPort.updatePosition();

    // console.log(this.bullets.length);
  }

  render() {
    this.UIManager.clearCanvas();

    // this.UIManager.ctx.clearRect(0 , 0 , this.field.resolution.width  * this.field.gameCellDimentions.width , this.field.resolution.height  * this.field.gameCellDimentions.height);

    const background = new Image();
    background.src = bkg;

    for (let i = 0; i < this.field.resolution.vertical; i++) {
      for (let j = 0; j < this.field.resolution.horizontal; j++) {
        this.UIManager.ctx.drawImage(
          background,
          160,
          0,
          60,
          63,
          j * 200 + this.viewPort.position.x,
          i * 200 + this.viewPort.position.y,
          200,
          200
        );

        this.UIManager.drawSprite(
          background,
          160,
          0,
          60,
          63,
          j * 200 + this.viewPort.position.x,
          i * 200 + this.viewPort.position.y,
          200,
          200
        );
      }
    }

    this.player.draw(this.UIManager.ctx);

    this.bullets.forEach((bullet) => {
      bullet.draw(this.UIManager.ctx);
    });

    this.enemies.forEach((enemy) => {
      enemy.draw(this.UIManager.ctx);
    });

    this.supplyBoxes.forEach((supplyBox) => {
      supplyBox.draw(this.UIManager.ctx);
    });
  }

  constructor({
    fieldResolution,

    canvas,
    gameCellDimentions,
  }: {
    fieldResolution: { horizontal: number; vertical: number }; // размеры поля
    canvas: HTMLCanvasElement;
    gameCellDimentions: Dimentions;
  }) {
    this.keysManager = new KeysManager(); // управленец нажатыми клавишами

    this.creatorEnemyTicker = new TickController(1000);
    this.supplyBoxCreatingTicker = new TickController(10000);

    this.supplyBoxes = [];
    this.enemies = [];
    this.bullets = [];

    this.field = {
      // разрешение игрового поля и размеры ячейки игрового поля
      resolution: fieldResolution, // разрешение
      gameCellDimentions, // размер ячейки
    };

    this.spawnQueue = []; // массив объектов (пока что Bullet) подлежащие добавлению в массив объектов для дальнейшей итерации в игр/м. цикле

    // создаем игрока
    this.player = new Player({
      id: 0,
      position: { x: 6, y: 6 },
      // даем игроку арсенал
      weapons: [
        new Weapon({
          damage: new Damage({ damageClass: "phisical", value: 2 }),
          fireRate: 100, // интервал между выстрелами
          maxAllowedStepRange: 50, // скорость полета
          stepRateFadeDown: true, // будет ли замедляться
          stepsLimit: 0, // остановится ли после колличества указанных шагов (если "0", то не остановится вовсе)
          bulletDimentions: { width: 100, height: 100 },
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
      canvasHeight: 9 * 120,
      canvasWidth: 16 * 120,
      gameCellDimentions,
    });

    const audio = new Audio(sound);
    this.audio = audio;

    this.audio.muted = false;

    this.viewPort = new ViewPort();

    // this.controller = new GameController ();

    // this.audio.play();

    window.addEventListener("click", () => {
      this.audio.muted = false;
      // this.audio.play();
    });

    // const spr2 = new Image();
    // spr2.src = knightIdleSprite;
    // const run = new Image();
    // run.src = KnightRunSprite;
    // this.spriteManager = new SpriteManager_beta([
    //   {
    //     src: spr2,
    //     firstFramePosition: { x: 0, y: 0 },
    //     height: 32,
    //     width: 32,
    //     maxAllowFrames: 4,
    //     stepRange: 32,
    //   },
    //   {
    //     src: run,
    //     firstFramePosition: { x: 18, y: 33 },
    //     height: 33,
    //     width: 33,
    //     maxAllowFrames: 6,
    //     stepRange: 64,
    //   },
    // ]);

    this.state = 0;

    window.onclick = () => {
      this.state = this.state ? 0 : 1;
    };

    console.log(this.field, this.UIManager.canvas);
  }
}
