import { ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import GameObject, { Position } from "./gameobject";

export class DamageEntity extends GameObject {
  constructor({
    id,
    armorKind,
    damaged,
    position,
  }: {
    id: number;
    armorKind: ArmorClass;
    damaged: Damage[];
    position: Position;
  }) {
    super({
      id, //
      backgroundColor: "white",
      kind: "damage-entity",
      armorKind,
      damaged,
      walkSpeed: 20,
      color: "white",
      position,
      damage:new Damage('phisical' , 100) ,
    });
  }
}
