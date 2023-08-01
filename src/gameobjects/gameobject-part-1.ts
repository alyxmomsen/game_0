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
  GameObjectKinds,
  PersonStates,
  validDamageClasses,
} from "../library/types";
import { Weapon } from "../library/weapon";

export class GameObject_part_1 {
  protected validDamageClasses: DamageClass[];

  protected isRigidBody: boolean; // плотный ли объект (учитыывется при столкновениях)
  protected weight: number; // учитывается при столкновениях и инерции, например

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

  constructor() {}
}
