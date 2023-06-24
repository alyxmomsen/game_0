import { ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import GameObject, { Position } from "./gameobject";

export class DamageEntity extends GameObject {
  constructor({
    id,
    position,
  }: {
    id: number;
    armorKind: ArmorClass;
    position: Position;
  }) {
    super({
      id, //
      backgroundColor: "white",
      kind: "damage-entity",
      walkTickValue: 20,
      color: "white",
      position,
      damage: new Damage("phisical", 100),
      direction: { x: 1, y: 0 },
      health: 10,
    });
  }
}
