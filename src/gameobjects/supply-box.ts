import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { Dimentions, Position, SupplyBoxContent } from "../library/types";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { Player } from "./player";

export class SupplyBox extends GameObject {
  content: SupplyBoxContent;

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


  worldLimitCollision_handler(): void {
    
  }

  update({ fieldDimentions }: { fieldDimentions: Dimentions }): null | Bullet {
    return super.update({
      fieldDimentions,
      // keys: [],
      objects: [],
    });
  }

  constructor({ position }: { position: Position }) {
    super({
      id: 0,
      kind: "supply-box",
      maxWalkStepRange:1 ,
      walkStepDirectionRange: {x:0 , y:0},
      walkStepsLimit: 0,
      shouldFadeDownStepRate: false,
      color: "orange",
      position,
      dimentions: {width:160 , height:160} ,
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons: [],
      health: 666,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
    });

    const arr: SupplyBoxContent[] = ["armor", "health" , "damage"];

    this.content = arr[Math.floor(Math.random() * 2)];
  }
}
