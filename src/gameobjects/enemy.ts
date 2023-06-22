import { ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import GameObject, { Position } from "./gameobject";

export class Enemy extends GameObject {
  constructor({ id, position }: { id: number; position: Position }) {
    super({
      backgroundColor: "yellow",
      color: "yellow",
      id,
      kind: "enemy",
      position,
      walkSpeed: 5,
      damage: new Damage("phisical", 0),
      direction: { x: 1, y: 0 },
    });
  }
}
