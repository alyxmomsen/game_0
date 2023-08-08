import { Dimentions as Dimensions, GameObjectExtendsClasses } from "../library/types";
import { Weapon } from "../library/weapon";
import Door from "./door";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import Obstacle from "./obstacle";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

class Field {
  params: {
    gameCell: { dimesions: Dimensions };
    dimentions:Dimensions|undefined ;
  };



  constructor(params: {
    gameCell: { dimesions: Dimensions };
  }) {
    this.params = {gameCell:params.gameCell , dimentions:undefined};
  }
}

export default class Room {
  private static allIDs: number[] = [];

  protected id: number;

  protected isLobby: boolean;

  protected doors: Door[];
  protected enemies: Enemy[];
  protected obstacles: Obstacle[];
  protected supplyBoxes: SupplyBox[];
  protected bullets: Bullet[];

  protected dimentions: Dimensions;

  protected field: Field;

  insertGameObject(object: GameObjectExtendsClasses) {
    if (object instanceof Enemy) {
      this.enemies.push(object);
    } else if (object instanceof Obstacle) {
      this.obstacles.push(object);
    } else if (object instanceof SupplyBox) {
      const fieldParams = this.get_fieldParams();

      object.position = {
        x:
          Math.floor(Math.random() * 1000/* fieldParams.resolution.horizontal */) *
          fieldParams.gameCell.dimesions.width,
        y:
          Math.floor(Math.random() * 1000/* fieldParams.resolution.vertical */) *
          fieldParams.gameCell.dimesions.height,
      };

      this.supplyBoxes.push(object);
    } else if (object instanceof Bullet) {
      this.bullets.push(object);
    }
  }

  get_dimetions() {
    return { ...this.dimentions };
  }

  get_enemies() {
    // console.log(this.enemies) ;
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

  getID() {
    return this.id;
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

  getFieldDimentions() {
    return {
      width:
        10/* this.field.params.resolution.horizontal */ *
        this.field.params.gameCell.dimesions.width,
      height:
        10/* this.field.params.resolution.vertical */ *
        this.field.params.gameCell.dimesions.height,
    };
  }

  get_fieldParams() {
    return { ...this.field.params };
  }

  initRoom() {

    this.obstacles.push(new Obstacle({
      position:{
        x:0 , y:0
      }
    }));

    // create obstacles
    for (let i = 0; i < 10; i++) {
      this.obstacles.push(
        new Obstacle({
          position: {
            x:
              Math.floor(
                 Math.random() * 10/* this.field.params.resolution.horizontal */ 
              ) * this.field.params.gameCell.dimesions.width,
            y:
              Math.floor(
                 Math.random() * 10/*this.field.params.resolution.vertical */
              ) * this.field.params.gameCell.dimesions.height,
          },
        })
      );
    }

    // create these doors

    for (let i = 0; i < 4; i++) {
      const newDoor = new Door({
        position: {
          x:
            Math.floor(
              Math.random() * 10/*  this.field.params.resolution.horizontal */
            ) * this.field.params.gameCell.dimesions.width,
          y:
           Math.floor(Math.random() * 10/*this.field.params.resolution.vertical*/)  *
            this.field.params.gameCell.dimesions.height,
        },
        dimentions: {
          width: this.field.params.gameCell.dimesions.width * 2,
          height: this.field.params.gameCell.dimesions.height * 2,
        } ,
        roomID: i,
      });

      this.doors.push(newDoor);
    }

    // create enemies
    for (let i = 0; i < 3; i++) {
      const newEnemy = new Enemy({
        id: 0,
        position: {
          x:
            Math.floor(
               Math.random() *10/* this.field.params.resolution.horizontal */
            ) * this.field.params.gameCell.dimesions.width ,
          y:
           Math.floor(Math.random() *10)/* this.field.params.resolution.vertical */ *
            this.field.params.gameCell.dimesions.height,
        },
        dimentions: this.field.params.gameCell.dimesions,
        weapons: [
          new Weapon({
            bulletDimentions: { width: 50, height: 50 },
            damage: { damageClass: "magic", value: 5 },
            fireRate: Math.floor(Math.random() * 900) + 100,
            maxAllowedStepRange: 20,
            stepRateFadeDown: false,
            stepsLimit: 0,
            title: "somthing",
            impulse: 20 ,
          }),
        ],
      });
      this.enemies.push(newEnemy);
      console.log("enemy created", newEnemy);
    }
  }

  setID() {
    let newID = 0;

    if (this.isLobby) {
      this.id = newID;
      Room.allIDs.push(newID);
    } else {
      let isMatch = false;

      do {
        isMatch = Room.allIDs.includes(newID);

        if (isMatch) {
          newID++;
        } else {
          this.id = newID;
          Room.allIDs.push(newID);
          break;
        }
      } while (true);
    }
  }

  constructor(
    gameCell: { dimesions: Dimensions } ,
    isLobby: boolean = false
  ) {
    this.isLobby = isLobby;

    this.setID();

    this.field = new Field({gameCell});

    this.doors = [];
    this.obstacles = [];
    this.enemies = [];
    this.bullets = [];
    this.supplyBoxes = [];

  }
}
