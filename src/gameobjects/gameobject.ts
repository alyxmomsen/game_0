import { Attack } from "../library/attack";
import { Damage } from "../library/damage";
import { Movement } from "../library/movement";
import { Bullet } from "./bullet";
import { SupplyBox } from "./supply-box";
import { Player } from "./player";
import { Enemy } from "./enemy";
import { Dimentions, GameObjectConstructor } from "../library/types";

import { GameObject_Part_3 } from "./gameobject-part-3";
import { TickController } from "../library/main";

export default abstract class GameObject extends GameObject_Part_3 {
  /* ====================== options ====================== */

  abstract ifCollisionIs_For(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ): boolean;

  abstract totallyIfCollisionIsNot(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ): void;

  abstract totallyIfCollisionIs(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ): void;

  /* ===================================================== */

  update({
    objects ,
    fieldDimentions ,
  }: {
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimentions;
  }): Bullet | false {

    return this.attack.ticker?.tick()
      ? new Bullet({
          direction: {...this.attack.direction} ,
          health: 100,
          id: 0,
          ownDamage: new Damage(this.attack.currentWeapon.damage),
          position: {
            x: 0,
            y: 0,
          },
          walkStepDirectionRange:{x:9 , y:0} ,
          walkStepRateFadeDown: this.attack.currentWeapon.stepRateFadeDown,
          walkStepsLimit: this.attack.currentWeapon
            ? this.attack.currentWeapon.stepsLimit
            : 0,
        })
      : false;
  }

  constructor({
    id,
    position,
    dimentions ,
    kind,
    maxWalkStepRange ,
    walkStepDirectionRange: walkStepRange,
    walkStepsLimit,
    shouldFadeDownStepRate,
    ownDamage,
    direction,
    health,
    weapons,
    color,
    armor,
  }: GameObjectConstructor) {
    super();
    // console.log(maxWalkStepRange , 'hello');
    this.movement = new Movement({
      direction,
      maxWalkSteps: walkStepsLimit,
      shouldFadeDownStepRate,
      nextPosition: { ...position },
      stepRange: walkStepRange,
      maxStepRange: maxWalkStepRange ,
    });

    this.dimentions = { ...dimentions };

    this.position = { ...position };
    this.attack = new Attack(ownDamage, weapons);
    this.armor = armor;
    this.damaged = [];
    this.isDied = false;
    this.kind = kind;
    this.id = id;
    this.health = health;
    this.maxHealth = health ;
    this.color = color;

    this.dateOfCreated = Date.now();

    this.rendering = {
      animateTicker: new TickController(200),
      currentSpriteState: 0,
    };
  }
}
