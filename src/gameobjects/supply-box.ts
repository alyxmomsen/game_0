import Game from "../game/game";
import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { SpriteManager } from "../library/sprite-manager";
import { SpriteManager_beta } from "../library/sprite-manager-beta";
import { Dimentions, Position, SupplyBoxContent } from "../library/types";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import GameObject from "./gameobject";
import { Player } from "./player";

export class SupplyBox extends GameObject {
  content: SupplyBoxContent;

  collisionHandlerWith(
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

  worldLimitCollision_handler(): void {}

  update({
    fieldDimentions,
    game,
  }: {
    fieldDimentions: Dimentions;
    game: Game;
  }) {
    super.update({
      fieldDimentions,
      // keys: [],
      objects: [],
      game,
    });
  }

  constructor({ position }: { position: Position }) {
    super({
      id: 0,
      kind: "supply-box",
      maxAllowWalkStepRange: 1,
      walkStepRangeDelta: 2,
      walkStepRangeDeltaMod: 0,
      walkStepDirectionRange: { x: 0, y: 0 },
      walkStepsLimit: 0,
      shouldFadeDownStepRate: false,
      color: "orange",
      position,
      dimentions: { width: 160, height: 160 },
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons: [],
      health: 666,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
      spriteManager: new SpriteManager_beta([]),
      isRigidBody: false,
    });

    const arr: SupplyBoxContent[] = ["armor", "health", "damage"];

    this.content = arr[Math.floor(Math.random() * 2)];
  }
}
