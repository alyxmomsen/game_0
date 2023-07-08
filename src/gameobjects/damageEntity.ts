/* import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { ArmorClass, Dimentions, Position } from "../library/types";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

export class DamageEntity extends GameObject {
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
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimentions;
  }): false | Bullet {
    // if (!this.isDied && this.movement.getTick()) {
    //   this.calculateNextPosition(this.movement.direction);
    // }

    return super.update({
      keys,
      objects,
      fieldDimentions,
    });
  }

  constructor({
    id,
    position,
    maxWalkStepRange ,
  }: {
    id: number;
    armorKind: ArmorClass;
    position: Position;
    bang_interval: number;
    maxWalkStepRange:number ;
  }) {
    super({
      id, //
      kind: "damage-entity",
      maxWalkStepRange:1 ,
      walkStepsLimit: 0,
      walkStepDirectionRange: {x:0 , y:0},
      color: "white",
      position,
      dimentions:{width:10 , height:10} ,
      // dimetions:{width:10 , height:10} ,
      ownDamage: new Damage({ damageClass: "phisical", value: 50 }),
      direction: { x: 1, y: 0 },
      health: 10,
      weapons: [],
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
      shouldFadeDownStepRate: false,
    });
  }
}
 */