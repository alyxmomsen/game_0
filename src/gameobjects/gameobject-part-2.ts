import { Damage } from "../library/damage";
import { Dimentions, Direction, Position } from "../library/types";
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
      this.armor.decreaseArmorHealth(Math.floor((damage / 100) * this.armor.dempher)) ;
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

  increaseHealth(value:number) {
    this.health += value ;
    this.maxHealth = this.health ; 
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
  checkNextPositionColissionWith(subjectPostion: Position , subjectDimentions:Dimentions) {
    if (
      this.movement.nextPosition.x < subjectPostion.x + subjectDimentions.width &&
      this.movement.nextPosition.x + this.dimentions.width > subjectPostion.x &&
      this.movement.nextPosition.y < subjectPostion.y + subjectDimentions.height &&
      this.movement.nextPosition.y + this.dimentions.height > subjectPostion.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  // проверка на коллизию со стенами
  checkCollissionWithFieldLimits({
    xResolution ,
    yResolution ,
  }: {
    xResolution: number;
    yResolution: number;
  }): boolean {
    if (
      this.movement.nextPosition.x >= xResolution * 50 ||
      this.movement.nextPosition.x < 0 ||
      this.movement.nextPosition.y >= yResolution * 50 ||
      this.movement.nextPosition.y < 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  calculateNextPositionByMovRange({ x, y }: Direction) {

    this.movement.nextPosition.y = this.position.y + this.movement.stepRange.y;
    this.movement.nextPosition.x = this.position.x + this.movement.stepRange.x;

    this.movement.counterOfSteps += 1; // счетчик сделаных шагов. связан. используется
  }

  updatePosition() {
    this.position.x = this.movement.nextPosition.x;
    this.position.y = this.movement.nextPosition.y;
  }

  /// beta beta beta
  calculateOwnDamageBySpeed() {
    const damage = this.attack.ownDamage.value;
    const calculatedDamageValue = Math.floor(damage * this.movement.stepRange.x / 5);
    return calculatedDamageValue;
  }

  updateNextPosition(): void {

    this.movement.nextPosition.x = this.position.x + this.movement.stepRange.x  ;
    this.movement.nextPosition.y = this.position.y + this.movement.stepRange.y ;
  }

  constructor() {
    super();
  }
}
