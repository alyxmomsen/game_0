import { Damage } from "../library/damage";
import GameObject, { Direction, Position } from "./gameobject";

export class Bullet extends GameObject {
  constructor({
    position,
    id,
    direction,
    damage,
    health,
  }: {
    position: Position;
    id: number;
    direction: Direction;
    damage: Damage;
    health: number;
  }) {
    super({
      damage,
      backgroundColor: "white",
      color: "white",
      id,
      kind: "damage-entity",
      position,
      walkTickValue: 20,
      direction,
      health,
    });
  }
}
