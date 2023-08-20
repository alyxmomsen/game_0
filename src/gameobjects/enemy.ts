import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { generateMovementDirection } from "../library/main";
import {
  Dimensions,
  Direction_stringType,
  GameObjectExtendsClasses,
  Position,
} from "../library/types";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import GameObject from "./gameobject";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

import sprite_stay from "./../images/spites/Enemy/Orc Crew/Orc - Warrior/Idle/Idle-Sheet.png";
import sprite_run_right from "./../images/spites/Enemy/Orc Crew/Orc - Warrior/Run/Run-Sheet.png";
import sprite_run_left from "./../images/spites/Enemy/Orc Crew/Orc - Warrior/Run/Run-right-Sheet.png";
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
    fieldDimentions: Dimensions;
    game: Game;
  }) {
    this.controller.autoUpdatePer(1000);

    super.update({
      objects,
      fieldDimentions,
      game,
    });
  }

  draw(
    ctx: CanvasRenderingContext2D,
    viewPort: { x: number; y: number }
  ): void {
    super.draw(ctx, viewPort);

    const frame = this.spriteManager_.getFrame(
      this.theStates.direction.y !== "static"
        ? this.theStates.direction.x === "right"
          ? 1
          : this.theStates.direction.x === "left"
          ? 0
          : 1
        : this.theStates.direction.x === "right"
        ? 1
        : this.theStates.direction.x === "left"
        ? 0
        : 2
    );

    if (this.position) {
      if (frame) {
        ctx.drawImage(
          frame./* spriteImage */ src,
          frame./* x */ pos.x,
          frame./* y */ pos.y,
          frame./* width */ dim.width,
          frame./* height */ dim.height,
          this.position.x - viewPort.x,
          this.position.y - viewPort.y,
          this.dimentions.width,
          this.dimentions.height
        );
      }
    }
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
    dimentions: Dimensions;
  }) {
    super({
      color: "#2e3628",
      id,
      kind: "enemy",
      maxAllowWalkStepRange: 2,
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
          src: sprite_stay,
          firstFramePosition: { x: 0, y: 0 },
          height: 32,
          width: 32,
          maxAllowFrames: 4,
          stepRange: 32,
        },
      ]),
      spriteManager_: new SpriteManager([
        {
          frames: {
            totalSteps: 5,
            dimensions: {
              width: 23,
              height: 33,
            },
            first: { x: 342, y: 32 },
            step: {
              velocity: {
                x: -64,
                y: 0,
              },
            },
          },
          spriteSrc: sprite_run_left,
        },
        {
          frames: {
            totalSteps: 5,
            dimensions: {
              width: 23,
              height: 33,
            },
            first: { x: 20, y: 32 },
            step: {
              velocity: {
                x: 64,
                y: 0,
              },
            },
          },
          spriteSrc: sprite_run_right,
        },
        {
          frames: {
            totalSteps: 3,
            dimensions: {
              width: 20,
              height: 30,
            },
            first: { x: 4, y: 2 },
            step: {
              velocity: {
                x: 32,
                y: 0,
              },
            },
          },
          spriteSrc: sprite_stay,
        },
      ]),
      isRigidBody: true,
    });
  }
}
