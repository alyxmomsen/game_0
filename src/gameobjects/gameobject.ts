import { Armor, ArmorClass } from "../library/armore";
import { Attack, AttackClass } from "../library/attack";
import { Damage } from "../library/damage";
import {
  Tick,
  buildGameObjectStatsHTMLElement,
  calculateMovementDirection,
  generateMovementDirection,
} from "../library/main";
import { Player } from "./player";
import { heroActions, moveHero } from "./player_keys_checker";

export type GameObjectType =
  | "game_object"
  | "enemy"
  | "player"
  | "damage-entity";

export type Position = {
  x: number;
  y: number;
};

export type GameObjectConstructor = {
  id: number;
  backgroundColor: string;
  kind: GameObjectType;
  armorKind: ArmorClass;
  damaged: Damage | null;
  walkSpeed: number;
  color: string;
  position: Position;
};

export type Dimentions = {
  width: number;
  height: number;
};

export default class GameObject {
  dimentions: Dimentions;
  color: string;
  damaged: Damage[] = []; // в данный момент получаемыe уроны

  /* ================================ */

  movement: { direction: "left" | "right" | "up" | "down" };

  walkSpeed: { velocity: number; ticker: null | Tick; speed: number } = {
    // объект движения
    velocity: 1,
    speed: Math.round(1000 / 20) ,
    ticker: null,
  } ;

  /* ================================ */

  kind: GameObjectType = "game_object";

  id: number;

  health = 100;

  attack:Attack ;

  damage: Damage = new Damage("phisical", 0) ;
  attackInterval = 200;
  attackTicker: Tick = null;
  // ddamage = 10;
  armor: Armor;

  position: { x: number; y: number } | null = null;

  backgroundColor: string;

  /* -------- html --------- */
  infc_display: {
    title: HTMLElement;
    health: HTMLElement;
    id: HTMLElement;
    mainHTMLElement: HTMLElement;
  };
  main_html_element: HTMLElement;
  /* ----------------------- */

  // атака на указаный объект
  attackTo(object: GameObject) {
    object.damaged.push(new Damage(this.damage.class, this.damage.value));
  }

  // создание сущности наносящее урон
  generateDamageEntity(keys:string[] ,auto:boolean = true) {

    

    
  }

  checkColissionWith({ x, y }: Position) {

    return this.position.x === x && this.position.y === y ? true : false;
  }

  move({ x, y }: { x: 1 | -1 | 0; y: 1 | -1 | 0 }) {
    if (x !== 0 || y !== 0) {

      this.position.y += y;
      this.position.x += x;
    }

    if (x === 0) {
      if (y !== 0) {
        this.movement.direction = y > 0 ? "down" : "up";
      }
    } else {
      this.movement.direction = x > 0 ? "right" : "left";
    }
  }

  update({
    keys,
    damage,
    objects,
  }: {
    keys: string[];
    damage: number;
    objects: GameObject[];
  }) {

    if(!this.walkSpeed.ticker) {
      this.walkSpeed.ticker = new Tick(this.walkSpeed.speed) ;

      if (this.kind === "player") {
        // двигаем объект
        this.move(calculateMovementDirection(keys));
        // experimental
        this.generateDamageEntity(keys);
      } else if (this.kind === "enemy") {
        this.move(generateMovementDirection());
      }
      
    } else if(this.walkSpeed.ticker.tick()) {

      if (this.kind === "player") {
        // двигаем объект
        this.move(calculateMovementDirection(keys));
        // experimental
        this.generateDamageEntity(keys);
      } else if (this.kind === "enemy") {
        this.move(generateMovementDirection());
      }
    }

    // проверка коллизий

    for (const object of objects) {
      if (object !== this && this.checkColissionWith(object.position)) {
        if (!this.attackTicker) {
          this.attackTicker = new Tick(this.attackInterval);
          this.attackTo(object);
        } else {
          if (this.attackTicker.tick()) {
            this.attackTo(object);
          }
        }
      }
    }

    (() => {

      if (this.damaged.length) {
        for (const damage of this.damaged) {
          this.health -= damage.value;
        }
      }

      this.damaged = [];

    })();
  }

  render() {
    this.infc_display.health.innerText = `${this.health}`;
    this.infc_display.id.innerText = `${this.id}`;
    this.infc_display.mainHTMLElement.style.backgroundColor =
      this.backgroundColor;
  }

  constructor({
    id, //
    position,
    backgroundColor,
    kind = "game_object",
    armorKind,
    damaged,
    walkSpeed,
  }: GameObjectConstructor) {
    this.position = position;
    this.attack = new Attack();

    this.walkSpeed.speed = Math.round(1000 / walkSpeed);
    this.armor = new Armor("light");

    if (damaged) {
      this.damaged.push(damaged);
    }

    this.kind = kind;

    this.id = id;

    this.main_html_element = document.createElement("div");
    this.main_html_element.className = "object-body";
    this.backgroundColor = backgroundColor;
    this.main_html_element.style.backgroundColor = this.backgroundColor;

    this.infc_display = buildGameObjectStatsHTMLElement({
      objectTitle: this.kind,
      newId: this.id,
    });

    console.log("object done: ", this);
  }
}
