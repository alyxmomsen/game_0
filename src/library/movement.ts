import { Direction, Position } from "../gameobjects/gameobject";
import { Tick } from "./main";

export class Movement {
  stepRate: number;
  direction: Direction;
  ticker: Tick;
  counterOfSteps: number;
  lastMove: number;
  walkStepsLimit: number;
  walkStepFadeDown: boolean;
  nextPosition: Position;

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
