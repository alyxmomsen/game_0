import { ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import { Tick, calculateMovementDirection } from "../library/main";
import GameObject, { Position } from "./gameobject";
// import { heroActions, moveHero } from "./player_keys_checker";

export class Player extends GameObject {
  constructor({ id, position }: { id: number; position: Position }) {
    super({
      id,
      backgroundColor: "green",
      kind: "player",
      walkTickValue: 100,
      color: "green",
      position,
      damage: new Damage({damageClass:"phisical", value:10}),
      direction: { x: 1, y: 0 },
      health: 99,
    });
  }
}
