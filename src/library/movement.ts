import { Direction, Position } from "../gameobjects/gameobject";
import { TickController } from "./main";

export class Movement {
  private stepRate: number;
  direction: Direction;
  private ticker: TickController;
  counterOfSteps: number;
  lastMove: number;
  walkStepsLimit: number;
  walkStepFadeDown: boolean;
  nextPosition: Position;

  getStepRate() {
    return this.stepRate;
  }

  setStepRate(value: number) {
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
    this.ticker = new TickController(stepRate);
    this.direction = direction;
    this.counterOfSteps = 0;
    this.walkStepsLimit = walkStepsLimit;
    this.walkStepFadeDown = walkStepFadeDown;
    this.nextPosition = nextPosition;
  }
}
