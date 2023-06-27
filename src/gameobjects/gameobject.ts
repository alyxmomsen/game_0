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
import { GameObjectUI_HTML } from "../library/objecthtml";
import { Weapon } from "../library/weapon";
import { Bullet } from "./bullet";

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
  // backgroundColor: string;
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
  id: number;
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

  UI:GameObjectUI_HTML ;

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
    // alert();
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
      this.movement.direction = { x, y };
    } else if (y !== 0) {
      this.movement.direction = { x, y };
    }

  }

  update({
    keys,
    objects,
    fieldDimentions ,
  }: {
    keys: string[];
    objects: GameObject[];
    fieldDimentions: Dimentions;
  }): Bullet | false {
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

    if(this.position.x > fieldDimentions.width || this.position.x < -1 || this.position.y > fieldDimentions.height || this.position.y < -1) {
      this.isDied = true ;
    }

    return keys.includes(" ") &&
      this.attack.ticker?.tick() &&
      this.kind === "player"
      ? new Bullet({
          direction: this.movement.direction,
          health: 1,
          id: 0,
          ownDamage: new Damage({ damageClass: "phisical", value: 10 }),
          position: { x: this.position.x, y: this.position.y },
        })
      : false;
  }

  render() {

    this.UI.update({title:this.id.toString() , health:this.health.toString() , armor:this.armor.health.toString()});

    // this.infc_display.health.innerText = `${this.health}`;
    // // this.infc_display.id.innerText = `${this.id}`;
    // this.infc_display.armor.innerText = `${this.armor.health}`;
    // this.infc_display.mainHTMLElement.style.backgroundColor = this.color;
  }

  constructor({
    id,
    position,
    kind,
    walkTickValue,
    ownDamage,
    direction,
    health,
    weapons,
  }: GameObjectConstructor) {

    this.movement = new Movement(walkTickValue, direction);
    this.position = position;

    this.attack = new Attack(ownDamage, weapons);

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
    // this.backgroundColor = backgroundColor;
    this.main_html_element.style.backgroundColor = this.color;


    this.UI = new GameObjectUI_HTML({title:this.id.toString() , health:this.health.toString() , armor:this.armor.health.toString()});


    this.infc_display = buildGameObjectStatsHTMLElement({
      objectTitle: this.kind,
      newId: this.id,
      armor: this.armor.health,
    });

    console.log("object done: ", this);
  }
}
