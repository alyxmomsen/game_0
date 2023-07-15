import { calculateCollisionByVector } from "../library/calculateCollisionByVector";
import { Damage } from "../library/damage";
import {
  Dimentions,
  Direction,
  Direction_stringType,
  PersonStates,
  Position,
} from "../library/types";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { GameObject_part_1 } from "./gameobject-part-1";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

export class GameObject_part_2 extends GameObject_part_1 {
  getDimentions() {
    return { ...this.dimentions };
  }

  getColor() {
    return this.color;
  }

  setWalkStepRate(value: number) {
    this.movement.setTickInterval(value < 1 ? 1 : value);
  }

  getDamage(damage: number) {
    if (this.armor.getHealthValue() > 0) {
      this.armor.decreaseArmorHealth(
        Math.floor((damage / 100) * this.armor.dempher)
      );
      this.health -= Math.floor((damage / 100) * (100 - this.armor.dempher));
    } else {
      this.health -= damage;
    }

    // console.log();
  }

  setOwnDamageValue(value: number) {}

  getOwnDamageValue() {}

  getHealth() {
    return this.health;
  }

  increaseHealth(value: number) {
    this.health += value;
    this.maxHealth = this.health;
  }

  geTheValueDamage() {}

  // 'атака' на указаный объект
  attackTo(
    object: Bullet | GameObject | Enemy | Player | SupplyBox,
    damage: Damage
  ) {
    object.pushIntoDamaged(new Damage(damage)); // добавляем объекту атаку в его очередь урона
  }

  pushIntoDamaged(damage: Damage) {
    this.damaged.push(damage);
  }

  // проверка на коллизию nextposition с переданными координатами
  checkNextPositionColissionWith(
    subjectPostion: Position,
    subjectDimentions: Dimentions
  ) {
    if (this.position) {
      
      if (
        // is collision on the start point
        this.position.x + this.dimentions.width >= subjectPostion.x &&
        this.position.x <= subjectPostion.x + subjectDimentions.width &&
        this.position.y + this.dimentions.height >= subjectPostion.y &&
        this.position.y <= subjectPostion.y + subjectDimentions.height
      ) {
        return true;
      } else if (
        // is collision on the END-POINT

        this.movement.targetPosition.x <=
          subjectPostion.x + subjectDimentions.width &&
        this.movement.targetPosition.x + this.dimentions.width >=
          subjectPostion.x &&
        this.movement.targetPosition.y <=
          subjectPostion.y + subjectDimentions.height &&
        this.movement.targetPosition.y + this.dimentions.height >=
          subjectPostion.y
      ) {
        calculateCollisionByVector(
          {
            position: this.position,
            dimentions: this.dimentions,
            targetPosition: this.movement.targetPosition,
          },
          {
            position: subjectPostion,
            dimentions: subjectDimentions,
          }
        );

        return true;
      } else {
        
        return false;
      }
    }
  }

  // проверка на коллизию со стенами
  checkCollissionWithFieldLimits({
    width,
    height,
  }: {
    width: number;
    height: number;
  }): boolean {
    if (
      this.movement.targetPosition.x + this.dimentions.width >= width ||
      this.movement.targetPosition.x < 0 ||
      this.movement.targetPosition.y + this.dimentions.height >= height ||
      this.movement.targetPosition.y < 0
    ) {
      // console.log(this.position , this.movement.targetPosition , width , height);

      return true;
    } else {
      return false;
    }
  }

  calculateNextPositionByMovRange({ x, y }: Direction) {
    if (this.position) {
      this.movement.targetPosition.y =
        this.position.y + this.movement.currentStepRange.y;
      this.movement.targetPosition.x =
        this.position.x + this.movement.currentStepRange.x;

      this.movement.counterOfSteps += 1; // счетчик сделаных шагов. связан. используется
    } else {
      console.log("position is NULL");
    }
  }

  updatePosition() {
    if (this.position) {
      this.position.x = this.movement.targetPosition.x;
      this.position.y = this.movement.targetPosition.y;
    } else {
      console.log("position is NULL");
    }
  }

  /// beta beta beta
  calculateOwnDamageBySpeed() {
    const damage = this.attack.getOwnDamage();
    const calculatedDamageValue = Math.floor(
      (damage * this.movement.currentStepRange.x) / 5
    );
    return calculatedDamageValue;
  }

  updateTargetPosition(): void {
    if (this.position) {
      this.movement.targetPosition.x =
        this.position.x + this.movement.currentStepRange.x;
      this.movement.targetPosition.y =
        this.position.y + this.movement.currentStepRange.y;
    } else {
      console.log("position is NULL");
    }
  }

  calculateSpawnPointEndAttackDirectionRangeBy(
    controllerAttackDirection: Direction_stringType | ""
  ) {
    const SHIFT = 2;

    const o = {
      pos: { x: 0, y: 0 },
      range: { x: 0, y: 0 },
    };

    if (this.attack.currentWeapon) {
      const maxAllowedStepRange =
        this.attack.currentWeapon.get_maxAllowedStepRange();

      if (controllerAttackDirection !== "") {
        if (this.position) {
          switch (controllerAttackDirection) {
            case "down":
              o.pos = {
                x: this.position.x + this.getDimentions().width / 2,
                y: this.position.y + this.getDimentions().height + SHIFT,
              };
              o.range = { x: 0, y: maxAllowedStepRange };
              break;
            case "left":
              o.pos = {
                x:
                  this.position.x -
                  (this.attack.currentWeapon.get_bulletDimentions().width +
                    SHIFT),
                y: this.position.y + this.getDimentions().height / 2,
              };
              o.range = { x: -maxAllowedStepRange, y: 0 };
              break;
            case "right":
              o.pos = {
                x: this.position.x + this.getDimentions().width + SHIFT,
                y: this.position.y + this.getDimentions().height / 2,
              };
              o.range = { x: maxAllowedStepRange, y: 0 };
              break;
            case "up":
              o.pos = {
                x: this.position.x + this.getDimentions().width / 2,
                y:
                  this.position.y -
                  (this.attack.currentWeapon.get_bulletDimentions().height +
                    SHIFT),
              };
              o.range = { x: 0, y: -maxAllowedStepRange };
              break;
          }
        } else {
          console.log("position is NULL");
        }
      }
    }

    return o;
  }

  // setState (state:PersonStates) {
  //   this.state = state ;
  // }

  updateState() {
    if (
      this.movement.currentStepRange.x !== 0 ||
      this.movement.currentStepRange.y !== 0
    ) {
      this.state = "move";
    } else {
      this.state = "stand";
    }
  }

  private getState() {
    return this.state;
  }

  constructor() {
    super();
  }
}
