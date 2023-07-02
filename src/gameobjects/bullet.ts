import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
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
    if (!this.isDied && this.movement.getTick()) {
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
        this.updateNextPosition(this.movement.direction);

        if (this.movement.walkStepFadeDown) {
          this.setWalkStepRate(Math.floor(this.movement.getStepRate() * 1.1)); // уменьшаем скорость стэп-рейта на значение
        }
      }
    }

    /*======== option ============  */ // опция для родителя
    const option = () => {
      // this.movement.direction = {x:0 , y:0} ;
      this.movement.setStepRate(this.movement.getStepRate() * 60); // увеличиваем задержку между шагами
      // this.setStepRate(this.movement.getStepRate() * 1.5); //  не работает
      if (this.movement.getStepRate() > 1000) {
        // умираем , если слишком медленный
        this.isDied = true;
      }

      if (this.movement.direction.x !== 0) {
        this.movement.direction.x *= -1; // меняем направление движение на противоположное
      }

      if (this.movement.direction.y !== 0) {
        this.movement.direction.y *= -1; // меняем направление движение на противоположное
      }
    };
    /* ========================== */

    const result = super.update({ keys, objects, fieldDimentions, option }); // возвращает объект Bullet

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
      walkStepRate,
      walkStepsLimit,
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
