import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { SpriteManager_beta } from "../library/sprite-manager-beta";
import { Dimensions, Position } from "../library/types";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { Player } from "./player";
import { SupplyBox } from "./supply-box";

import spriteIMG from "./../images/spites/Environment/Dungeon Prison/Assets/Tiles.png";

export default class Door extends GameObject {
  roomID: number;

  collisionHandlerWith(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ) {}

  totallyIfCollisionIsNot(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ) {}

  totallyIfCollisionIs(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ) {}

  worldLimitCollision_handler() {}

  

  constructor({
    position,
    dimentions,
    roomID,
  }: {
    position: Position;
    dimentions: Dimensions;
    roomID: number;
  }) {
    super({
      color: "#2e3628",
      id: 0,
      kind: "door",
      maxAllowWalkStepRange: 2,
      walkStepRangeDelta: 2,
      walkStepRangeDeltaMod: 0,
      walkStepDirectionRange: { x: 0, y: 0 },
      walkStepsLimit: 10,
      shouldFadeDownStepRate: false,
      position,
      dimentions,
      ownDamage: new Damage({ damageClass: "phisical", value: 10 }),
      weapons: [],
      health: Math.floor(Math.random() * 995) + 5 /* 1000 */,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000) /* 1000 */,
        dempher: Math.floor(Math.random() * 99) + 1 /* 90 */,
      }),
      spriteManager: new SpriteManager_beta([
        {
          src: spriteIMG,
          firstFramePosition: { x: 0, y: 112 },
          height: 50,
          width: 32,
          maxAllowFrames: 1,
          stepRange: 1,
        },
      ]),
      isRigidBody: false,
    });

    this.roomID = roomID;
  }
}
