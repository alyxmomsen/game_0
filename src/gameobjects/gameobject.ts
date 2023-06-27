import { Armor, ArmorClass } from "../library/armore";
import { Attack, AttackClass } from "../library/attack";
import { Damage } from "../library/damage";
import {
  Tick,
  buildGameObjectStatsHTMLElement,
  calculateMovementDirection,
  generateMovementDirection,
} from "../library/main";
import { Movement } from "../library/movement";
import { Weapon } from "../library/weapon";
import { Player } from "./player";
import { heroActions, moveHero } from "./player_keys_checker";

export type GameObjectType =
  | "game_object"
  | "enemy"
  | "player"
  | "damage-entity";

// export type Direction = "up" | "right" | "down" | "left";
export type Direction = { x: 0 | 1 | -1; y: 0 | 1 | -1 };

export type Position = {
  x: number;
  y: number;
};

export type GameObjectConstructor = {
  id: number;
  backgroundColor: string;
  kind: GameObjectType;
  walkTickValue: number;
  color: string;
  position: Position;
  ownDamage: Damage;
  direction: Direction;
  health: number;

  weapons: Weapon[];
  // bang_interval:number ;
};

export type Dimentions = {
  width: number;
  height: number;
};

export default class GameObject {
  dimentions: Dimentions;
  color: string;
  damaged: Damage[]; // в данный момент получаемыe уроны

  /* ================================ */

  // movement: { direction: Direction };

  walk: { velocity: number; ticker: null | Tick; tickSpeed: number } = {
    // объект движения
    velocity: 1,
    tickSpeed: Math.round(1000 / 20),
    ticker: null,
  };

  movement: Movement;

  /* ================================ */

  kind: GameObjectType = "game_object";

  id: number;

  health: number;
  isDied: boolean;
  attack: Attack;

  armor: Armor;

  position: { x: number; y: number } | null = null;

  backgroundColor: string;

  /* -------- html --------- */
  infc_display: {
    title: HTMLElement;
    health: HTMLElement;
    // id: HTMLElement;
    armor: HTMLElement;
    mainHTMLElement: HTMLElement;
  };
  main_html_element: HTMLElement;
  /* ----------------------- */

  // атака на указаный объект
  attackTo(object: GameObject) {
    object.damaged.push(new Damage(this.attack.ownDamage));
  }

  getDamage(damage: number) {
    if (this.armor.health > 0) {
      this.armor.health -= (damage / 100) * this.armor.dempher;
      this.health -= (damage / 100) * (100 - this.armor.dempher);
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
      if (this.kind === "player") {
        // console.log(x, y, x > 0 ? "right" : "left");
      }
      this.movement.direction = { x, y };
    } else if (y !== 0) {
      if (this.kind === "player") {
        // console.log(x, y, y > 0 ? "down" : "up");
      }
      this.movement.direction = { x, y };
    }
  }

  /* generanteDirection ():Direction {
    const direttions:Direction[] = ['up' , 'right' , 'down' , 'left'] ;
    return direttions[Math.floor(Math.random() * 4)];
  } */

  update({ keys, objects }: { keys: string[]; objects: GameObject[] }) {
    // блок ходов

    // генерация направления

    // this.movement.direction = this.generanteDirection();

    if (!this.isDied && this.movement.ticker.tick()) {
      if (this.kind === "player") {
        this.move(calculateMovementDirection(keys));
      } else if (this.kind === "enemy") {
        this.move(generateMovementDirection());
      } else if (this.kind === "damage-entity") {
        this.move(this.movement.direction);
      }
    }

    // итерация по объектам
    //...

    // проверка коллизий

    for (const object of objects) {
      // если объект не является сам собой и если объект не "умер"
      if (object !== this && !this.isDied) {
        if (this.checkColissionWith(object.position)) {
          if (/* this.attack.ticker.tick() */ true) {
            this.attackTo(object);
          }
        }
      }
    }

    // получение урона

    (() => {
      if (this.damaged.length) {
        for (const damage of this.damaged) {
          // this.health -= damage.value;
          this.getDamage(damage.value);
        }
      }

      this.damaged = [];
    })();

    // проверка коллизий

    for (const object of objects) {
      // если объект не является сам собой и если объект не "умер"
      if (object !== this && !this.isDied) {
        if (this.checkColissionWith(object.position)) {
          if (/* this.attack.ticker.tick() */ true) {
            console.log("collision");
            this.attackTo(object);
          }
        }
      }
    }

    // check if this died

    if (this.health <= 0) {
      this.isDied = true;
    }

    // attacks

    if (this.kind === "player") {
      if (keys.includes(" ") && this.attack.ticker.tick()) {
        this.attack.setTrueStatus();
      }
    }
  }

  render() {
    this.infc_display.health.innerText = `${this.health}`;
    // this.infc_display.id.innerText = `${this.id}`;
    this.infc_display.armor.innerText = `${this.armor.health}`;
    this.infc_display.mainHTMLElement.style.backgroundColor =
      this.backgroundColor;
  }

  constructor({
    id, //
    position,
    backgroundColor,
    kind,
    walkTickValue,
    ownDamage,
    direction,
    health,

    weapons,
  }: GameObjectConstructor) {
    const bang_speed = 100;

    this.movement = new Movement(walkTickValue, direction);
    this.position = position;
    this.attack = new Attack(ownDamage, new Tick(bang_speed), weapons);
    this.armor = new Armor({ health: 101, dempher: 80 });
    this.damaged = [];
    this.isDied = false;
    this.kind = kind;
    this.id = id;
    this.health = health;

    /* ================= test zone ================= */

    /* ----------- display --------------------------*/

    this.main_html_element = document.createElement("div");
    this.main_html_element.className = "object-body";
    this.backgroundColor = backgroundColor;
    this.main_html_element.style.backgroundColor = this.backgroundColor;

    this.infc_display = buildGameObjectStatsHTMLElement({
      objectTitle: this.kind,
      newId: this.id,
      armor: this.armor.health,
    });

    console.log("object done: ", this);
  }
}
