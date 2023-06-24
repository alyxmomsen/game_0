import { ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import { Weapon } from "../library/weapon";
import GameObject, { Position } from "./gameobject";

export class Enemy extends GameObject {
  constructor({ id, position , weapons , /* bang_interval */ }: {/* bang_interval:number ;*/  id: number; position: Position ; weapons:Weapon[] }) {
    super({
      backgroundColor: "yellow",
      color: "yellow",
      id,
      kind: "enemy",
      position,
      walkTickValue: 1000,
      ownDamage: new Damage({damageClass:'phisical' , value:10}),
      weapons , 
      direction: { x: 1, y: 0 },
      health: 66,
      // bang_interval ,
    });
  }
}
