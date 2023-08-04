import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { generateMovementDirection } from "../library/main";
import {
  Dimentions,
  Direction_stringType,
  GameObjectExtendsClasses,
  Position,
} from "../library/types";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import GameObject from "./gameobject";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

import sprite from "./../images/spites/Enemy/Orc Crew/Orc - Warrior/Idle/Idle-Sheet.png";
import { SpriteManager } from "../library/sprite-manager";
import { SpriteManager_beta } from "../library/sprite-manager-beta";
import Game from "../game/game";

// частный случай GameObject
export class Enemy extends GameObject {
  collisionHandlerWith(
    object: Player | GameObject | Enemy | Bullet | SupplyBox
  ): void {
    if (object) {
    } else {
      this.movement.currentStepRange = { x: 0, y: 0 };

      if (this.position) {
        this.movement.targetPosition = { ...this.position };
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
    objects,
    fieldDimentions,
    game,
  }: {
    objects: GameObjectExtendsClasses[];
    fieldDimentions: Dimentions;
    game: Game;
  }) {
    this.controller.autoUpdatePer(1000);

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
    dimentions,
  }: {
    id: number;
    position: Position;
    weapons: Weapon[];
    dimentions: Dimentions;
  }) {
    super({
      color: "#2e3628",
      id,
      kind: "enemy",
      maxAllowWalkStepRange: 10,
      walkStepRangeDelta: 2,
      walkStepRangeDeltaMod: 0,
      walkStepDirectionRange: { x: 0, y: 0 },
      walkStepsLimit: 10,
      shouldFadeDownStepRate: false,
      position,
      dimentions,
      ownDamage: new Damage({ damageClass: "phisical", value: 10 }),
      weapons,
      health: Math.floor(Math.random() * 995) + 5 /* 1000 */,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000) /* 1000 */,
        dempher: Math.floor(Math.random() * 99) + 1 /* 90 */,
      }),
      spriteManager: new SpriteManager_beta([
        {
          src: sprite,
          firstFramePosition: { x: 0, y: 0 },
          height: 32,
          width: 32,
          maxAllowFrames: 4,
          stepRange: 32,
        },
      ]),
      isRigidBody: true,
    });
  }
}
