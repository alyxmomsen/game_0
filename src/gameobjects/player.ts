import { Armor } from "../library/armore";
import { Controller } from "../library/controller";
import { Damage } from "../library/damage";
import { Dimensions, GameObjectKinds, Position } from "../library/types";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { SupplyBox } from "./supply-box";

import skeletonSpriteIdle from "./../images/spites/Heroes/Rogue/Idle/Idle-Sheet.png";
import skeletonSpriteRun from "./../images/spites/Heroes/Rogue/Run/Run-Sheet.png";
import skeletonSpirteRun_mirror from "./../images/spites/Heroes/Rogue/Run/Run-left-Sheet.png";
import { SpriteManager } from "../library/sprite-manager";
import { SpriteManager_beta } from "../library/sprite-manager-beta";
import Game from "../game/game";
// import Door from "./door";
import Door from "./door";

export class Player extends GameObject {
  collisionHandlerWith(
    object: Player | GameObject | Enemy | Bullet | SupplyBox,
    game: Game
  ): void {
    // console.log(this.movement.currentStepRange.x , this.movement.currentStepRange.y);

    if (object) {
      if (object instanceof SupplyBox) {
        object.isDied = true;
        this.increaseHealth(500);
      } else if (object instanceof Door) {
        // меняем текущую комнату
        const door = object;

        if (door.getMapID() === undefined) {
          door.initMapID(game.addMap(game.getCurrentRoomID()));
          console.log("doors map ID : ", door.getMapID());
        }

        if (game.changeCurrentRoom(door.getMapID())) {
          this.position = { x: 150, y: 150 };
          this.movement.targetPosition = { x: 150, y: 150 };
        } else {
          // alert('no map');
        }
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
    fieldDimentions: Dimensions;
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

    this.spriteManager_.getFrame(0);
  }

  draw(
    ctx: CanvasRenderingContext2D,
    viewPort: { x: number; y: number }
  ): void {
    super.draw(ctx, viewPort);
    if (this.position) {
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

      ctx.drawImage(
        frame.src,
        frame.pos.x,
        frame.pos.y,
        frame.dim.width,
        frame.dim.height,
        this.position.x - viewPort.x,
        this.position.y - viewPort.y,
        this.dimentions.width,
        this.dimentions.height
      );
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
      id,
      kind: "player",
      maxAllowWalkStepRange: 2,
      walkStepRangeDelta: 0.1,
      walkStepRangeDeltaMod: 0.1,
      walkStepDirectionRange: { x: 0, y: 0 },
      walkStepsLimit: 0,
      shouldFadeDownStepRate: false,
      color: "green",
      position,
      dimentions,
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons,
      health: 666,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: 99 /* Math.floor(Math.random() * 99) + 1 */,
      }),
      spriteManager: new SpriteManager_beta([
        /* {
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
        }, */
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
          spriteSrc: skeletonSpirteRun_mirror,
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
          spriteSrc: skeletonSpriteRun,
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
          spriteSrc: skeletonSpriteIdle,
        },
      ]),
      isRigidBody: true,
    });
  }
}
