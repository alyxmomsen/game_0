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

import file1 from "./../images/health.png";
import file2 from "./../images/image2.png";

import sound from "./../images/shot.mp3";

import spr from "./../images/spites/Heroes/Knight/Idle/Idle-Sheet.png";

/* ====== Sprites ====== */
const img1 = new Image();
const img2 = new Image();
const sprite = new Image();
img1.src = file1;
img2.src = file2;
sprite.src = spr;
/* ===================== */

export default class Game {
  handleTicker = new TickController(1000);

  audio: HTMLAudioElement;
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
  enemies: Enemy[] ;
  gameObjects: GameObject[] ;
  bullets: Bullet[] ;
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

  createEnemyRandomly(len:number = 0) {

    let newEnemy:Enemy = null ;

      if (this.enemies.length < len) {
        newEnemy = new Enemy({
          id: 0,
          position: {
            x: Math.floor(Math.random() * (this.field.resolution.width)) * this.field.gameCellDimentions.width,
            y: Math.floor(Math.random() * (this.field.resolution.height)) * this.field.gameCellDimentions.height,
          },
          weapons: [
            new Weapon({
              bulletDimentions:{width:50 , height:50} , 
              damage:{damageClass:'magic' , value:50} ,
              fireRate:Math.floor(Math.random() * 900) + 100 ,
              stepRate:1000 ,
              stepRateFadeDown: false , 
              stepsLimit:0 ,
            }) ,
          ],
        }) ;
      }
    
    this.creatorEnemyTicker.setTickInterval(Math.floor(Math.random() * 5000));

    return newEnemy ;

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

    let bulletOfNull:Bullet|null = null ;

    // получение ключей нажатых клавиш
    const keys = this.keysManager.getPressedKeys();

    bulletOfNull = this.player.update({
      keys,
      objects: [...this.enemies, ...this.supplyBoxes],
      fieldDimentions: this.field.resolution,
    });

    if(bulletOfNull) {

      
      this.bullets.push(bulletOfNull);
    }

    this.bullets = this.bullets.filter(bullet => !bullet.isDied) ;

    this.enemies.forEach((enemy) => {
      bulletOfNull = enemy.update({
        objects: [this.player],
        fieldDimentions: this.field.resolution,
      });

      if(bulletOfNull) {
        this.bullets.push(bulletOfNull);
      }

    });
    this.enemies = this.enemies.filter((enemy) => !enemy.isDied);

    this.bullets.forEach((bullet) => {
      bullet.update({
        objects: [...this.enemies , this.player],
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

    if (this.supplyBoxCreatingTicker.tick()) {
      this.supplyBoxes.push(
        new SupplyBox({
          position: {
            x: Math.floor(Math.random() * this.field.resolution.width * 50),
            y: Math.floor(Math.random() * this.field.resolution.height * 50),
          },
        })
      );
    }

    if(true && this.creatorEnemyTicker.tick()) {
      const newEnemy = this.createEnemyRandomly(3) // генерит если в массиве меньше чем Аргумент
      if(newEnemy) {
        this.enemies.push(newEnemy);
      } ; 
    }


  }

  render(field: HTMLElement = null) {
    this.UIManager.clearCanvas();

    // this.UIManager.draw(
    //   this.player.position.x,
    //   this.player.position.y,
    //   this.player.getDimentions().width,
    //   this.player.getDimentions().height,
    //   this.player.getColor() , 
    //   this.player.getHealth() ,
    //   this.player.maxHealth ,
    //   this.player.armor.getHealthValue() ,
    //   this.player.armor.getMaxHaxHealtValue() ,
    // );

    const frame = this.player.spriteManager.getFrame();

    this.UIManager.drawSprite(
      this.player.sprite,
      frame.x/* 1 * (32 * (Math.floor(Math.random() * 4))) */ ,
      frame.y,
      32,
      32,
      this.player.position.x ,
      this.player.position.y ,
      this.player.getDimentions().width * 1  ,
      this.player.getDimentions().height * 1  ,
    );

    this.bullets.forEach((elem) => {

      this.UIManager.draw(
        elem.position.x,
        elem.position.y,
        elem.getDimentions().width,
        elem.getDimentions().height,
        elem.getColor() , 
        elem.getHealth() ,
        elem.maxHealth ,
        elem.armor.getHealthValue() ,
        elem.armor.getMaxHaxHealtValue() ,
      );
    });

    this.enemies.forEach((elem) => {

      this.UIManager.draw(
        elem.position.x,
        elem.position.y,
        elem.getDimentions().width,
        elem.getDimentions().height,
        elem.getColor() , 
        elem.getHealth() ,
        elem.maxHealth ,
        elem.armor.getHealthValue() ,
        elem.armor.getMaxHaxHealtValue() ,
      );

      

    });

    this.supplyBoxes.forEach((elem) => {
      this.UIManager.draw(
        elem.position.x,
        elem.position.y,
        elem.getDimentions().width,
        elem.getDimentions().height,
        elem.getColor() , 
        elem.getHealth() ,
        elem.maxHealth ,
        elem.armor.getHealthValue() ,
        elem.armor.getMaxHaxHealtValue() ,
      );

      
    });
  }

  constructor({
    fieldResolution,

    canvas,
    gameCellDimentions,
  }: {
    fieldResolution: Dimentions; // размеры поля
    canvas: HTMLCanvasElement;
    gameCellDimentions: Dimentions;
  }) {
    
    this.keysManager = new KeysManager(); // управленец нажатыми клавишами

    this.creatorEnemyTicker = new TickController(1000);
    this.supplyBoxCreatingTicker = new TickController(10000);

    this.supplyBoxes = [];
    this.player = null ;
    this.enemies = [] ;
    this.bullets = [] ;

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
          bulletDimentions:{width:100 , height:100} , 
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
      canvasHeight: (this.field.resolution.height + 1) * this.field.gameCellDimentions.height ,
      canvasWidth: (this.field.resolution.width + 1) * this.field.gameCellDimentions.width ,
      gameCellDimentions,
    });

    const audio = new Audio(sound);
    this.audio = audio;

    this.audio.muted = false;

    // this.audio.play();

    window.addEventListener("click", () => {
      this.audio.muted = false;
      // this.audio.play();
    });
  }
}
