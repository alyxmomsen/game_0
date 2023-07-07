import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { Dimentions, Direction, Position } from "../library/types";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

import ric1 from "./../images/ricochet_1.mp3";
import ric2 from "./../images/ricochet_2.mp3";
import ric3 from "./../images/riccochet_3.mp3";
import ric4 from "./../images/riccochet_4.mp3";

export class Bullet extends GameObject {
  audio: HTMLAudioElement;

  ifCollisionIs_For(
    object: Bullet | GameObject | Enemy | Player | SupplyBox
  ): boolean {
    this.audio = new Audio(
      [ric1, ric2, ric3, ric4][Math.floor(Math.random() * 4)]
    );
    this.audio.muted = false;
    this.audio.volume = 0.05;
    this.audio.play();

    this.attackTo(object, {
      damageClass: this.attack.ownDamage.damageClass,
      value: this.calculateOwnDamageBySpeed(),
    }); // object.damaged.push

    return true;
  }

  totallyIfCollisionIsNot(
    object: Bullet | GameObject | Enemy | Player | SupplyBox
  ): void {}

  totallyIfCollisionIs(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {
    // this.movement.direction = {x:0 , y:0} ;
    this.movement.stepRange /= 3; // увеличиваем задержку между шагами
    // this.setStepRate(this.movement.getStepRate() * 1.5); //  не работает

    const axisDirections: [1, 0, -1] = [1, 0, -1];

    if (this.movement.direction.x !== 0) {
      this.movement.direction.x *= -1; // меняем направление движение на противоположное
    } else {
      this.movement.direction.x = axisDirections[Math.floor(Math.random() * 3)];
    }

    if (this.movement.direction.y !== 0) {
      this.movement.direction.y *= -1; // меняем направление движение на противоположное
    } else {
      this.movement.direction.y = axisDirections[Math.floor(Math.random() * 3)];
    }
  }

  performMovement() {

    const stepDecreaseAmount = 0.1 ;

    if (
      !this.movement.maxWalkSteps ||
      this.movement.counterOfSteps < this.movement.maxWalkSteps
    ) {
      this.calculateNextPosition(this.movement.direction);

      if (this.movement.shouldFadeDownStepRate) {
        if (this.movement.stepRange > 0) {
          this.movement.stepRange -= stepDecreaseAmount;

          if (this.movement.stepRange < 0) {
            this.movement.stepRange = 0;
          }
        }
      }
    }
  }

  update({
    keys,
    objects,
    fieldDimentions,
  }: {
    keys: string[];
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimentions;
  }): false | Bullet {
    if (!this.isDied) {
      /*   
        если 'this.movement.walkStepsLimit === 0' , то выполняется Условие 
        если 'this.movement.walkStepsLimit > 0' , то проверяется "this.movement.counterOfSteps < this.movement.walkStepsLimit"
        соответсвенно, если шагов сделано нужное колличество, то Ход не выполняется
      */
      /* 
        !!! note:  ввести Weapon.range
      */

      this.performMovement();
    }

    if (this.movement.stepRange <= 0) {
      // умираем , если слишком медленный
      this.isDied = true;
    }

    /* ========================== */

    const result = super.update({
      keys,
      objects,
      fieldDimentions,
    }); // возвращает объект Bullet

    return result;
  }

  constructor({
    position,
    id,
    direction,
    ownDamage,
    health,
    walkStepRate,
    walkStepRateFadeDown,
    walkStepsLimit,
  }: {
    position: Position;
    id: number;
    direction: Direction;
    health: number;
    ownDamage: Damage;
    walkStepRate: number;
    walkStepRateFadeDown: boolean;
    walkStepsLimit: number;
  }) {
    super({
      ownDamage,
      color: "white",
      id,
      kind: "damage-entity",
      position,
      dimentions: {width:20 , height:20} ,
      walkStepRate,
      walkStepRange: 20,
      walkStepsLimit,
      shouldFadeDownStepRate: walkStepRateFadeDown,
      direction,
      health,
      weapons: [],
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
    });
  }
}
