import { Armor } from "../library/armore";
import { Attack } from "../library/attack";
import { Damage } from "../library/damage";
import { GameObjectHTMLs } from "../library/game-object-htmls";
import { HTML_unit } from "../library/html_unit";
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
  // protected damaged: Damage[]; // в данный момент получаемыe уроны
  protected health: number;
  protected armor: Armor;
  isDied: boolean;
  protected attack: Attack;
  movement: Movement;

  /* ================================ */

  /* -------- html --------- */

  UI: GameObjectHTMLs;

  HTLM_untit: HTML_unit;

  /* ----------------------- */
}
