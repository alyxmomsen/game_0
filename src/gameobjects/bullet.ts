import { Damage } from "../library/damage";
import GameObject, { Direction, Position } from "./gameobject";

export class Bullet extends GameObject {
  constructor({
    position,
    id,
    direction,
    ownDamage,
    health,
    // bang_interval ,
  }: {
    position: Position;
    id: number;
    direction: Direction;
    // damage: Damage;
    health: number;
    ownDamage:Damage ;
    // bang_interval:number ;
  }) {
    super({
      ownDamage,
      backgroundColor: "white",
      color: "white",
      id,
      kind: "damage-entity",
      position,
      walkTickValue: 1,
      direction,
      health,
      weapons:[] ,
      // bang_interval ,
    });
  }
}
