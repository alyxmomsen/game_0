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
    keys,
    objects,
    fieldDimentions,
  }: {
    keys: string[];
    objects: (GameObject | SupplyBox | Player | Enemy | Bullet)[];
    fieldDimentions: Dimentions;
  }): Bullet | false {
    // получение урона
    if (this.damaged.length) {
      for (const damage of this.damaged) {
        this.getDamage(damage.value);
      }
    }
    this.damaged = [];

    // this.attack.setOwnDamge(this.calculateOwnDamageBySpeed()); // устанавливаем myOwnDamage в зависимости от скорости движения

    // if (this.kind === "damage-entity") {
    //   console.log(
    //     `${this.attack.ownDamage.value} ${this.calculateOwnDamageBySpeed()}`
    //   );
    // }

    // проверка коллизий
    let isCollision = false;
    for (const object of objects) {
      // если объект не является сам собой и если объект не "умер"
      if (object !== this && !this.isDied) {
        // проверка следующего шага на коллизию
        if (this.checkNextPositionColissionWith(object.position , object.getDimentions())) {
          // object instanceof SupplyBox ; // не проходит эту проверку

          // в этом цикле можно что то сделать с конкретным объектом на котором произошла коллизия

          isCollision = this.ifCollisionIs_For(object); // абстрактный метод возвращает выполняет каки-то действия и подтверждает (или нет) коллизию
        }
      }
    }

    // проверяем не столкнулся ли с границей game field
    if (this.checkCollissionWithFieldLimits({ ...fieldDimentions })) {
      isCollision = true;
      if (this.kind === "damage-entity") {
        // костыль
        this.isDied = true;
      }
    }

    if (!isCollision) {
      this.updatePosition(); // обновляем позицию если нет коллизии на следующем шаге
      this.totallyIfCollisionIsNot(null);
    } else {
      this.totallyIfCollisionIs(null);
      // если на следующем шаге есть коллизия
      // снимаем проверки с других координат отличных от this.position
      this.movement.nextPosition.x = this.position.x;
      this.movement.nextPosition.y = this.position.y;
    }

    /* ======== check if this died ========*/

    if (this.health <= 0) {
      this.isDied = true;
    }

    /* =================================== */

    const up = keys.includes("ArrowUp");
    const down = keys.includes("ArrowDown");
    const left = keys.includes("ArrowLeft");
    const right = keys.includes("ArrowRight");

    return (up || down || left || right) && this.attack.ticker?.tick()
      ? new Bullet({
          direction: this.attack.direction,
          health: 100,
          id: 0,
          ownDamage: new Damage(this.attack.currentWeapon.damage),
          position: {
            x: this.position.x + this.attack.direction.x * 50,
            y: this.position.y + this.attack.direction.y * 50,
          },
          walkStepRate: /* this.attack.currentWeapon.stepRate */ 2,
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
    walkStepRate,
    walkStepRange,
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
    this.movement = new Movement({
      stepRate: walkStepRate,
      direction,
      maxWalkSteps: walkStepsLimit,
      shouldFadeDownStepRate,
      nextPosition: { ...position },
      stepRange: walkStepRange,
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
