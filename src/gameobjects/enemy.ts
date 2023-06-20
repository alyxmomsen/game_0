import { ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import GameObject, { Position } from "./gameobject";

export class Enemy extends GameObject {
  constructor({
    id,
    armorKind,
    damaged,
    position,
  }: {
    id: number;
    armorKind: ArmorClass;
    damaged: Damage | null;
    position: Position;
  }) {
    super({
      armorKind,
      backgroundColor: "yellow",
      color: "yellow",
      damaged,
      id,
      kind: "enemy",
      position,
      walkSpeed: 5,
    });

    this.movement = { direction: "down" };
  }
}
