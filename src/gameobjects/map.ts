import {
  Dimensions,
  GameObjectExtendsClasses,
  Position,
} from "../library/types";
import { Weapon } from "../library/weapon";
import Door from "./door";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import Obstacle from "./obstacle";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

class Field {
  params: {
    gameCell: { dimensions: Dimensions };
    dimentions: Dimensions | undefined;
  };

  map: (dataTypes | "r")[][];

  constructor(params: { gameCell: { dimensions: Dimensions } }) {
    console.log("map created. params: ", params);

    this.params = { gameCell: params.gameCell, dimentions: undefined };
    this.map = [];
    this.map[0] = [];
    this.map[0][0] = 0;
  }
}

class GameObjects {
  protected doors: Door[];
  protected enemies: Enemy[];
  protected obstacles: Obstacle[];
  protected supplyBoxes: SupplyBox[];
  protected bullets: Bullet[];

  get_enemies() {
    return this.enemies;
  }

  get_bullets() {
    return this.bullets;
  }

  get_obstacles() {
    return this.obstacles;
  }

  get_supplyBoxes() {
    return this.supplyBoxes;
  }

  get_doors() {
    return this.doors;
  }

  insertGameObject(object: GameObjectExtendsClasses) {
    if (object instanceof Enemy) {
      this.enemies.push(object);
    } else if (object instanceof Obstacle) {
      this.obstacles.push(object);
    } else if (object instanceof SupplyBox) {
      this.supplyBoxes.push(object);
    } else if (object instanceof Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Door) {
      this.doors.push(object);
    }
  }

  removeObjetsThatIsDied(obj: GameObjectExtendsClasses[]) {
    obj.filter((obj) => {
      return obj.isDied === true ? true : false;
    });
  }

  removeBulletsThatIsDied() {
    this.bullets = this.bullets.filter((bullet) => bullet.isDied !== true);
  }

  removeEnemiesThatIsDied() {
    this.enemies = this.enemies.filter((enemy) => enemy.isDied !== true);
  }

  removeSuplBoxesThatIsDied() {
    this.supplyBoxes = this.supplyBoxes.filter(
      (supBox) => supBox.isDied !== true
    );
  }

  constructor() {
    this.bullets = [];
    this.enemies = [];
    this.doors = [];
    this.supplyBoxes = [];
    this.obstacles = [];
  }
}

type dataTypes = 0 | 1 | 2;

export default class Map {
  private mapScheme: ("r" | 0 | 1)[][];

  private static allIDs: number[] = [];
  protected id: number;
  protected isLobby: boolean;
  protected gameObjects: GameObjects;
  protected dimensions: Dimensions;
  protected field: Field;

  get_gameObjects() {
    return this.gameObjects;
  }

  get_dimetions() {
    return { ...this.dimensions };
  }

  getID() {
    return this.id;
  }

  getFieldDimentions() {
    return {
      width:
        10 /* this.field.params.resolution.horizontal */ *
        this.field.params.gameCell.dimensions.width,
      height:
        10 /* this.field.params.resolution.vertical */ *
        this.field.params.gameCell.dimensions.height,
    };
  }

  get_fieldParams() {
    return { ...this.field.params };
  }

  initTheMap() {
    // create obstacles

    for (let i = 0; i < 10; i++) {
      this.gameObjects.insertGameObject(
        new Obstacle({
          position: {
            x:
              Math.floor(Math.random() * 10) *
              this.field.params.gameCell.dimensions.width,
            y:
              Math.floor(Math.random() * 10) *
              this.field.params.gameCell.dimensions.height,
          },
        })
      );
    }

    // create these doors

    for (let i = 0; i < 4; i++) {
      this.gameObjects.insertGameObject(
        new Door({
          position: {
            x:
              Math.floor(
                Math.random() *
                  10 /*  this.field.params.resolution.horizontal */
              ) * this.field.params.gameCell.dimensions.width,
            y:
              Math.floor(
                Math.random() * 10 /*this.field.params.resolution.vertical*/
              ) * this.field.params.gameCell.dimensions.height,
          },
          dimentions: {
            width: this.field.params.gameCell.dimensions.width * 2,
            height: this.field.params.gameCell.dimensions.height * 2,
          },
          roomID: i,
        })
      );
    }

    // create enemies
    for (let i = 0; i < 3; i++) {
      this.gameObjects.insertGameObject(
        new Enemy({
          id: 0,
          position: {
            x:
              Math.floor(
                Math.random() * 10 /* this.field.params.resolution.horizontal */
              ) * this.field.params.gameCell.dimensions.width,
            y:
              Math.floor(
                Math.random() * 10
              ) /* this.field.params.resolution.vertical */ *
              this.field.params.gameCell.dimensions.height,
          },
          dimentions: this.field.params.gameCell.dimensions,
          weapons: [
            new Weapon({
              damage: { damageClass: "magic", value: 5 },
              fireRate: Math.floor(Math.random() * 900) + 100,
              maxAllowedStepRange: 20,
              stepRateFadeDown: false,
              stepsLimit: 0,
              title: "somthing",
              impulse: 20,
              bullet: {
                dimensions: { width: 20, height: 20 },
                weight: 10,
              },
            }),
          ],
        })
      );
    }
  }

  setID() {
    let newID = 0;

    if (this.isLobby) {
      this.id = newID;
      Map.allIDs.push(newID);
    } else {
      let isMatch = false;

      do {
        isMatch = Map.allIDs.includes(newID);

        if (isMatch) {
          newID++;
        } else {
          this.id = newID;
          Map.allIDs.push(newID);
          break;
        }
      } while (true);
    }
  }

  constructor(gameCell: { dimensions: Dimensions }, isLobby: boolean = false) {
    this.mapScheme = [];

    this.isLobby = isLobby;
    this.setID();
    this.field = new Field({ gameCell });
    this.gameObjects = new GameObjects();
  }
}
