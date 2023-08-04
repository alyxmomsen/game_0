import { Dimentions, GameObjectExtendsClasses } from "../library/types";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import Obstacle from "./obstacle";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

class Field {
  params: {
    gameCell: { dimetions: Dimentions };
    resolution: { vertical: number; horizontal: number };
  };

  constructor(params: {
    gameCell: { dimetions: Dimentions };
    resolution: { vertical: number; horizontal: number };
  }) {
    this.params = params;
  }
}

export default class Room {
  protected isLobby: boolean;

  protected enemies: Enemy[];
  protected obstacles: Obstacle[];
  protected supplyBoxes: SupplyBox[];
  protected bullets: Bullet[];

  protected dimentions: Dimentions;

  protected field: Field;

  insertGameObject(object: GameObjectExtendsClasses) {

    if (object instanceof Enemy) {
      this.enemies.push(object);
    } else if (object instanceof Obstacle) {
      this.obstacles.push(object);
    } else if (object instanceof SupplyBox) {
      

      const fieldParams = this.get_fieldParams();

      object.position = {
        x:Math.floor(Math.random() * fieldParams.resolution.horizontal) * fieldParams.gameCell.dimetions.width  ,
        y:Math.floor(Math.random() * fieldParams.resolution.vertical) * fieldParams.gameCell.dimetions.height  ,
      }
      
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
    this.supplyBoxes = this.supplyBoxes.filter((supBox) => supBox.isDied !== true);
  }


  getFieldDimentions() {
    return {
      width:
        this.field.params.resolution.horizontal *
        this.field.params.gameCell.dimetions.width,
      height:
        this.field.params.resolution.vertical *
        this.field.params.gameCell.dimetions.height,
    };
  }


  get_fieldParams () {
    return {...this.field.params} ;
  }

  initRoom() {
    for (let i = 0; i < 10; i++) {
      this.obstacles.push(
        new Obstacle({
          position: {
            x:
              Math.floor(
                Math.random() * this.field.params.resolution.horizontal
              ) * this.field.params.gameCell.dimetions.width,
            y:
              Math.floor(
                Math.random() * this.field.params.resolution.vertical
              ) * this.field.params.gameCell.dimetions.height,
          },
        })
      );
    }

    for (let i = 0; i < 3; i++) {
      const newEnemy = new Enemy({
        id: 0,
        position: {
          x:
            Math.floor(
              Math.random() * this.field.params.resolution.horizontal
            ) * this.field.params.gameCell.dimetions.width,
          y:
            Math.floor(Math.random() * this.field.params.resolution.vertical) *
            this.field.params.gameCell.dimetions.height,
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

      this.enemies.push(newEnemy);
      console.log("enemy created", newEnemy);
    }
  }

  constructor(
    field: {
      params: {
        gameCell: { dimetions: Dimentions };
        resolution: { vertical: number; horizontal: number };
      };
    },
    isLobby:boolean = false 
  ) {
    this.isLobby = isLobby;

    this.field = new Field(field.params);

    this.obstacles = [];
    this.enemies = [];
    this.bullets = [];
    this.supplyBoxes = [];

    this.dimentions = {
      width:
        this.field.params.resolution.horizontal *
        this.field.params.gameCell.dimetions.width,
      height:
        this.field.params.resolution.vertical *
        this.field.params.gameCell.dimetions.height,
    };
  }
}
