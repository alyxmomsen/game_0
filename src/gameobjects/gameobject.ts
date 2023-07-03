import { Armor } from "../library/armore";
import { Attack } from "../library/attack";
import { Damage } from "../library/damage";
import { HTML_unit } from "../library/html_unit";

import { Movement } from "../library/movement";
import { GameObjectHTMLs } from "../library/game-object-htmls";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";
import { SupplyBox } from "./supply-box";
import { Player } from "./player";
import { Enemy } from "./enemy";
import {
  Dimentions,
  GameObjectConstructor,
  GameObjectKinds,
  Position,
} from "../library/types";

export default abstract class GameObject {
  private id: number;
  private dateOfCreated: number;
  private color: string;
  private kind: GameObjectKinds;
  private dimentions: Dimentions;
  position: { x: number; y: number } | null = null;
  private damaged: Damage[]; // в данный момент получаемыe уроны
  private health: number;
  private armor: Armor;
  isDied: boolean;
  protected attack: Attack;
  movement: Movement;

  /* ================================ */

  /* -------- html --------- */

  UI: GameObjectHTMLs;

  HTLM_untit: HTML_unit;

  /* ----------------------- */

  setAttackDirection(keys: string[]) {
    const up = keys.includes("ArrowUp");
    const down = keys.includes("ArrowDown");
    const left = keys.includes("ArrowLeft");
    const right = keys.includes("ArrowRight");

    // здесь есть баг, - если одновременно зажать две клавиши , то объект атакует сам себя

    if (up || down || left || right) {
      if (up && !down) {
        this.attack.direction.y = -1;
      } else if (!up && down) {
        this.attack.direction.y = 1;
      } else {
        this.attack.direction.y = 0;
      }

      if (left && !right) {
        this.attack.direction.x = -1;
      } else if (!left && right) {
        this.attack.direction.x = 1;
      } else {
        this.attack.direction.x = 0;
      }

      //временный дебаг, который иногда не срабатывает
      if (this.attack.direction.x === 0 && this.attack.direction.y === 0) {
        this.attack.direction.x = 1;
      }
    }
  }

  setWalkStepRate(value: number) {
    this.movement.setTickInterval(value < 1 ? 1 : value);
  }

  // 'атака' на указаный объект
  attackTo(
    object: Bullet | GameObject | Enemy | Player | SupplyBox,
    damage: Damage
  ) {
    object.damaged.push(new Damage(damage)); // добавляем объекту атаку в его очередь урона
  }

  getDamage(damage: number) {
    if (this.armor.health > 0) {
      this.armor.health -= Math.floor((damage / 100) * this.armor.dempher);
      this.health -= Math.floor((damage / 100) * (100 - this.armor.dempher));
    } else {
      this.health -= damage;
    }
  }

  // проверка на коллизию nextposition с переданными координатами
  checkNextPositionColissionWith(subjectPostion: Position) {
    if (
      this.movement.nextPosition.x === subjectPostion.x &&
      this.movement.nextPosition.y === subjectPostion.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  // проверка на коллизию со стенами
  checkCollissionWithFieldLimits({
    width,
    height,
  }: {
    width: number;
    height: number;
  }): boolean {
    if (
      this.movement.nextPosition.x >= width ||
      this.movement.nextPosition.x < 0 ||
      this.movement.nextPosition.y >= height ||
      this.movement.nextPosition.y < 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  calculateNextPosition({ x, y }: { x: 1 | -1 | 0; y: 1 | -1 | 0 }) {
    if (x !== 0 || y !== 0) {
      this.movement.nextPosition.y = this.position.y + y;
      this.movement.nextPosition.x = this.position.x + x;
    }

    if (x !== 0) {
      this.movement.direction = { x, y };
    } else if (y !== 0) {
      this.movement.direction = { x, y };
    }

    this.movement.counterOfSteps += 1; // счетчик сделаных шагов. связан. используется
  }

  updatePosition() {
    this.position.x = this.movement.nextPosition.x;
    this.position.y = this.movement.nextPosition.y;
  }

  /// beta beta beta
  calculateOwnDamageBySpeed() {
    const damage = this.attack.ownDamage.value;
    const stepRate = this.movement.getTickInterval();
    const calculatedDamageValue = Math.floor(
      damage / ((stepRate + 1000) / (1000 - stepRate))
    );

    return calculatedDamageValue;
  }

  setOwnDamageValue(value: number) {}

  getOwnDamageValue() {}

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

    if (this.kind === "damage-entity") {
      console.log(
        `${this.attack.ownDamage.value} ${this.calculateOwnDamageBySpeed()}`
      );
    }

    // проверка коллизий
    let isCollision = false;
    for (const object of objects) {
      // если объект не является сам собой и если объект не "умер"
      if (object !== this && !this.isDied) {
        // проверка следующего шага на коллизию
        if (this.checkNextPositionColissionWith(object.position)) {
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

    if (this.isDied === true) {
      this.HTLM_untit.body.remove();
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
            x: this.position.x + this.attack.direction.x,
            y: this.position.y + this.attack.direction.y,
          },
          walkStepRate: this.attack.currentWeapon.stepRate,
          walkStepRateFadeDown: this.attack.currentWeapon.stepRateFadeDown,
          walkStepsLimit: this.attack.currentWeapon
            ? this.attack.currentWeapon.stepsLimit
            : 0,
        })
      : false;
  }

  render() {
    this.UI.render({
      health: this.health.toString(),
      damage: this.attack.currentWeapon?.damage.value.toString(),
      armor: this.armor.health.toString(),
      armor_effeciency: this.armor.dempher.toString(),
    });

    this.HTLM_untit.reRender({
      health: this.health.toString(),
      armor: this.armor.health.toString(),
    });
  }

  constructor({
    id,
    position,
    kind,
    walkStepRate,
    walkStepsLimit,
    shouldFadeDownStepRate,
    ownDamage,
    direction,
    health,
    weapons,
    color,
    armor,
  }: GameObjectConstructor) {
    this.movement = new Movement({
      stepRate: walkStepRate,
      direction,
      maxWalkSteps: walkStepsLimit,
      shouldFadeDownStepRate,
      nextPosition: { ...position },
    });

    this.position = { ...position };
    this.attack = new Attack(ownDamage, weapons);
    this.armor = armor;
    this.damaged = [];
    this.isDied = false;
    this.kind = kind;
    this.id = id;
    this.health = health;

    /* ================= test zone ================= */

    /* ----------- display --------------------------*/

    this.color = color;

    this.UI = new GameObjectHTMLs({
      health: this.health.toString(),
      damage: this.attack.currentWeapon?.damage.value.toString(),
      armor: this.armor.health.toString(),
      armor_effeciency: this.armor.dempher.toString(),
    });

    this.HTLM_untit = new HTML_unit({
      health: this.health.toString(),
      armor: this.armor.health.toString(),
      color: this.color.toString(),
    });

    this.dateOfCreated = Date.now();
  }
}
