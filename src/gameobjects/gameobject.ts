import { Armor, ArmorClass } from "../library/armore";
import { Attack, AttackClass } from "../library/attack";
import { Damage } from "../library/damage";
import { Tick, buildGameObjectStatsHTMLElement } from "../library/main";
import { heroActions, moveHero } from "./player_keys_checker";

export default class GameObject {
  damaged: Damage[] = []; // в данный момент получаемыe уроны

  attack: Attack | null;

  walkSpeed: { velocity: number; ticker: null | Tick } = {
    // объект движения
    velocity: 200,
    ticker: null,
  };

  shot_options: { speed: number; ticker: null | Tick } = {
    // объект атаки
    speed: 100,
    ticker: null,
  };

  kind = "game_object";

  id: number;
  health = 100;
  damage = 10;
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

  outerActions() {
    // вывод действий в объект Game

    let actions: {} = null;

    const attack: Attack = this.attack;

    if (attack && attack.status) {
      actions = { ...actions, ...attack };
    }

    return { ...actions };
  }

  interActions({ damage }: { damage: Damage }) {
    this.damaged.push(damage);
  }

  getID() {
    return this.id;
  }

  getDamage(damage: Damage) {
    switch (damage.class) {
      case "phisical":
        this.health -= damage.value;
        damage.value = 0;
        break;
      case "magic":
        break;
    }
  }

  update({ keys, damage }: { keys: string[]; damage: number }) {
    // console.log(this.damaged) ;





    if (this.damaged.length) {
      this.damaged.forEach((elem) => {
        if (elem.value > 0) {
          this.getDamage(elem);
        }
      });
    }

    if (this.kind === "player") {
      heroActions.call(this, { keys });
      moveHero.call(this, { keys });
    }

    this.damaged = [];
  }

  render() {
    this.infc_display.health.innerText = `${this.health}`;
    this.infc_display.id.innerText = `${this.id}`;
    this.infc_display.mainHTMLElement.style.backgroundColor =
      this.backgroundColor;
    // console.log('this.infc_display.health' , this.infc_display.health);
    // console.log(this.infc_display.health);
  }

  constructor({
    id, // 
    fildMaxRows,
    fildMaxCols,
    backgroundColor,
    kind,
    armorKind,
    damaged,
  }: {
    id: number;
    fildMaxRows: number;
    fildMaxCols: number;
    backgroundColor: string;
    kind: string;
    armorKind: ArmorClass;
    damaged: Damage | null;
  }) {
    this.armor = new Armor("light");

    if (damaged) {
      this.damaged.push(damaged);
    }

    this.attack = null;

    this.kind = kind;

    this.position = {
      x: Math.floor(Math.random() * fildMaxCols),
      y: Math.floor(Math.random() * fildMaxRows),
    };

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
