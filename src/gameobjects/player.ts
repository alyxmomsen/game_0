import { ArmorClass } from "../library/armore";
import { Damage } from "../library/damage";
import { Tick, calculateMovementDirection } from "../library/main";
import GameObject, { Position } from "./gameobject";
// import { heroActions, moveHero } from "./player_keys_checker";

export class Player extends GameObject {
  constructor({
    id,
    armorKind,
    damaged,
    position,
  }: {
    id: number;
    armorKind: ArmorClass;
    damaged: Damage[] ;
    position: Position;
  }) {

    
    super({
      id, //
      backgroundColor: "green",
      kind: "player",
      armorKind,
      damaged,
      walkSpeed: 20,
      color: "green",
      position,
      damage:new Damage('phisical' , 100) ,
    });

    this.movement = { direction: "down" };

    console.log("переопределенный метод");

    console.log("player constructed");
  }
}
