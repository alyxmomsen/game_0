import { TickController } from "./main";
import { Direction, Position } from "./types";

export class Movement {
  private stepRate: number;
  direction: Direction;
  private ticker: TickController;
  counterOfSteps: number;
  lastMove: number;
  maxWalkSteps: number;
  shouldFadeDownStepRate: boolean;
  nextPosition: Position;
  stepRange:number ;

  getTickInterval() {
    return this.stepRate;
  }

  setTickInterval(value: number) {
    value = Math.floor(value); // округляем вниз
    value = value >= 1 ? value : 1; // проверка на (1 или больше)
    this.ticker.setTickInterval(value); // устанавливаем в тикер целочисленное значение
    this.stepRate = value; // дублируем
  }

  getTick() {
    // тик или не тик вот в чем вопрос...
    return this.ticker.tick();
  }

  constructor({
    stepRate,
    direction,
    maxWalkSteps,
    shouldFadeDownStepRate,
    nextPosition,
    stepRange ,
  }: {
    stepRate: number;
    direction: Direction;
    maxWalkSteps: number;
    shouldFadeDownStepRate: boolean;
    nextPosition: Position;
    stepRange:number ;
  }) {
    this.stepRate = stepRate;
    this.stepRange = stepRange ;
    this.ticker = new TickController(stepRate);
    this.direction = direction;
    this.counterOfSteps = 0;
    this.maxWalkSteps = maxWalkSteps;
    this.shouldFadeDownStepRate = shouldFadeDownStepRate;
    this.nextPosition = nextPosition;
  }
}
