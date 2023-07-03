import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { calculateMovementDirection } from "../library/main";
import { Dimentions, Position } from "../library/types";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { SupplyBox } from "./supply-box";

export class Player extends GameObject {
  ifCollisionIs_For(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): boolean {
    if (object instanceof SupplyBox) {
      object.isDied = true;

      return false;
    } else {
      return true;
    }
  }

  totallyIfCollisionIsNot(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {}

  totallyIfCollisionIs(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {}

  update({
    keys,
    objects,
    fieldDimentions,
  }: {
    keys: string[];
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimentions;
  }): false | Bullet {
    if (!this.isDied && this.movement.getTick()) {
      this.calculateNextPosition(calculateMovementDirection(keys));
    }

    this.setAttackDirection(keys);

    return super.update({
      keys,
      objects,
      fieldDimentions,
    });
  }

  constructor({
    id,
    position,
    weapons,
  }: {
    id: number;
    position: Position;
    weapons: Weapon[];
  }) {
    super({
      id,
      kind: "player",
      walkStepRate: 100,
      walkStepsLimit: 0,
      shouldFadeDownStepRate: false,
      color: "green",
      position,
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons,
      direction: { x: 1, y: 0 },
      health: 666,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
    });
  }
}
