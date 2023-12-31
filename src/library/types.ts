import { Bullet } from "../gameobjects/bullet";
import { Enemy } from "../gameobjects/enemy";
import Obstacle from "../gameobjects/obstacle";
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
  | "supply-box"
  | "obstacle"
  | "door";

export type Direction = { x: number; y: number };

export type Direction_XYType = { x: -1 | 0 | 1; y: -1 | 0 | 1 };

export type Direction_stringType = "up" | "right" | "down" | "left";

export type Position = {
  x: number;
  y: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type AttackClass = "phisical" | "magic";

export type DamageClass = "phisical" | "magic";

export const validDamageClasses: DamageClass[] = ["magic", "phisical"];

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

export type GameObjectExtendsClasses =
  | Enemy
  | Bullet
  | SupplyBox
  | Player
  | Obstacle;

export type SupplyBoxContent = "health" | "armor" | "damage";

export type PersonStates = "move" | "stand"; // тип для  состояния gameobject и его наследников, используется для анимации спрайтов
