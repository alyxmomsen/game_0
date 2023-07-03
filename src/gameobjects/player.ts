import { Armor, ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import { TickController, calculateMovementDirection } from "../library/main";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject, { Dimentions, GameObjectKinds, Position } from "./gameobject";
import { SupplyBox } from "./supply-box";
// import { heroActions, moveHero } from "./player_keys_checker";

export class Player extends GameObject {
  
  isCollision_For(object: Player | GameObject | Enemy | Bullet | SupplyBox): void  { }

  isNotCollision_Totally(object: Player | GameObject | Enemy | Bullet | SupplyBox): void  { }

  isCollision_Totally(object: Player | GameObject | Enemy | Bullet | SupplyBox): void  { }

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
      this.updateNextPosition(calculateMovementDirection(keys));
    }

    this.setAttackDirection(keys);
    // alert();
    return super.update({
      keys,
      objects,
      fieldDimentions,
    });
  }

  render(): void {
    super.render();
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
