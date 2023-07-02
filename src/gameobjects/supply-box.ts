import { Armor } from "../library/armore";
import { Damage } from "../library/damage";
import { Bullet } from "./bullet";
import GameObject, { Dimentions, Position } from "./gameobject";

export class SupplyBox extends GameObject {
  supply: "damage-Up";
  update({ fieldDimentions }: { fieldDimentions: Dimentions }): false | Bullet {
    return super.update({
      fieldDimentions,
      keys: [],
      objects: [],
      option: () => {},
      optionToGameobjectIterator: (gameObject: SupplyBox | null) => {},
    });
  }

  constructor({ position }: { position: Position }) {
    super({
      id: 0,
      kind: "supply-box",
      walkStepRate: 100,
      walkStepsLimit: 0,
      walkStepRateFadeDown: false,
      color: "orange",
      position,
      ownDamage: new Damage({ damageClass: "phisical", value: 0 }),
      weapons: [],
      direction: { x: 1, y: 0 },
      health: 666,
      armor: new Armor({
        health: Math.floor(Math.random() * 10000),
        dempher: Math.floor(Math.random() * 99) + 1,
      }),
    });
  }
}
