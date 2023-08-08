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

import Map from "../gameobjects/map";

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
  roomChangeTickController = new TickController(2000);

  protected currentRoom: Map;

  protected rooms: Map[];

  protected spriteManager: SpriteManager_beta;

  /* test ^^^^ */

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

  protected spawnQueue: (Enemy | Bullet | SupplyBox)[];

  protected player: Player; // объект игрока

  /* ======================== */

  protected viewPort: ViewPort;
  protected controller: GameController;

  public addBullet({
    ownDamage,
    position,
    dimentions,
    maxAllowWalkStepRange,
    walkStepDirectionRange,
    roomID,
  }: {
    roomID: number;
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
    this.currentRoom.insertGameObject(
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

  public update() {
    // получение ключей нажатых клавиш
    const keys = this.keysManager.getPressedKeys();

    if (this.player.position) {
      this.viewPort.autoFocuTo(
        this.player.position,
        this.player.getDimentions(),
        {
          width: this.UIManager.canvas.width,
          height: this.UIManager.canvas.height,
        }
      );
    }

    this.player.update({
      keys,
      objects: [
        ...this.currentRoom.get_enemies(),
        ...this.currentRoom.get_supplyBoxes(),
        ...this.currentRoom.get_obstacles(),
        ...this.currentRoom.get_doors(),
      ],
      fieldDimentions: this.currentRoom.get_dimetions(),
      game: this,
    });

    this.currentRoom.get_enemies().forEach((enemy) => {
      enemy.update({
        objects: [this.player, ...this.currentRoom.get_obstacles()],
        fieldDimentions: this.currentRoom.get_dimetions(),
        game: this,
      });
    });
    this.currentRoom.removeEnemiesThatIsDied();

    this.currentRoom.get_bullets().forEach((bullet) => {
      bullet.update({
        objects: [
          ...this.currentRoom.get_enemies(),
          this.player,
          ...this.currentRoom.get_obstacles(),
        ],
        fieldDimentions: this.currentRoom.get_dimetions(),
        game: this,
      });
    });
    this.currentRoom.removeBulletsThatIsDied();

    this.currentRoom.get_supplyBoxes().forEach((supBox) => {
      supBox.update({
        fieldDimentions: this.currentRoom.get_dimetions(),
        game: this,
      });
    });
    this.currentRoom.removeSuplBoxesThatIsDied();

    this.currentRoom.get_doors().forEach((door) => {
      door.update({
        fieldDimentions: this.currentRoom.get_dimetions(),
        game: this,
        objects: [],
      });
    });

    const supBoxes = this.currentRoom.get_supplyBoxes();
    if (this.supplyBoxCreatingTicker.tick() && supBoxes.length < 3) {
      this.currentRoom.insertGameObject(new SupplyBox({ position: null }));
    }

    this.viewPort.updatePositionMoveStepRangeByKeys(keys);
    this.viewPort.updatePosition();

    // if (this.roomChangeTickController.tick()) {
    //   console.log(this.rooms.length);

    //   const numberOfRooms = this.rooms.length;

    //   if (numberOfRooms > 1) {
    //     for (const room of this.rooms) {
    //       if (room !== this.currentRoom) {
    //         this.currentRoom = room;
    //         break;
    //       }
    //     }
    //   }
    // }
  }

  renderPlayerStats(values: string[]) {
    this.UIManager.renderPlayerStats(values);
  }

  public render() {
    this.UIManager.clearCanvas();

    const background = new Image();
    background.src = bkg;

    for (
      let i = 0;
      i <
      this.currentRoom.getFieldDimentions().height /
        this.UIManager.gameCellDimentions.height;
      i++
    ) {
      for (
        let j = 0;
        j <
        this.currentRoom.getFieldDimentions().width /
          this.UIManager.gameCellDimentions.width;
        j++
      ) {
        this.UIManager.ctx.drawImage(
          background,
          160,
          0,
          60,
          63,
          j * this.UIManager.gameCellDimentions.width -
            this.viewPort.position.x,
          i * this.UIManager.gameCellDimentions.height -
            this.viewPort.position.y,
          this.UIManager.gameCellDimentions.width,
          this.UIManager.gameCellDimentions.height
        );
      }
    }

    this.currentRoom.get_doors().forEach((door) => {
      door.draw(this.UIManager.ctx, this.viewPort.position);
    });

    this.currentRoom.get_obstacles().forEach((obstacle) => {
      obstacle.draw(this.UIManager.ctx, this.viewPort.position);
    });

    this.player.draw(this.UIManager.ctx, this.viewPort.position);

    this.currentRoom.get_bullets().forEach((bullet) => {
      bullet.draw(this.UIManager.ctx, this.viewPort.position);
    });

    this.currentRoom.get_enemies().forEach((enemy) => {
      enemy.draw(this.UIManager.ctx, this.viewPort.position);
    });

    this.currentRoom.get_supplyBoxes().forEach((supplyBox) => {
      supplyBox.draw(this.UIManager.ctx, this.viewPort.position);
    });

    this.renderPlayerStats([
      `HEALTH :  ${this.player.getHealth().toLocaleString()}`,
      `ARMOR : ${this.player.armor.getHealthValue()}`,
      `weapon : ${this.player.get_AttackStats()}`,
    ]);
  }

  changeCurrentRoom(roomID: number) {
    for (const room of this.rooms) {
      if (room.getID() === roomID) {
        this.currentRoom = room;
        return true;
      }
    }

    return false;
  }

  constructor({
    canvas,
    gameCellDimentions,
  }: {
    canvas: HTMLCanvasElement;
    gameCellDimentions: Dimentions;
  }) {
    this.keysManager = new KeysManager(); // управленец нажатыми клавишами
    this.creatorEnemyTicker = new TickController(1000);
    this.supplyBoxCreatingTicker = new TickController(10000);

    // create the lobby room

    const lobbyRoom = new Map(
      {dimesions:gameCellDimentions} ,
      true
    );
    this.rooms = [lobbyRoom];
    lobbyRoom.initRoom();

    this.currentRoom = lobbyRoom; // устанавливаем текущую комнату

    this.rooms.push(
      new Map({dimesions:gameCellDimentions})
    );

    console.log(this.rooms);

    // создаем игрока
    this.player = new Player({
      id: 0,
      position: { x: 6, y: 6 },
      weapons: [],
      dimentions: {
        width: gameCellDimentions.width - 0.5,
        height: gameCellDimentions.height - 0.5,
      },
    });

    this.player.addWeapon(playerWeapon.regular); // добавляем оружие из JSON файла
    this.player.addWeapon(playerWeapon.boosted); // добавляем оружие из JSON файла
    this.player.setWeapon(); // устанавливаем текущее оружие

    // console.log(this.player);

    this.UIManager = new UIManager({
      canvas,
      canvasWidth: 1920 / 1.5,
      canvasHeight: 1080 / 1.5,
      gameCellDimentions,
    });

    const audio = new Audio(sound);
    this.audio = audio;

    this.audio.muted = false;

    this.viewPort = new ViewPort();

    // this.audio.play();

    window.addEventListener("click", () => {
      this.audio.muted = false;
      // this.audio.play();
    });
  }
}
