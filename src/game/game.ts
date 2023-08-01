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
import {
  Dimentions,
  Direction,
  Position,
  validDamageClasses,
} from "../library/types";
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

import playerWeapon from "../weapon-sets.json";

console.log(playerWeapon);

/* ====== Sprites ====== */
const img1 = new Image();
const img2 = new Image();
img1.src = file1;
img2.src = file2;

const sprite = new Image();
sprite.src = knightIdleSprite;
/* ===================== */

export default class Game {
  // protected changeweaponaticker = new TickController(5000);

  protected state: 0 | 1;
  protected spriteManager: SpriteManager_beta;

  /* test ^^^^ */

  protected handleTicker = new TickController(1000);

  protected audio: HTMLAudioElement;
  /* ---------------------- */

  protected UIManager: UIManager;
  protected creatorEnemyTicker: TickController;
  protected supplyBoxCreatingTicker: TickController;

  // gameObjectsPull

  protected keysManager: KeysManager; // Объект менеджера ключей клавиш

  protected field: {
    resolution: { horizontal: number; vertical: number }; // разрешение игрового поля
    gameCellDimentions: {
      width: number;
      height: number;
    };
  };
  protected weapons: Weapon[];

  protected spawnQueue: (Enemy | Bullet | SupplyBox)[];

  protected player: Player; // объект игрока
  protected enemies: Enemy[];
  protected gameObjects: GameObject[];
  protected bullets: Bullet[];
  protected supplyBoxes: SupplyBox[];

  /* ======================== */

  protected viewPort: ViewPort;
  protected controller: GameController;

  protected createEnemyRandomly(len: number = 0) {
    let newEnemy: Enemy | null = null;

    if (this.enemies.length < len) {
      newEnemy = new Enemy({
        id: 0,
        position: {
          x: Math.floor(
            Math.random() * (this.calculateFieldDimentions().width - 200)
          ),
          y: Math.floor(
            Math.random() * (this.calculateFieldDimentions().height - 200)
          ),
        },
        weapons: [
          new Weapon({
            bulletDimentions: { width: 50, height: 50 },
            damage: { damageClass: "magic", value: 5 },
            fireRate: Math.floor(Math.random() * 900) + 100,
            maxAllowedStepRange: 20,
            stepRateFadeDown: false,
            stepsLimit: 0,
            title: "somthing",
          }),
        ],
      });

      console.log("enemy created", newEnemy);
    }

    this.creatorEnemyTicker.setTickInterval(Math.floor(Math.random() * 5000));

    return newEnemy;
  }

  protected sortSpawnQueue() {
    this.spawnQueue.forEach((objectToSpawn) => {
      if (objectToSpawn instanceof Bullet) {
        this.bullets.push(objectToSpawn);
      } else if (objectToSpawn instanceof Enemy) {
        this.enemies.push(objectToSpawn);
      } else if (objectToSpawn instanceof SupplyBox) {
      }
    });
  }

  public addBullet({
    ownDamage,
    position,
    dimentions,
    maxAllowWalkStepRange,
    walkStepDirectionRange,
  }: {
    health: number;
    id: number;
    ownDamage: Damage;
    position: Position;
    dimentions: Dimentions;
    maxAllowWalkStepRange: number;
    walkStepDirectionRange: Direction;
    walkStepRangeDelta: number;
    walkStepRangeDeltaMod: number;
    walkStepRateFadeDown: boolean;
    walkStepsLimit: number;
    isRigidBody: boolean;
  }) {
    this.bullets.push(
      new Bullet({
        health: 100,
        id: 0,
        ownDamage,
        position,
        dimentions,
        maxAllowWalkStepRange,
        walkStepDirectionRange,
        walkStepRangeDelta: 0.1,
        walkStepRangeDeltaMod: 0.2,
        walkStepRateFadeDown: false,
        walkStepsLimit: 0,
        isRigidBody: true,
      })
    );
  }

  protected calculateFieldDimentions() {
    let width: number;
    let height: number;

    width =
      this.field.resolution.horizontal * this.field.gameCellDimentions.width;
    height =
      this.field.resolution.vertical * this.field.gameCellDimentions.height;

    return { width, height };
  }

  public update() {
    // получение ключей нажатых клавиш
    const keys = this.keysManager.getPressedKeys();
    const fieldDimentions = this.calculateFieldDimentions();

    if (this.player.position) {
      this.viewPort.autoFocuTo(
        this.player.position,
        this.player.getDimentions(),
        {
          width: 1920,
          height: 1080,
        }
      );
    }

    this.player.update({
      keys,
      objects: [...this.enemies, ...this.supplyBoxes],
      fieldDimentions,
      game: this,
    });

    this.enemies.forEach((enemy) => {
      enemy.update({
        objects: [this.player],
        fieldDimentions,
        game: this,
      });
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.isDied);

    this.bullets.forEach((bullet) => {
      bullet.update({
        objects: [...this.enemies, this.player],
        fieldDimentions,
        game: this,
      });
    });
    this.bullets = this.bullets.filter((elem) => !elem.isDied);

    this.supplyBoxes.forEach((supBox) => {
      supBox.update({
        fieldDimentions,
        game: this,
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
      const newEnemy = this.createEnemyRandomly(3); // генерит если в массиве меньше чем Аргумент
      if (newEnemy) {
        this.enemies.push(newEnemy);
      }
    }

    this.viewPort.updatePositionMoveStepRangeByKeys(keys);

    this.viewPort.updatePosition();

    
  }

  renderPlayerStats(values: string[]) {
    this.UIManager.renderPlayerStats(values);
  }

  public render() {
    this.UIManager.clearCanvas();

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
          j * this.field.gameCellDimentions.width - this.viewPort.position.x,
          i * this.field.gameCellDimentions.height - this.viewPort.position.y,
          this.field.gameCellDimentions.width,
          this.field.gameCellDimentions.height
        );
      }
    }

    this.player.draw(this.UIManager.ctx, this.viewPort.position);

    this.bullets.forEach((bullet) => {
      bullet.draw(this.UIManager.ctx, this.viewPort.position);
    });

    this.enemies.forEach((enemy) => {
      enemy.draw(this.UIManager.ctx, this.viewPort.position);
    });

    this.supplyBoxes.forEach((supplyBox) => {
      supplyBox.draw(this.UIManager.ctx, this.viewPort.position);
    });

    this.renderPlayerStats([
      `HEALTH :  ${this.player.getHealth().toLocaleString()}`,
      `ARMOR : ${this.player.armor.getHealthValue()}`,
      `weapon : ${this.player.get_AttackStats()}`,
    ]);
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
      weapons: [],
    });

    // const x = playerWeapon.regular ;

    this.player.addWeapon(playerWeapon.regular); // добавляем оружие из JSON файла
    this.player.addWeapon(playerWeapon.boosted); // добавляем оружие из JSON файла
    this.player.setWeapon(); // устанавливаем текущее оружие

    console.log(this.player);

    this.UIManager = new UIManager({
      canvas,
      canvasWidth: 1920,
      canvasHeight: 1080,
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
