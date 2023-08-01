import { Armor } from "../library/armore";
import { Controller } from "../library/controller";
import { Damage } from "../library/damage";
import { Dimentions, GameObjectKinds, Position } from "../library/types";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { SupplyBox } from "./supply-box";

import skeletonSpriteIdle from "./../images/spites/Enemy/Skeleton Crew/Skeleton - Warrior/Idle/Idle-Sheet.png";
import skeletonSpriteRun from "./../images/spites/Enemy/Skeleton Crew/Skeleton - Warrior/Run/Run-Sheet.png";
import { SpriteManager } from "../library/sprite-manager";
import { SpriteManager_beta } from "../library/sprite-manager-beta";
import Game from "../game/game";

export class Player extends GameObject {
  collisionHandlerWith(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ):void {
    // console.log(this.movement.currentStepRange.x , this.movement.currentStepRange.y);

    if(object) {
      
      if (object instanceof SupplyBox) {
        object.isDied = true;
        this.increaseHealth(500);
        
      } else {
        
      }
    }

  }

  totallyIfCollisionIsNot(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {}

  totallyIfCollisionIs(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {}

  worldLimitCollision_handler(): void {}

  update({
    keys,
    objects,
    fieldDimentions,
    game,
  }: {
    keys: string[];
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimentions;
    game: Game;
  }) {
    this.damaged.forEach((damage) => {
      this.getDamage(damage.value);
    });
    this.damaged = []; // обнуляем массив урона

    this.controller.updateByKeys(keys);

    super.update({
      objects,
      fieldDimentions,
      game,
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
      id,
      kind: "player",
      maxAllowWalkStepRange: 12,
      walkStepRangeDelta: 1,
      walkStepRangeDeltaMod: 0,
      walkStepDirectionRange: { x: 0, y: 0 },
      walkStepsLimit: 0,
      shouldFadeDownStepRate: false,
      color: "green",
      position,
      dimentions: { width: 200, height: 200 },
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons,
      health: 666,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: 99 /* Math.floor(Math.random() * 99) + 1 */,
      }),
      spriteManager: new SpriteManager_beta([
        {
          src: skeletonSpriteIdle,
          firstFramePosition: { x: 0, y: 0 },
          height: 32,
          width: 32,
          maxAllowFrames: 4,
          stepRange: 32,
        },
        {
          src: skeletonSpriteRun,
          firstFramePosition: { x: 18, y: 33 },
          height: 33,
          width: 33,
          maxAllowFrames: 6,
          stepRange: 64,
        },
      ]),
      isRigidBody: true,
    });
  }
}
