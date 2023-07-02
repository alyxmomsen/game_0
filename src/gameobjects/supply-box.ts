import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import GameObject from "./gameobject";

export class SupplyBox extends GameObject {


  constructor() {
    super({
      id: 0,
      kind: "supply-box",
      walkStepRate: 100,
      walkStepsLimit: 0,
      walkStepRateFadeDown: false,
      color: "orange",
      position: { x: 0, y: 0 },
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons: [],
      direction: { x: 1, y: 0 },
      health: 666,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
    });
  }
}
