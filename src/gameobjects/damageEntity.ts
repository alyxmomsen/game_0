import { Armor, ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import { Bullet } from "./bullet";
import GameObject, { Dimentions, Position } from "./gameobject";

export class DamageEntity extends GameObject {
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
      this.move(this.movement.direction);
    }

    return super.update({ keys, objects, fieldDimentions });
  }

  constructor({
    id,
    position,
  }: {
    id: number;
    armorKind: ArmorClass;
    position: Position;
    bang_interval: number;
  }) {
    super({
      id, //
      kind: "damage-entity",
      walkStepRate: 20,
      walkStepsLimit: 0,
      color: "white",
      position,
      ownDamage: new Damage({ damageClass: "phisical", value: 50 }),
      direction: { x: 1, y: 0 },
      health: 10,
      weapons: [],
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
      walkStepRateFadeDown: false,
    });
  }
}
