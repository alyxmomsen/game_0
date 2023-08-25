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
// comment
import {
  Dimensions,
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
import generateIDByRating from "../library/generate-id-by-rating";
import LocationManager from "../library/location-manager";

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

  protected currentMap: Map;

  protected mapObjects: Map[];

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
    weight,
    maxAllowWalkStepRange,
    walkStepDirectionRange,
    roomID,
  }: {
    roomID: number;
    health: number;
    id: number;
    ownDamage: Damage;
    position: Position;
    dimentions: Dimensions;
    weight: number;
    maxAllowWalkStepRange: number;
    walkStepDirectionRange: Direction;
    walkStepRangeDelta: number;
    walkStepRangeDeltaMod: number;
    walkStepRateFadeDown: boolean;
    walkStepsLimit: number;
    isRigidBody: boolean;
  }) {
    const gameObjects = this.currentMap.get_gameObjects();

    const fieldParams = this.field;

    gameObjects.insertGameObject(
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

    // const gameObjects = this.
    const currentMap = this.currentMap;
    const currentMapGameObjects = currentMap.get_gameObjects();

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
        ...currentMapGameObjects.get_enemies(),
        ...currentMapGameObjects.get_supplyBoxes(),
        ...currentMapGameObjects.get_obstacles(),
        ...currentMapGameObjects.get_doors(),
      ],
      fieldDimentions: this.currentMap.get_dimetions(),
      game: this,
    });

    currentMapGameObjects.get_enemies().forEach((enemy) => {
      enemy.update({
        objects: [this.player, ...currentMapGameObjects.get_obstacles()],
        fieldDimentions: this.currentMap.get_dimetions(),
        game: this,
      });
    });
    currentMapGameObjects.removeEnemiesThatIsDied();

    currentMapGameObjects.get_bullets().forEach((bullet) => {
      bullet.update({
        objects: [
          ...currentMapGameObjects.get_enemies(),
          this.player,
          ...currentMapGameObjects.get_obstacles(),
        ],
        fieldDimentions: this.currentMap.get_dimetions(),
        game: this,
      });
    });
    currentMapGameObjects.removeBulletsThatIsDied();

    currentMapGameObjects.get_supplyBoxes().forEach((supBox) => {
      supBox.update({
        fieldDimentions: this.currentMap.get_dimetions(),
        game: this,
      });
    });
    currentMapGameObjects.removeSuplBoxesThatIsDied();

    currentMapGameObjects.get_doors().forEach((door) => {
      door.update({
        fieldDimentions: this.currentMap.get_dimetions(),
        game: this,
        objects: [],
      });
    });

    const supBoxes = currentMapGameObjects.get_supplyBoxes();
    const curMapFieldDims = currentMap.get_fieldParams();
    if (this.supplyBoxCreatingTicker.tick() && supBoxes.length < 3) {
      const newSupBox = new SupplyBox({
        position: {
          x:
            Math.floor(
              Math.random() * 10 /* this.field.params.resolution.horizontal */
            ) * curMapFieldDims.gameCell.dimensions.width,
          y:
            Math.floor(
              Math.random() * 10 /*this.field.params.resolution.vertical */
            ) * curMapFieldDims.gameCell.dimensions.height,
        },
      });

      currentMapGameObjects.insertGameObject(newSupBox);

      console.log("supBox created", newSupBox.position, curMapFieldDims);
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

    const fieldDimensions = this.currentMap.getFieldDimentions();

    const field = {
      width: fieldDimensions !== false ? fieldDimensions.width : 5,
      height: fieldDimensions !== false ? fieldDimensions.height : 5,
    };

    for (
      let i = 0;
      i < field.height / this.UIManager.gameCellDimentions.height;
      i++
    ) {
      for (
        let j = 0;
        j < field.width / this.UIManager.gameCellDimentions.width;
        j++
      ) {
        this.UIManager.ctx.drawImage(
          background,
          170,
          20,
          30,
          30,
          j * this.UIManager.gameCellDimentions.width -
            this.viewPort.position.x,
          i * this.UIManager.gameCellDimentions.height -
            this.viewPort.position.y,
          this.UIManager.gameCellDimentions.width,
          this.UIManager.gameCellDimentions.height
        );
      }
    }

    const curMapGameObjects = this.currentMap.get_gameObjects();

    curMapGameObjects.get_doors().forEach((door) => {
      door.draw(this.UIManager.ctx, this.viewPort.position);
    });

    curMapGameObjects.get_obstacles().forEach((obstacle) => {
      obstacle.draw(this.UIManager.ctx, this.viewPort.position);
    });

    this.player.draw(this.UIManager.ctx, this.viewPort.position);

    curMapGameObjects.get_bullets().forEach((bullet) => {
      bullet.draw(this.UIManager.ctx, this.viewPort.position);
    });

    curMapGameObjects.get_enemies().forEach((enemy) => {
      enemy.draw(this.UIManager.ctx, this.viewPort.position);
    });

    curMapGameObjects.get_supplyBoxes().forEach((supplyBox) => {
      supplyBox.draw(this.UIManager.ctx, this.viewPort.position);
    });

    this.renderPlayerStats([
      `HEALTH :  ${this.player.getHealth().toLocaleString()}`,
      `ARMOR : ${this.player.armor.getHealthValue()}`,
      `weapon : ${this.player.get_AttackStats()}`,
      `map ID : ${this.currentMap.getID()}`,
      `map name : ${this.currentMap.title}`,
    ]);

    const doors = this.currentMap.get_gameObjects().get_doors();

    let str = "";

    doors.forEach((theDoor) => {
      const mapID = theDoor.getMapID();

      str += ":" + (mapID !== undefined ? mapID : "undefined");
    });
  }

  getCurrentRoomID() {
    return this.currentMap.getID();
  }

  addMap(roomId: number | undefined) {
    const newMap = new Map({
      dimensions: { width: 100, height: 100 },
    });

    newMap.initTheMap(roomId);

    this.mapObjects.push(newMap);

    return newMap.getID();
  }

  changeCurrentRoom(roomID: number | undefined) {
    if (roomID !== undefined) {
      for (const map of this.mapObjects) {
        // console.log('room id : ' , room.getID() , 'to room : ' , roomID);
        if (map.getID() === roomID) {
          // console.log(room.getID() === roomID);
          this.currentMap = map;
          return true;
        }
      }
    } else {
      console.log("undef");
      return false;
    }
  }

  constructor({
    canvas,
    gameCellDimentions,
  }: {
    canvas: HTMLCanvasElement;
    gameCellDimentions: Dimensions;
  }) {
    this.keysManager = new KeysManager(); // управленец нажатыми клавишами
    this.creatorEnemyTicker = new TickController(1000) ;
    this.supplyBoxCreatingTicker = new TickController(10000) ;

    // create the lobby room

    const lobbyMap = new Map({ dimensions: gameCellDimentions }, true);
    this.mapObjects = [lobbyMap];
    lobbyMap.initTheMap(undefined);

    this.currentMap = lobbyMap; // устанавливаем текущую комнату

    // создаем игрока
    this.player = new Player({
      id: 0,
      position: { x: 105, y: 105 },
      weapons: [],
      dimentions: {
        width: (22 / 32) * gameCellDimentions.height,
        height: gameCellDimentions.height - 10,
      },
    });

    this.player.addWeapon(playerWeapon.regular); // добавляем оружие из JSON файла
    this.player.addWeapon(playerWeapon.boosted); // добавляем оружие из JSON файла
    this.player.setWeapon(); // устанавливаем текущее оружие

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

    // const MAPmMANAGER = new MapManager();

    window.addEventListener("click", () => {
      this.audio.muted = false;
      // this.audio.play();
    });
  }
}
