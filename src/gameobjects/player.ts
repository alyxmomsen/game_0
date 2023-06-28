import { Armor, ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import { Tick, calculateMovementDirection } from "../library/main";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import GameObject, { Dimentions, Position } from "./gameobject";
// import { heroActions, moveHero } from "./player_keys_checker";

export class Player extends GameObject {
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
      this.move(calculateMovementDirection(keys));
    }

    this.setAttackDirection(keys);

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
      id,
      kind: "player",
      walkStepRate: 50,
      walkStepsLimit: 0,
      walkStepRateFadeDown: false,
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
