import { Armor } from "./armore";
import { Damage } from "./damage";
import { Weapon } from "./weapon";

export type ArmorClass = "heavy" | "light";

export type GameObjectKinds =
  | "game_object"
  | "enemy"
  | "player"
  | "damage-entity"
  | "supply-box";

export type Direction = { x: 0 | 1 | -1; y: 0 | 1 | -1 };

export type Position = {
  x: number;
  y: number;
};

export type GameObjectConstructor = {
  id: number;
  kind: GameObjectKinds;
  walkStepRate: number;
  walkStepsLimit: number;
  color: string;
  position: Position;
  ownDamage: Damage;
  direction: Direction;
  health: number;
  weapons: Weapon[];
  armor: Armor;
  shouldFadeDownStepRate: boolean;
};

export type Dimentions = {
  width: number;
  height: number;
};

export type AttackClass = "phisical" | "magic";

export type DamageClass = "phisical" | "magic";

export type UI_stat = {
  linkHTML: {
    value: HTMLElement;
    caption: HTMLElement;
    wrapper: HTMLElement;
  };
  data: {
    caption: string;
    value: string;
  };
};
