import { Damage } from "../library/damage";
import { generateMovementDirection } from "../library/main";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import GameObject, { Dimentions, Position } from "./gameobject";

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
      this.move(generateMovementDirection());
    }

    return super.update({ keys, objects, fieldDimentions });
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
      position,
      walkTickValue: 1000,
      ownDamage: new Damage({ damageClass: "phisical", value: 10 }),
      weapons,
      direction: { x: 1, y: 0 },
      health: Math.floor(Math.random() * 295) + 5,
    });
  }
}
