import { Damage } from "../library/damage";
import GameObject, { Direction, Position } from "./gameobject";

export class Bullet extends GameObject {
  constructor({
    position,
    id,
    direction,
    damage,
  }: {
    position: Position;
    id: number;
    direction: Direction;
    damage: Damage;
  }) {
    super({
      damage,
      backgroundColor: "white",
      color: "white",
      id,
      kind: "damage-entity",
      position,
      walkSpeed: 100,
      direction,
    });
  }
}
