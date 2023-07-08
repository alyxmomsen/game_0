import { Armor } from "../library/armore";
import { Attack } from "../library/attack";
import { Controller } from "../library/controller";
import { Damage } from "../library/damage";
import { TickController } from "../library/main";
import { Movement } from "../library/movement";
import { SpriteManager } from "../library/sprite-manager";
import { Dimentions, GameObjectKinds } from "../library/types";



export class GameObject_part_1 {

  spriteManager:SpriteManager ;

  sprite:HTMLImageElement ;
  protected id: number;
  protected damaged: Damage[]; // в данный момент получаемыe уроны
  protected dateOfCreated: number;
  protected color: string;
  protected kind: GameObjectKinds;
  protected dimentions: Dimentions;
  position: { x: number; y: number } | null = null;
  protected health: number;
  maxHealth:number ;
  armor: Armor;
  isDied: boolean;
  protected attack: Attack;
  movement: Movement;
  rendering: {
    animateTicker: TickController;
    currentSpriteState: number;
  };

  controller:Controller ;

  constructor() {
    
  }

}
