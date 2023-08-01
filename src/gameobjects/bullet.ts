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
import { SpriteManager } from "../library/sprite-manager";
import { SpriteManager_beta } from "../library/sprite-manager-beta";
import Game from "../game/game";


import bulletIMG from "./../images/spites/Weapons/Bone/Bone.png" ;

export class Bullet extends GameObject {
  audio: HTMLAudioElement;

  collisionHandlerWith(
    object: Bullet | GameObject | Enemy | Player | SupplyBox
  ): void {
    // this.isDied = true ;
    if (object) {
      const calculeteStepRange = Math.abs(
        Math.abs(this.movement.currentStepRange.x) -
          Math.abs(this.movement.currentStepRange.y)
      );
      // console.log(calculeteStepRange * this.attack.getOwnDamage());

      this.attackTo(object, {
        damageClass: "magic",
        value: this.attack.getOwnDamage() * calculeteStepRange,
      });

      this.movement.currentStepRange.x = -this.movement.currentStepRange.x / 3;
      this.movement.currentStepRange.y = -this.movement.currentStepRange.y / 3;

      if (this.movement.currentStepRange.y === 0) {
        this.movement.currentStepRange.y =
          Math.floor(Math.random() * this.movement.currentStepRange.x) *
          [1, -1][Math.floor(Math.random() * 2)];
      }

      if (this.movement.currentStepRange.x === 0) {
        this.movement.currentStepRange.x =
          Math.floor(Math.random() * this.movement.currentStepRange.y) *
          [1, -1][Math.floor(Math.random() * 2)];
      }
    } else {
      /// for example its walls
    }

    // return true;
  }

  totallyIfCollisionIsNot(
    object: Bullet | GameObject | Enemy | Player | SupplyBox
  ): void {}

  totallyIfCollisionIs(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {}

  worldLimitCollision_handler(): void {
    // this.isDied = true;
  }

  update({
    objects,
    fieldDimentions,
    game,
  }: {
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimentions;
    game: Game;
  }) {
    // если пуля не движется , то она удаляется из игры
    if (
      this.movement.currentStepRange.x === 0 &&
      this.movement.currentStepRange.y === 0
    ) {
      this.isDied = true;
    }

    super.update({ objects, fieldDimentions, game });
  }

  constructor({
    position,
    dimentions,
    id,
    ownDamage,
    health,
    maxAllowWalkStepRange,
    walkStepRateFadeDown,
    walkStepsLimit,
    walkStepDirectionRange,
    walkStepRangeDelta,
    walkStepRangeDeltaMod,
    isRigidBody,
  }: {
    position: Position;
    dimentions: Dimentions;
    id: number;
    health: number;
    ownDamage: Damage;
    maxAllowWalkStepRange: number;
    walkStepDirectionRange: { x: number; y: number };
    walkStepRangeDelta: number;
    walkStepRangeDeltaMod: number;
    walkStepRateFadeDown: boolean;
    walkStepsLimit: number;
    isRigidBody: boolean;
  }) {
    super({
      ownDamage,
      color: "white",
      id,
      kind: "damage-entity",
      position,
      dimentions,
      maxAllowWalkStepRange,
      walkStepRangeDelta,
      walkStepRangeDeltaMod,
      walkStepDirectionRange,
      walkStepsLimit,
      shouldFadeDownStepRate: walkStepRateFadeDown,
      health,
      weapons: [],
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
      spriteManager: new SpriteManager_beta([{
        src:bulletIMG ,
        width:11 , 
        height:11 ,
        firstFramePosition: {x:51, y:3} ,
        maxAllowFrames:1 ,
        stepRange:1 ,
      }]),
      isRigidBody,
    });
  }
}
