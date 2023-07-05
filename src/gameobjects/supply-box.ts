import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { Dimentions, Position } from "../library/types";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { Player } from "./player";

export class SupplyBox extends GameObject {
  content: "health" | "armore";

  ifCollisionIs_For(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): boolean {
    return true;
  }

  totallyIfCollisionIsNot(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {}

  totallyIfCollisionIs(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {}

  update({ fieldDimentions }: { fieldDimentions: Dimentions }): false | Bullet {
    return super.update({
      fieldDimentions,
      keys: [],
      objects: [],
    });
  }

  constructor({ position }: { position: Position }) {
    super({
      id: 0,
      kind: "supply-box",
      walkStepRate: 100,
      walkStepRange:0 ,
      walkStepsLimit: 0,
      shouldFadeDownStepRate: false,
      color: "orange",
      position,
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons: [],
      direction: { x: 1, y: 0 },
      health: 666,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
    });

    const arr: ("health" | "armore")[] = ["armore", "health"];

    this.content = arr[Math.floor(Math.random() * 2)];
  }
}
