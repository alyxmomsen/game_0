import { Bullet } from "../gameobjects/bullet";
import { Enemy } from "../gameobjects/enemy";
import { Player } from "../gameobjects/player";
import { SupplyBox } from "../gameobjects/supply-box";
import { Armor } from "./armore";
import { Controller } from "./controller";
import { Damage } from "./damage";
import { Weapon } from "./weapon";

export type ArmorClass = "heavy" | "light";

export type GameObjectKinds =
  | "game_object"
  | "enemy"
  | "player"
  | "damage-entity"
  | "supply-box";

export type Direction = { x: number; y: number };

export type Direction_XYType = { x: -1 | 0 | 1; y: -1 | 0 | 1 };

export type Direction_stringType = "up" | "right" | "down" | "left";

export type Position = {
  x: number;
  y: number;
};

export type GameObjectConstructor = {
  id: number;
  kind: GameObjectKinds;
  maxAllowWalkStepRange: number; // макс скорость
  walkStepDirectionRange: { x: number; y: number };
  walkStepsLimit: number;
  color: string;
  position: Position;
  dimentions: Dimentions;
  ownDamage: Damage;
  health: number;
  weapons: Weapon[];
  armor: Armor;
  shouldFadeDownStepRate: boolean;
  stepRangeDelta: number;
  stepRangeDeltaMod: number;
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

export type GameObjectExtendsClasses = Enemy | Bullet | SupplyBox | Player;

export type SupplyBoxContent = "health" | "armor" | "damage";
