import { Damage } from "../library/damage";
import GameObject, { Direction, Position } from "./gameobject";

export class Bullet extends GameObject {

  update({ keys, objects }: { keys: string[]; objects: GameObject[]; }): false | Bullet {
    
    const result = super.update({keys , objects});
    
    // if(this.position.x > )
    
    return result ;
  }

  constructor({
    position,
    id,
    direction,
    ownDamage,
    health,
  }:
  {
    position: Position;
    id: number;
    direction: Direction;
    health: number;
    ownDamage: Damage;
  }) {
    super({
      ownDamage,
      color: "white",
      id,
      kind: "damage-entity",
      position,
      walkTickValue: 1,
      direction,
      health,
      weapons: [],
    });
  }
}
