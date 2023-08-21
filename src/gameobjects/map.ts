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
import WordGen from "../library/word-gen";
import PathFinder from "../library/ray-trace";
import generateIDByRating from "../library/generate-id-by-rating";

class Field {
  params: {
    gameCell: { dimensions: Dimensions };
    dimensions: Dimensions | undefined;
  };

  // map: (MapCellContentTypes | "r")[][];

  constructor(params: { gameCell: { dimensions: Dimensions } }) {
    console.log("map created. params: ", params);

    this.params = { gameCell: params.gameCell, dimensions: undefined };

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

export type MapCellContentTypes = "void" | "reserved" | "obstacle" | "door";

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
  public title: string;

  private mapCells: MapCellContentTypes[][];

  private objectTypesToGeneatate: MapCellContentTypes[];

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
    const width = this.field.params.dimensions?.width;
    const height = this.field.params.dimensions?.height;

    if (width !== undefined && height !== undefined) {
      return {
        width: width * this.field.params.gameCell.dimensions.width,
        height: height * this.field.params.gameCell.dimensions.height,
      };
    } else {
      return false;
    }
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
    this.objectTypesToGeneatate;
    const id = generateIDByRating(this.objectTypesToGeneatate);

    const typeID =
      id; /* Math.floor(Math.random() * this.objectTypesToGeneatate.length) */
    return this.objectTypesToGeneatate[typeID];
  }

  setPeriphery() {
    this.mapCells;
  }

  setSquare(
    { x, y }: { x: number; y: number },
    backRoomID: number | undefined,
    end: ("x" | "y")[]
  ) {
    const iter = new Iterator();

    const currentStartPointHandler = (
      ofsetX: number,
      ofsetY: number,
      end: boolean
    ) => {
      let letItGo = true;

      do {
        iter.setStartPosition({ x, y });
        iter.setOffset({ x: ofsetX, y: ofsetY });

        const newObjectType: MapCellContentTypes =
          end === true
            ? "obstacle"
            : x === 0 && y === 0
            ? ofsetX === 0 || ofsetY === 0
              ? "obstacle"
              : "void"
            : (x === 0 && ofsetX === 0) || (y === 0 && ofsetY === 0)
            ? "obstacle"
            : this.generateObjectType();
        let newObject: GameObjectExtendsClasses | null = null;
        let newObjectDimensions: Dimensions;
        let cellDimensions: Dimensions;
        switch (newObjectType) {
          case "obstacle":
            newObject = new Obstacle({ position: null });
            break;
          case "door":
            const doors = this.get_gameObjects().get_doors();
            const mapID =
              backRoomID === undefined
                ? undefined
                : doors.filter((door) => door.getMapID() === backRoomID)
                    .length > 0
                ? undefined
                : backRoomID;

            newObject = new Door({
              dimentions: this.field.params.gameCell.dimensions,
              position: { x: 0, y: 0 },
              mapID,
            });
            break;
          case "void":
            // nothing
            break;
        }

        const numberOfDoors = this.get_gameObjects().get_doors().length;
        console.log(numberOfDoors);

        if (numberOfDoors > 3 && newObjectType === "door") {
          continue;
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

    const maxY = 3;
    const maxX = 3;

    const isTheEndForX = end.includes("x");
    const isTheEndForY = end.includes("y");

    for (let shiftY = 0; shiftY < maxY; shiftY++) {
      for (let shiftX = 0; shiftX < maxX; shiftX++) {
        currentStartPointHandler(
          shiftX,
          shiftY,
          isTheEndForX && shiftX === maxX - 1
            ? isTheEndForY && shiftY === maxY - 1
              ? true
              : true
            : isTheEndForY && shiftY === maxY - 1
            ? true
            : false
        );
      }
    }
  }

  initTheMap(fromRoomId: number | undefined) {
    const xv = 5;
    const yv = xv;

    for (let xRow = 0; xRow < xv; xRow++) {
      for (let yCol = 0; yCol < yv; yCol++) {
        const finishOption: ("x" | "y")[] = [];

        if (xRow === xv - 1) {
          finishOption.push("x");
        }

        if (yCol === yv - 1) {
          finishOption.push("y");
        }

        this.setSquare({ x: xRow * 3, y: yCol * 3 }, fromRoomId, finishOption);
      }
    }

    /* set this map dimensions */

    this.field.params.dimensions = {
      width: this.mapCells[0].length,
      height: this.mapCells.length,
    };

    console.log("this.field.params.dimentions", this.field.params.dimensions);

    /* ========================  */

    console.log("this map cells", this.mapCells);

    const checkTraces = new PathFinder(
      { dimensions: { width: 100, height: 100 }, position: { x: 0, y: 0 } },
      []
    );

    const obstacles = this.gameObjects.get_doors();
    obstacles.forEach((obst) => {
      console.log("check target", checkTraces.setTarget(obst));
    });

    // create enemies

    console.log("init map , map params : ");
    for (let i = 0; i < 3; i++) {
      const fieldWidth = this.field.params.dimensions.width;
      const fieldHeight = this.field.params.dimensions.height;
      const gameCellWidth = this.field.params.gameCell.dimensions.width;
      const gameCellHeight = this.field.params.gameCell.dimensions.height;

      const newEnemy = new Enemy({
        id: 0,
        position: {
          x:
            Math.floor(Math.random() * this.mapCells[0].length - 2) *
              gameCellWidth +
            gameCellWidth * 5,
          y:
            Math.floor(Math.random() * this.mapCells.length - 2) *
              gameCellHeight +
            gameCellHeight * 5,
        },
        dimentions: {
          height: this.field.params.gameCell.dimensions.height - 10,
          width: (25 / 34) * this.field.params.gameCell.dimensions.width,
        },
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

    this.objectTypesToGeneatate = ["void", "reserved", "obstacle", "door"];

    const wordgen = new WordGen();
    const word = wordgen.gen();

    this.title = word;

    // console.log('this field' , this.field);
  }
}
