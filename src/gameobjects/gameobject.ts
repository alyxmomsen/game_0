import { Armor, ArmorClass } from "../library/armore";
import { Attack, AttackClass } from "../library/attack";
import { Damage } from "../library/damage";
import { HTML_unit } from "../library/html_unit";

import { Movement } from "../library/movement";
import { GameObjectHTMLs } from "../library/game-object-htmls";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";

export type GameObjectType =
  | "game_object"
  | "enemy"
  | "player"
  | "damage-entity";

export type Direction = { x: 0 | 1 | -1; y: 0 | 1 | -1 };

export type Position = {
  x: number;
  y: number;
};

export type GameObjectConstructor = {
  id: number;
  kind: GameObjectType;
  walkStepRate: number;
  walkStepsLimit: number;
  color: string;
  position: Position;
  ownDamage: Damage;
  direction: Direction;
  health: number;
  weapons: Weapon[];
  armor: Armor;
  walkStepRateFadeDown: boolean;
};

export type Dimentions = {
  width: number;
  height: number;
};

export default class GameObject {
  id: number;
  dateOfCreated: number;
  color: string;
  kind: GameObjectType;
  dimentions: Dimentions;
  position: { x: number; y: number } | null = null;
  damaged: Damage[]; // в данный момент получаемыe уроны
  health: number;
  armor: Armor;
  isDied: boolean;
  attack: Attack;
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



    // const direction:Direction = {x:0 , y:0} ;

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
    value < 1 ? (value = 1) : (value = value);

    this.movement.stepRate = value;
    this.movement.ticker.setSpeed(this.movement.stepRate);
  }

  // атака на указаный объект
  attackTo(object: GameObject) {
    object.damaged.push(new Damage(this.attack.ownDamage));
    // alert();
  }

  getDamage(damage: number) {
    if (this.armor.health > 0) {
      this.armor.health -= Math.floor((damage / 100) * this.armor.dempher);
      this.health -= Math.floor((damage / 100) * (100 - this.armor.dempher));
    } else {
      this.health -= damage;
    }
  }

  checkColissionWith({ x, y }: Position) {
    return this.position.x === x && this.position.y === y ? true : false;
  }

  move({ x, y }: { x: 1 | -1 | 0; y: 1 | -1 | 0 }) {
    if (x !== 0 || y !== 0) {
      this.position.y += y;
      this.position.x += x;
    }

    if (x !== 0) {
      this.movement.direction = { x, y };
    } else if (y !== 0) {
      this.movement.direction = { x, y };
    }

    this.movement.counterOfSteps += 1; // счетчик сделаных шагов. связан. используется
  }

  update({
    keys,
    objects,
    fieldDimentions,
  }: {
    keys: string[];
    objects: GameObject[];
    fieldDimentions: Dimentions;
  }): Bullet | false {
    // получение урона

    if (this.damaged.length) {
      for (const damage of this.damaged) {
        this.getDamage(damage.value);
      }
    }

    this.damaged = [];

    // проверка коллизий

    for (const object of objects) {
      // если объект не является сам собой и если объект не "умер"
      if (object !== this && !this.isDied) {
        if (this.checkColissionWith(object.position)) {
          if (/* this.attack.ticker.tick() */ true) {
            console.log("collision");
            this.attackTo(object);

            if (this instanceof Bullet) {
              this.isDied = true;
              this.HTLM_untit.body.remove();
            }
          }
        }
      }
    }

    /* ======== check if this died ========*/

    if (this.health <= 0) {
      this.isDied = true;
      this.HTLM_untit.body.remove();
    }

    if (
      this.position.x > fieldDimentions.width ||
      this.position.x < -1 ||
      this.position.y > fieldDimentions.height ||
      this.position.y < -1
    ) {
      this.isDied = true;
    }

    /* =================================== */

    const up = keys.includes("ArrowUp") ;
    const down = keys.includes("ArrowDown") ;
    const left = keys.includes("ArrowLeft") ;
    const right = keys.includes("ArrowRight") ;

    return (up || down || left || right) &&
      this.attack.ticker?.tick() //&&
      // this.kind === "player"
      ? new Bullet({
          direction: this.attack.direction,
          health: 1,
          id: 0,
          ownDamage: new Damage(this.attack.currentWeapon.damage),
          position: {
            x: this.position.x + this.attack.direction.x,
            y: this.position.y + this.attack.direction.y,
          },
          walkStepRate: this.attack.currentWeapon.stepRate,
          walkStepRateFadeDown: this.attack.currentWeapon.stepRateFadeDown,
          walkStepsLimit: this.attack.currentWeapon ? this.attack.currentWeapon.stepsLimit : 0,
        })
      : false;
  }

  render() {
    this.UI.render({
      health: this.health.toString(),
      damage: this.attack.currentWeapon?.damage.value.toString(),
      armor: this.armor.health.toString(),
      armor_effeciency: this.armor.dempher.toString() ,
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
    walkStepRateFadeDown,
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
      walkStepsLimit,
      walkStepFadeDown: walkStepRateFadeDown,
    });

    this.position = position;

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
      health: this.health.toString() ,
      damage: this.attack.currentWeapon?.damage.value.toString() ,
      armor: this.armor.health.toString() ,
      armor_effeciency:this.armor.dempher.toString() ,
    });

    this.HTLM_untit = new HTML_unit({
      health: this.health.toString(),
      armor: this.armor.health.toString(),
      color: this.color.toString(),
    });

    this.dateOfCreated = Date.now();
  }
}
