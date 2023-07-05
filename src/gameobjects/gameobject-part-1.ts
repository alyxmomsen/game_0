import { Armor } from "../library/armore";
import { Attack } from "../library/attack";
import { Damage } from "../library/damage";
import { TickController } from "../library/main";
import { Movement } from "../library/movement";
import { Dimentions, GameObjectKinds } from "../library/types";

export class GameObject_part_1 {
  protected damaged: Damage[]; // в данный момент получаемыe уроны
  protected id: number;
  protected dateOfCreated: number;
  protected color: string;
  protected kind: GameObjectKinds;
  protected dimentions: Dimentions;
  position: { x: number; y: number } | null = null;
  protected health: number;
  protected armor: Armor;
  isDied: boolean;
  protected attack: Attack;
  movement: Movement;
  rendering: {
    animateTicker: TickController;
    currentSpriteState: number;
  };
}
