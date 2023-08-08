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

import weapons from "./../weapon-sets.json";

class Field {
  params: {
    gameCell: { dimensions: Dimensions };
    dimentions: Dimensions | undefined;
  };

  // map: (MapCellContentTypes | "r")[][];

  constructor(params: { gameCell: { dimensions: Dimensions } }) {
    console.log("map created. params: ", params);

    this.params = { gameCell: params.gameCell, dimentions: undefined };
    // this.map = [];
    // this.map[0] = [];
    // this.map[0][0] = 'void';
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

type MapCellContentTypes = "void" | "reserved" | "obstacle" | "door";

export class Iterator {
  private position: Position;
  private shift: Position;
  setStartPosition(position: Position) {
    this.position = position;
  }
  getPosition() {
    return { ...this.position };
  }
  setOffset(shift: Position) {
    this.shift = shift;
  }
  getShift() {
    return { ...this.shift };
  }
  calculatePosition() {
    return {
      x: this.position.x + this.shift.x,
      y: this.position.y + this.shift.y,
    };
  }
  constructor() {
    this.position = { x: 1, y: 1 };
    this.shift = { x: 0, y: 0 };
  }
}

export default class Map {
  private mapCells: MapCellContentTypes[][];

  private availableObjectTypes: MapCellContentTypes[];

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

  checkThatIsThePointVacant({ x, y }: { x: number; y: number }) {
    if (this.mapCells[y] === undefined) {
      return true;
    } else if (this.mapCells[y][x] === undefined) {
      return true;
    }
  }

  generateObjectType() {
    const type = Math.floor(Math.random() * this.availableObjectTypes.length);

    return this.availableObjectTypes[type];
  }

  setSquare({ x, y }: { x: number; y: number }) {
    const iter = new Iterator();
    // iter.setStartPosition({x , y});
    // checkPoint

    const handlePosition = () => {};

    const currentStartPointHandler = (ofsetX: number, ofsetY: number) => {
      let letItGo = true;
      do {
        iter.setStartPosition({ x, y });
        iter.setOffset({ x: ofsetX, y: ofsetY });

        const newObjectType = this.generateObjectType();
        let newObject: GameObjectExtendsClasses | null = null;
        let newObjectDimensions: Dimensions;
        let cellDimensions: Dimensions;
        switch (newObjectType) {
          case "obstacle":
            newObject = new Obstacle({ position: null });
            break;
          case "door":
            newObject = new Door({
              dimentions: { width: 100, height: 100 },
              position: { x: 0, y: 0 },
              roomID: 0,
            });
            break;
          case "void":
            // nothing
            break;
        }

        /* ================================ */

        if (newObject !== null) {
          newObjectDimensions = newObject.getDimentions();
          const cell_dimensions = { ...this.field.params.gameCell.dimensions };
          const cells_of_new_obst: Dimensions = { width: 1, height: 1 }; // default

          // вычисление занимаемых клеток сетки по ширине

          if (newObjectDimensions.width > cell_dimensions.width) {
            cells_of_new_obst.width = Math.floor(
              newObjectDimensions.width / cell_dimensions.width
            );
            cells_of_new_obst.width +=
              newObjectDimensions.width % cell_dimensions.width > 0 ? 1 : 0;
          }

          // вычисление занимаемых клеток сетки по высоте

          if (newObjectDimensions.height > cell_dimensions.height) {
            cells_of_new_obst.height = Math.floor(
              newObjectDimensions.height / cell_dimensions.height
            );
            cells_of_new_obst.height +=
              newObjectDimensions.height % cell_dimensions.height > 0 ? 1 : 0;
          }

          // чекаем , есть ли коллизия

          let collisionIs = false; // default value ('collision is false') ;
          const savedPos = iter.getPosition(); // сохраняем значение позиции
          iter.setStartPosition(iter.calculatePosition());
          for (let shiftY = 0; shiftY < cells_of_new_obst.height; shiftY++) {
            for (let shiftX = 0; shiftX < cells_of_new_obst.width; shiftX++) {
              iter.setOffset({ x: shiftX, y: shiftY });
              if (!this.checkThatIsThePointVacant(iter.calculatePosition())) {
                collisionIs = true; // collision detected
                console.log("vacant false");
              }
            }
          }

          iter.setStartPosition(savedPos); // загружаем прежнюю позицию
          iter.setOffset({ x: ofsetX, y: ofsetY });
          if (collisionIs === false) {
            const pos = iter.calculatePosition();

            newObject.position = { x: pos.x * 100, y: pos.y * 100 };
            this.gameObjects.insertGameObject(newObject);

            iter.setStartPosition(iter.calculatePosition());

            for (let shiftY = 0; shiftY < cells_of_new_obst.height; shiftY++) {
              for (let shiftX = 0; shiftX < cells_of_new_obst.width; shiftX++) {
                iter.setOffset({ x: shiftX, y: shiftY });

                const pos = iter.calculatePosition();

                if (this.mapCells[pos.y] === undefined) {
                  this.mapCells[pos.y] = [];
                  this.mapCells[pos.y][pos.x] =
                    shiftX === 0 && shiftY === 0 ? newObjectType : "reserved";
                } else if (this.mapCells[pos.y][pos.x] === undefined) {
                  this.mapCells[pos.y][pos.x] =
                    shiftX === 0 && shiftY === 0 ? newObjectType : "reserved";
                }
              }
            }
          } else {
            continue;
          }
        } else {
          const pos = iter.calculatePosition();
          if (this.mapCells[pos.y] === undefined) {
            this.mapCells[pos.y] = [];
            this.mapCells[pos.y][pos.x] = "reserved";
          } else if (this.mapCells[pos.y][pos.x] === undefined) {
            this.mapCells[pos.y][pos.x] = "reserved";
          }
        }

        letItGo = false;
      } while (letItGo);
    };

    for (let shiftY = 0; shiftY < 3; shiftY++) {
      for (let shiftX = 0; shiftX < 3; shiftX++) {
        currentStartPointHandler(shiftX, shiftY);
      }
    }
  }

  initTheMap() {
    this.setSquare({ x: 0, y: 0 });
    this.setSquare({ x: 3, y: 0 });
    this.setSquare({ x: 6, y: 0 });
    this.setSquare({ x: 0, y: 3 });
    this.setSquare({ x: 3, y: 3 });
    this.setSquare({ x: 6, y: 3 });
    this.setSquare({ x: 0, y: 6 });
    this.setSquare({ x: 3, y: 6 });
    this.setSquare({ x: 6, y: 6 });

    // create enemies
    for (let i = 0; i < 3; i++) {
      const newEnemy = new Enemy({
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
          // ,
        ],
      });

      this.gameObjects.insertGameObject(newEnemy);

      newEnemy.addWeapon(weapons.regular);
      newEnemy.setWeapon();
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
    this.mapCells = [];

    this.isLobby = isLobby;
    this.setID();
    this.field = new Field({ gameCell });
    this.gameObjects = new GameObjects();

    this.availableObjectTypes = ["void", "reserved", "obstacle", "door"];
  }
}
