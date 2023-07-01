import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { generateMovementDirection } from "../library/main";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import GameObject, { Dimentions, Position } from "./gameobject";

// частный случай GameObject
export class Enemy extends GameObject {
  update({
    keys,
    objects,
    fieldDimentions,
  }: {
    keys: string[];
    objects: GameObject[];
    fieldDimentions: Dimentions;
  }): false | Bullet {
    if (!this.isDied && this.movement.ticker.tick()) {
      // this.updateNextPosition(generateMovementDirection());
    }

    // this.setAttackDirection(false);

    return super.update({ keys, objects, fieldDimentions , option:()=>{} });
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
      walkStepRateFadeDown: false,
      position,
      ownDamage: new Damage({ damageClass: "phisical", value: 10 }),
      weapons,
      direction: { x: 1, y: 0 },
      health: Math.floor(Math.random() * 995) + 5,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
    });
  }
}
