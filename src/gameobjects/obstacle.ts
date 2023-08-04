import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { SpriteManager_beta } from "../library/sprite-manager-beta";
import { Position } from "../library/types";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

import obstacleIMG from "./../images/spites/Environment/Green Woods/Assets/Props.png";

export default class Obstacle extends GameObject {
  collisionHandlerWith(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ): void {}

  totallyIfCollisionIsNot(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ): void {}

  totallyIfCollisionIs(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ): void {}

  worldLimitCollision_handler(): void {}

  constructor({ position }: { position: Position | null }) {
    super({
      id: 0,
      kind: "obstacle",
      maxAllowWalkStepRange: 1,
      walkStepRangeDelta: 2,
      walkStepRangeDeltaMod: 0,
      walkStepDirectionRange: { x: 0, y: 0 },
      walkStepsLimit: 0,
      shouldFadeDownStepRate: false,
      color: "grey",
      position,
      dimentions: { width: 100, height: 100 },
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons: [],
      health: 999,
      armor: new Armor({
        health: 999,
        dempher: 100,
      }),
      spriteManager: new SpriteManager_beta([
        {
          src: obstacleIMG,
          firstFramePosition: { x: 81, y: 1 },
          height: 30,
          width: 30,
          maxAllowFrames: 1,
          stepRange: 1,
        },
      ]),
      isRigidBody: true,
    });
  }
}
