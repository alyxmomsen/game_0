import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { Dimentions, Direction, Position } from "../library/types";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

import ric1 from "./../images/ricochet_1.mp3";
import ric2 from "./../images/ricochet_2.mp3";
import ric3 from "./../images/riccochet_3.mp3";
import ric4 from "./../images/riccochet_4.mp3";

export class Bullet extends GameObject {
  audio: HTMLAudioElement;

  ifCollisionIs_For(
    object: Bullet | GameObject | Enemy | Player | SupplyBox
  ): boolean {
    this.isDied = true ;
    this.attackTo(object , {...this.attack.ownDamage});

    return true;
  }

  totallyIfCollisionIsNot(
    object: Bullet | GameObject | Enemy | Player | SupplyBox
  ): void {}

  totallyIfCollisionIs(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {
    
  }

  worldLimitCollision_handler(): void {
    this.isDied = true;
  }
  
  update({
    objects,
    fieldDimentions,
  }: {
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimentions;
  }): null | Bullet {



    
    return super.update({objects , fieldDimentions}); ;
  }

  constructor({
    position,
    id,
    ownDamage,
    health,
    walkStepRateFadeDown,
    walkStepsLimit,
    walkStepDirectionRange ,
  }: {
    position: Position;
    id: number;
    health: number;
    ownDamage: Damage;
    walkStepDirectionRange:{x:number , y:number};
    walkStepRateFadeDown: boolean;
    walkStepsLimit: number;
  }) {
    super({
      ownDamage,
      color: "white",
      id,
      kind: "damage-entity",
      position,
      dimentions: {width:20 , height:20} ,
      maxWalkStepRange: 1 ,
      walkStepDirectionRange ,
      walkStepsLimit,
      shouldFadeDownStepRate: walkStepRateFadeDown,
      health,
      weapons: [],
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
    });
  }
}
