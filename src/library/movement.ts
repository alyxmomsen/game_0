import { Direction, Position } from "../gameobjects/gameobject";
import { Tick } from "./main";

export class Movement {
  private stepRate: number;
  direction: Direction;
  private ticker: Tick;
  counterOfSteps: number;
  lastMove: number;
  walkStepsLimit: number;
  walkStepFadeDown: boolean;
  nextPosition: Position;

  getStepRate () { return this.stepRate }
  setStepRate (value:number) { 
    this.ticker.setSpeed(Math.floor(value));
    this.stepRate = value 
  }

  getTick () { return this.ticker.tick() }

  constructor({
    stepRate,
    direction,
    walkStepsLimit,
    walkStepFadeDown,
    nextPosition,
  }: {
    stepRate: number;
    direction: Direction;
    walkStepsLimit: number;
    walkStepFadeDown: boolean;
    nextPosition: Position;
  }) {
    this.stepRate = stepRate;
    this.ticker = new Tick(stepRate);
    this.direction = direction;
    this.counterOfSteps = 0;
    this.walkStepsLimit = walkStepsLimit;
    this.walkStepFadeDown = walkStepFadeDown;
    this.nextPosition = nextPosition;
  }
}
