import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { randomNumberFromTo } from "../library/randomnumber";
import GameObject, { Dimentions, Direction, Position } from "./gameobject";

export class Bullet extends GameObject {
  update({
    keys,
    objects,
    fieldDimentions,
  }: {
    keys: string[];
    objects: GameObject[];
    fieldDimentions: Dimentions;
  }): false | Bullet {
    if (!this.isDied && this.movement.ticker.tick()) {
      /*   
        если 'this.movement.walkStepsLimit === 0' , то выполняется Условие 
        если 'this.movement.walkStepsLimit > 0' , то проверяется "this.movement.counterOfSteps < this.movement.walkStepsLimit"
        соответсвенно, если шагов сделано нужное колличество, то Ход не выполняется
      */
      /* 
        !!! note:  ввести Weapon.range
      */
      if (
        !this.movement.walkStepsLimit ||
        this.movement.counterOfSteps < this.movement.walkStepsLimit
      ) {
        this.move(this.movement.direction);

        if (this.movement.walkStepFadeDown) {
          this.setWalkStepRate(Math.floor(this.movement.stepRate * 2)); // уменьшаем скорость стэп-рейта на значение
        }
      }
    }

    const result = super.update({ keys, objects, fieldDimentions }); // возвращает объект Bullet

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
  }: {
    position: Position;
    id: number;
    direction: Direction;
    health: number;
    ownDamage: Damage;
    walkStepRate: number;
    walkStepRateFadeDown: boolean;
  }) {
    super({
      ownDamage,
      color: "white",
      id,
      kind: "damage-entity",
      position,
      walkStepRate,
      walkStepsLimit: 0,
      walkStepRateFadeDown,
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
