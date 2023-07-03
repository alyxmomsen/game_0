import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { generateMovementDirection } from "../library/main";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import GameObject, {
  Dimentions,
  GameObjectKinds,
  Position,
} from "./gameobject";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

// частный случай GameObject
export class Enemy extends GameObject {
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

  update({
    keys,
    objects,
    fieldDimentions,
  }: {
    keys: string[];
    objects: (GameObject | Enemy | SupplyBox)[];
    fieldDimentions: Dimentions;
  }): false | Bullet {
    if (!this.isDied && this.movement.getTick()) {
      // this.updateNextPosition(generateMovementDirection());
    }

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
      color: "yellow",
      id,
      kind: "enemy",
      walkStepRate: Math.floor(Math.random() * 990) + 10,
      walkStepsLimit: 0,
      shouldFadeDownStepRate: false,
      position,
      ownDamage: new Damage({ damageClass: "phisical", value: 10 }),
      weapons,
      direction: { x: 1, y: 0 },
      health: /* Math.floor(Math.random() * 995) + 5 */ 1000,
      armor: new Armor({
        health: /* Math.floor(Math.random() * 10000) */ 1000,
        dempher: /* Math.floor(Math.random() * 99) + 1 */ 50,
      }),
    });
  }
}
