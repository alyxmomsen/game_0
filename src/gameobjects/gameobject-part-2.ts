import { Damage } from "../library/damage";
import { Dimentions, Direction, Direction_stringType, Position } from "../library/types";
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
      this.movement.targetPosition.x < subjectPostion.x + subjectDimentions.width &&
      this.movement.targetPosition.x + this.dimentions.width > subjectPostion.x &&
      this.movement.targetPosition.y < subjectPostion.y + subjectDimentions.height &&
      this.movement.targetPosition.y + this.dimentions.height > subjectPostion.y
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
      this.movement.targetPosition.x >= xResolution * 50 ||
      this.movement.targetPosition.x < 0 ||
      this.movement.targetPosition.y >= yResolution * 50 ||
      this.movement.targetPosition.y < 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  calculateNextPositionByMovRange({ x, y }: Direction) {

    this.movement.targetPosition.y = this.position.y + this.movement.currentStepRange.y;
    this.movement.targetPosition.x = this.position.x + this.movement.currentStepRange.x;

    this.movement.counterOfSteps += 1; // счетчик сделаных шагов. связан. используется
  }

  updatePosition() {
    this.position.x = this.movement.targetPosition.x;
    this.position.y = this.movement.targetPosition.y;
  }

  /// beta beta beta
  calculateOwnDamageBySpeed() {
    const damage = this.attack.ownDamage.value;
    const calculatedDamageValue = Math.floor(damage * this.movement.currentStepRange.x / 5);
    return calculatedDamageValue;
  }

  updateNextPosition(): void {

    this.movement.targetPosition.x = this.position.x + this.movement.currentStepRange.x  ;
    this.movement.targetPosition.y = this.position.y + this.movement.currentStepRange.y ;
  }


  calculateSpawnPointEndAttackDirectionRangeBy (controllerAttackDirection:Direction_stringType|'') {


    const o = {
      pos:{x:0 ,y:0} ,
      range:{x:0 , y:0} ,
    }

    if(controllerAttackDirection !== '') {
      
      switch (controllerAttackDirection) {
        case 'down':
          o.pos = {x:this.position.x + this.getDimentions().width / 2  , y:this.position.y + this.getDimentions().height };
          o.range = {x:0 , y:30}
        break ;
        case 'left' :
          o.pos = {x:this.position.x - this.attack.currentWeapon.get_bulletDimentions().width  , y:this.position.y  + this.getDimentions().height / 2};
          o.range = {x:-30 , y:0}
        break ;
        case 'right': 
          o.pos = {x:this.position.x + this.getDimentions().width  , y:this.position.y  + this.getDimentions().height / 2};
          o.range = {x:30 , y:0} ;
        break ;
        case 'up' :
          o.pos = {x:this.position.x + this.getDimentions().width / 2  , y:this.position.y - this.attack.currentWeapon.get_bulletDimentions().height };
          o.range = {x:0 , y:-30} ;
        break ;
      }

    }

    return o ;

  }

  constructor() {
    super();
  }
}
