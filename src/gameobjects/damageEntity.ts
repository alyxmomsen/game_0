import { ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import GameObject, { Position } from "./gameobject";

export class DamageEntity extends GameObject {
  constructor({
    id,
    position,
    bang_interval ,
  }: {
    id: number;
    armorKind: ArmorClass;
    position: Position;
    bang_interval:number ,
  }) {
    super({
      id, //
      backgroundColor: "white",
      kind: "damage-entity",
      walkTickValue: 20,
      color: "white",
      position,
      ownDamage: new Damage({damageClass:"phisical", value:50}),
      direction: { x: 1, y: 0 },
      health: 10,
      weapons:[] ,
      // bang_interval ,
    });
  }
}
