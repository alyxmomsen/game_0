import { Direction } from "../gameobjects/gameobject";
import { Tick } from "./main";

export class Movement {
  stepRate: number;
  direction: Direction;
  ticker: Tick;
  counterOfSteps:number ;
  lastMove:number ;

  constructor(stepRate: number, direction: Direction) {
    this.stepRate = stepRate ;
    this.ticker = new Tick(stepRate);
    this.direction = direction;
    this.counterOfSteps = 0 ;
  }
}
