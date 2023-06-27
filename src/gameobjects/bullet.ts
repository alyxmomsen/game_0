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
    if (!this.isDied && this.movement.ticker.tick()) {
      this.move(this.movement.direction);
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
      walkTickValue: 1,
      direction,
      health,
      weapons: [],
    });
  }
}
