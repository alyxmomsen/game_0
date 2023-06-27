import { ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import { Tick, calculateMovementDirection } from "../library/main";
import { Weapon } from "../library/weapon";
import GameObject, { Position } from "./gameobject";
// import { heroActions, moveHero } from "./player_keys_checker";

export class Player extends GameObject {
  constructor({
    id,
    position,
    weapons,
  }: {
    id: number;
    position: Position;
    weapons: Weapon[];
  }) {
    super({
      id,
      kind: "player",
      walkTickValue: 100,
      color: "green",
      position,
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons,
      direction: { x: 1, y: 0 },
      health: 99,
      
    });
  }
}
