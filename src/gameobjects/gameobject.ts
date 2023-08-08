import { Attack } from "../library/attack";
import { Damage } from "../library/damage";
import { Movement } from "../library/movement";
import { Bullet } from "./bullet";
import { SupplyBox } from "./supply-box";
import { Player } from "./player";
import { Enemy } from "./enemy";
import {
  Dimensions,
  GameObjectExtendsClasses,
  GameObjectKinds,
  Position,
  validDamageClasses,
} from "../library/types";

import { GameObject_Part_3 } from "./gameobject-part-3";
import { TickController } from "../library/main";
import { Controller } from "../library/controller";
import { GameObject_part_2 } from "./gameobject-part-2";
import { Weapon } from "../library/weapon";
import { Armor } from "../library/armore";
import { SpriteManager_beta } from "../library/sprite-manager-beta";
import { calculateCollisionByVector } from "../library/calculateCollisionByVector";
import Game from "../game/game";
import { SpriteManager } from "../library/sprite-manager";

export default abstract class GameObject extends GameObject_part_2 {
  /* ====================== options ====================== */

  abstract collisionHandlerWith(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null,
    game: Game
  ): void;

  abstract totallyIfCollisionIsNot(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ): void;

  abstract totallyIfCollisionIs(
    object: GameObject | Enemy | Player | Bullet | SupplyBox | null
  ): void;

  abstract worldLimitCollision_handler(): void;

  /* ===================================================== */

  isHPisSubZero() {
    // возвращает true если здох по здоровью
    return this.health <= 0 ? true : false;
  }

  checkAndHandleCollisionsForEveryOne(
    objects: GameObjectExtendsClasses[],
    game: Game
  ) {
    let collisionCheckResult = {
      position: this.movement.targetPosition,
      collision: false,
    };

    for (const object of objects) {
      if (object !== this && !this.isDied) {
        // если объект не является сам собой и если объект не "умер"

        if (object.position) {
          if (this.position) {
            collisionCheckResult = calculateCollisionByVector(
              {
                position: this.position,
                dimentions: this.dimentions,
                targetPosition: this.movement.targetPosition,
              },
              {
                position: object.position,
                dimentions: object.getDimentions(),
              }
            );

            if (
              object.get_theIsRigidBody() === true &&
              collisionCheckResult.collision
            ) {
              this.movement.targetPosition = collisionCheckResult.position;
            }

            if (collisionCheckResult.collision) {
              this.collisionHandlerWith(object, game);
            }
          }
        } else {
          console.log("object position is NULL");
        }
      }
    }
  }

  getAllDamages() {
    this.damaged.forEach((damage) => {
      this.getDamage(damage.value);
    });

    this.damaged = []; // обнуляем массив урона
  }

  update({
    objects,
    fieldDimentions,
    game,
  }: {
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimensions;
    game: Game;
  }) {
    // const date = new Date () ;
    // const seconds_started = Date.now();
    // const  miliseconds_started = date.getMilliseconds();
    // const started_str = `${seconds_started}${miliseconds_started}` ;
    // const started = Number(started_str) ;

    this.getAllDamages(); // обрабатываем полученые уроны

    this.isDied = this.isHPisSubZero() ? true : this.isDied; // проверяем this.health на ноль-или-отрицательное-значение

    this.movement.updateStepRangeByController({ ...this.controller.move }); // назначаем длину шага по контроллеру

    this.updateTargetPosition(); // вычисляем следующую позицию для дальнейшей проверки её

    /* проверяем не столкнулся ли с границей game field */

    if (this.checkCollissionWithFieldLimits({ ...fieldDimentions })) {
      if (this.position) {
        this.collisionHandlerWith(null, game);
      }
    } else {
    }

    this.checkAndHandleCollisionsForEveryOne(objects, game); //

    /* ===================================================== */

    this.updatePosition(); // обновляем позицию на основании this.movement.targetPosition

    /* implementation logic of the "Fire" */

    const controllerAttackDirection = this.controller.getAttackDirectionValue();
    let data: {
      pos: {
        x: number;
        y: number;
      };
      range: {
        x: number;
        y: number;
      };
    };

    this.updateState();

    const stepRange = this.movement.currentStepRange;

    this.theStates = {
      direction: {
        x: stepRange.x > 0 ? "right" : stepRange.x < 0 ? "left" : "static",
        y: stepRange.y > 0 ? "down" : stepRange.y < 0 ? "up" : "static",
      },
      movement: stepRange.x !== 0 || stepRange.y !== 0 ? "moving" : "static",
    };

    // this.kind === 'player' ? console.log(stepRange) : null ;
    this.kind === "player"
      ? console.log(
          `${this.theStates.direction.x} ${this.theStates.direction.y} ${this.theStates.movement}`
        )
      : null;

    const currentWeapon = this.attack.get_currentWeapon();

    if (controllerAttackDirection !== "" && currentWeapon) {
      data = this.calculateSpawnPointEndAttackDirectionRangeBy(
        controllerAttackDirection
      );

      this.attack.setSpawnPoint(data.pos);
      this.attack.setDirection(data.range);

      // if (this.kind === "player") {
      //   console.log(this.attack.direction);
      // }

      const bulletSpawnPoint = this.attack.getSpawnPoint();
      if (!this.isDied && this.attack.ticker.tick() && bulletSpawnPoint) {
        game.addBullet({
          health: 100,
          id: 0,
          ownDamage: currentWeapon.get_damage(),
          position: bulletSpawnPoint,
          dimentions: currentWeapon.get_bulletDimentions(),
          maxAllowWalkStepRange: currentWeapon.get_maxAllowedStepRange(),
          walkStepDirectionRange: { ...this.attack.direction },
          walkStepRangeDelta: 0.1,
          walkStepRangeDeltaMod: 0.2,
          walkStepRateFadeDown: false,
          walkStepsLimit: 0,
          isRigidBody: true,
          roomID: 0, /// !!!!!!!!!!! warning
          weight: currentWeapon.get_weight(),
        });
      }
    }

    if (this.controller.get_keys().changeWeapon.state) {
      console.log("true true");

      this.changeWeapon();
      this.controller.resetTheKeyChangeWeaponState();
    } else {
      // console.log("no change");
    }

    // const seconds_finished = Date.now();
    // const  miliseconds_finished = date.getMilliseconds();
    // const finished_str = `${seconds_finished}${miliseconds_finished}` ;
    // const finished = Number(finished_str) ;

    // console.log(finished - started);
  }

  draw(ctx: CanvasRenderingContext2D, viewPort: { x: number; y: number }) {
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    // ctx.fillRect(this.position.x , this.position.y , this.dimentions.width , this.dimentions.height);
    ctx.strokeStyle = "white";

    if (this.position) {
      // ctx.strokeRect(
      //   this.position.x - viewPort.x,
      //   this.position.y - viewPort.y,
      //   this.dimentions.width,
      //   this.dimentions.height
      // );
    } else {
      console.log("position is NULL");
    }

    const frame: null | {
      spriteImage: HTMLImageElement;
      x: number;
      y: number;
      width: number;
      height: number;
    } = this.spriteManager.getFrame(
      this.kind === "player" ? (this.state === "move" ? 1 : 0) : 0
    );

    // console.log(frame);

    const calculate = function (
      maxBarWide: number,
      maxValue: number,
      currentValue: number
    ) {
      const widePercentagep_1 = maxBarWide / 100;
      const hp_1 = maxValue / 100;
      const hp = currentValue / hp_1;
      const currentWidePercent = widePercentagep_1 * hp;

      return {
        currentPercentOfValue: hp,
        currentPercentOfWide: currentWidePercent,
      };
    };

    let {
      currentPercentOfValue,
      currentPercentOfWide,
    }: {
      currentPercentOfValue: number;
      currentPercentOfWide: number;
    } = calculate(this.dimentions.width, this.maxHealth, this.health);

    if (currentPercentOfValue < 100) {
      if (this.position) {
        ctx.fillStyle = "red";
        ctx.fillRect(
          this.position.x - viewPort.x,
          this.position.y - viewPort.y - 10,
          currentPercentOfWide,
          10
        );
      } else {
        console.log("position is NULL");
      }
    }

    const result = calculate(
      this.dimentions.width,
      this.armor.getMaxHaxHealtValue(),
      this.armor.getHealthValue()
    );

    if (result.currentPercentOfValue < 100) {
      if (this.position) {
        ctx.fillStyle = "green";
        ctx.fillRect(
          this.position.x - viewPort.x,
          this.position.y - viewPort.y - 20,
          result.currentPercentOfWide,
          10
        );
      } else {
        console.log("position is NULL");
      }
    }

    if (this.position) {
      if (frame) {
        ctx.drawImage(
          frame.spriteImage,
          frame.x,
          frame.y,
          frame.width,
          frame.height,
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
    dimentions,
    kind,
    maxAllowWalkStepRange,
    walkStepDirectionRange: walkStepRange,
    walkStepsLimit,
    shouldFadeDownStepRate,
    ownDamage,
    health,
    weapons,
    color,
    armor,
    walkStepRangeDelta: stepRangeDelta,
    walkStepRangeDeltaMod: stepRangeDeltaMod,
    spriteManager,
    isRigidBody,
  }: // spriteManager_ ,
  {
    id: number;
    kind: GameObjectKinds;
    maxAllowWalkStepRange: number; // макс скорость
    walkStepDirectionRange: { x: number; y: number };
    walkStepsLimit: number;
    color: string;
    position: Position | null;
    dimentions: Dimensions;
    ownDamage: Damage;
    health: number;
    weapons: Weapon[];
    armor: Armor;
    shouldFadeDownStepRate: boolean;
    walkStepRangeDelta: number;
    walkStepRangeDeltaMod: number;
    spriteManager: SpriteManager_beta;
    // spriteManager_:SpriteManager ;
    isRigidBody: boolean;
  }) {
    super();

    this.validDamageClasses = validDamageClasses;

    this.movement = new Movement({
      maxWalkSteps: walkStepsLimit,
      shouldFadeDownStepRate,
      nextPosition: position === null ? { x: 0, y: 0 } : { ...position },
      stepRange: walkStepRange,
      maxAllowStepRange: maxAllowWalkStepRange,
      stepRangeDelta,
      stepRangeDeltaMod,
    });

    this.dimentions = { ...dimentions };

    // this.position = { ...position };

    // const pos = position ;
    this.position = position ? { ...position } : null;

    this.attack = new Attack({
      ownDamage,
      weapons,
      spawnPoint: this.position ? { ...this.position } : null,
    });
    this.armor = armor;
    this.damaged = [];
    this.isDied = false;
    this.kind = kind;
    this.id = id;
    this.health = health;
    this.maxHealth = health;
    this.color = color;

    this.dateOfCreated = Date.now();

    this.rendering = {
      animateTicker: new TickController(200),
      currentSpriteState: 0,
    };

    this.controller = new Controller();

    this.spriteManager = spriteManager;
    // this.spriteManager_ = spriteManager_ ;

    this.state = "stand";

    this.isRigidBody = isRigidBody;

    this.theStates = {
      direction: { x: "left", y: "down" },
      movement: "static",
    };
  }
}
