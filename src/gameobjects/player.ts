import { Armor } from "../library/armore";
import { Controller } from "../library/controller";
import { Damage } from "../library/damage";
import { Dimentions, GameObjectKinds, Position } from "../library/types";
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
      this.increaseHealth(500);
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
  }): null | Bullet {

    this.controller.updateByKeys(keys) ;

    super.update({
      objects,
      fieldDimentions,
    });

    return null ;

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
      maxWalkStepRange:4,
      walkStepDirectionRange: {x:0 , y:0},
      walkStepsLimit: 0,
      shouldFadeDownStepRate: false,
      color: "green",
      position,
      dimentions: {width:100 , height:100} ,
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons,
      direction: { x: 0, y: 0 },
      health: 666,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher:99 /* Math.floor(Math.random() * 99) + 1 */,
      }),
    });
  }
}
