import { Armor } from "../library/armore";
import { Attack } from "../library/attack";
import { Controller } from "../library/controller";
import { Damage } from "../library/damage";
import { TickController } from "../library/main";
import { Movement } from "../library/movement";
import { SpriteManager } from "../library/sprite-manager";
import { SpriteManager_beta } from "../library/sprite-manager-beta";
import {
  DamageClass,
  Dimentions,
  Direction_stringType,
  GameObjectKinds,
  PersonStates,
  validDamageClasses,
} from "../library/types";
import { Weapon } from "../library/weapon";

export class GameObject_part_1 {
  protected weight: number; // учитывается при столкновениях и инерции, например
  private mood: any; // спонтанность атак, for example
  private relationship: any; // друг , враг , for example
  private hunger: any; // влияет на health
  private fatigue: any; // усталость влияет на скорость и голод

  protected validDamageClasses: DamageClass[];
  protected isRigidBody: boolean; // плотный ли объект (учитыывется при столкновениях)
  protected state: PersonStates;

  spriteManager: SpriteManager_beta;
  sprite: HTMLImageElement;
  protected id: number;
  protected damaged: Damage[]; // в данный момент получаемыe уроны
  protected dateOfCreated: number; // дата спауна
  protected color: string;
  protected kind: GameObjectKinds;
  protected dimentions: Dimentions;
  position: { x: number; y: number } | null = null;
  protected health: number;
  maxHealth: number;
  armor: Armor;
  isDied: boolean;
  protected attack: Attack;
  movement: Movement;
  rendering: {
    animateTicker: TickController;
    currentSpriteState: number;
  };

  controller: Controller;

  theStates: {
    movement: "static" | "moving";
    direction: { x: "left" | "static" | "right"; y: "up" | "static" | "down" };
  };

  constructor() {}
}
