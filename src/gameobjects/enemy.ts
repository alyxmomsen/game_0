import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { generateMovementDirection } from "../library/main";
import { Dimentions, Direction_stringType, GameObjectExtendsClasses, Position } from "../library/types";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import GameObject from "./gameobject";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

import sprite from './../images/spites/Enemy/Orc Crew/Orc - Warrior/Idle/Idle-Sheet.png' ;
import { SpriteManager } from "../library/sprite-manager";

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

  worldLimitCollision_handler(): void {
    
  }
  
  update({
    objects,
    fieldDimentions,
  }: {
    objects: GameObjectExtendsClasses[];
    fieldDimentions: Dimentions;
  }): null | Bullet {

    

    this.controller.autoUpdatePer(1000);
    

    return super.update({
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
      color: "#2e3628",
      id,
      kind: "enemy",
      maxAllowWalkStepRange:2 ,
      walkStepRangeDelta:2 , 
      walkStepRangeDeltaMod:0 ,
      walkStepDirectionRange: {x:0 , y:0},
      walkStepsLimit: 10,
      shouldFadeDownStepRate: false,
      position,
      dimentions: {width:200 , height:200} ,
      ownDamage: new Damage({ damageClass: "phisical", value: 10 }),
      weapons,
      health: Math.floor(Math.random() * 995) + 5 /* 1000 */,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000) /* 1000 */,
        dempher: Math.floor(Math.random() * 99) + 1 /* 90 */,
      }),
    });

    

    this.sprite = new Image() ;
    this.sprite.src = sprite ;

    this.spriteManager = new SpriteManager(this.sprite , 3);

  }
}
