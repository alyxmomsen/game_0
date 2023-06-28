import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import {randomNumberFromTo } from "../library/randomnumber";
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

      if(/* this.movement.counterOfSteps < 6 */true /* this.range */) { // если меньше значения то делает следующий шаг /* !!! note:  ввести range  */

        this.move(this.movement.direction);

        // this.setWalkStepRate(Math.floor(this.movement.stepRate * 2)); // уменьшаем скорость стэп-рейта на значение

      }

    }

    const result = super.update({ keys, objects, fieldDimentions });

    return result;
  }

  constructor({
    position,
    id,
    direction,
    ownDamage,
    health,
  }: {
    position: Position;
    id: number;
    direction: Direction;
    health: number;
    ownDamage: Damage;
  }) {
    super({
      ownDamage,
      color: "white",
      id,
      kind: "damage-entity",
      position,
      walkStepRate: randomNumberFromTo({from:1 , to:50}),
      direction,
      health,
      weapons: [],
      armor: new Armor({ health: Math.floor(Math.random() * 10000), dempher: Math.floor(Math.random() * 99 ) + 1 }) ,
    });
  }
}
