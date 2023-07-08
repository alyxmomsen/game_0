import { TickController } from "./main";
import { Direction, Position } from "./types";

export class Movement {
  // private stepRate: number;
  direction: Direction;
  private ticker: TickController;
  counterOfSteps: number;
  lastMove: number;
  maxWalkSteps: number;
  shouldFadeDownStepRate: boolean;
  nextPosition: Position;
  stepRange: {x:number ,y:number};
  maxStepRange:number ;

  getTickInterval() {
    // return this.stepRate;
  }

  setTickInterval(value: number) {
    value = Math.floor(value); // округляем вниз
    value = value >= 1 ? value : 1; // проверка на (1 или больше)
    this.ticker.setTickInterval(value); // устанавливаем в тикер целочисленное значение
    // this.stepRate = value; // дублируем
  }

  getTick() {
    // тик или не тик вот в чем вопрос...
    // return this.ticker.tick();
  }

  updateStepRange () {



  }


  updateNextPosition (currentPosition:Position) {
    
  }

  isNextStepRangeBigger (value:number) {

    return value > this.maxStepRange ? true : false ;
  }

  updateStepRangeBy (up:boolean , down:boolean , left:boolean , right:boolean) {

    const value = 0.5 ;

    if(down && !up) {
      if(!this.isNextStepRangeBigger(Math.abs(this.stepRange.y + value))) {
        this.stepRange.y += value ;
      }
    } else if (up && !down) {
      if(!this.isNextStepRangeBigger(Math.abs(this.stepRange.y - value))) {
        this.stepRange.y -= value ;
      }
    } else {
      if(this.stepRange.y > 0) {
        if(this.stepRange.y - value <= 0) {
          this.stepRange.y = 0 ;
        }
        else {
          this.stepRange.y -= value ;
        }
      }
      else if(this.stepRange.y < 0) {
        if(this.stepRange.y + value >= 0) {
          this.stepRange.y = 0 ;
        }
        else {
          this.stepRange.y += value ;
        }
      }
    }

    if(right && !left) {
      if(!this.isNextStepRangeBigger(Math.abs(this.stepRange.x + value))) {
        this.stepRange.x += value ;
      }
    } else if (left && !right) {
      if(!this.isNextStepRangeBigger(Math.abs(this.stepRange.x - value))) {
        this.stepRange.x -= value ;
      }
    } else {
      if(this.stepRange.x > 0) {
        if(this.stepRange.x - value <= 0) {
          this.stepRange.x = 0 ;
        }
        else {
          this.stepRange.x -= value ;
        }
      }
      else if(this.stepRange.x < 0) {
        if(this.stepRange.x + value >= 0) {
          this.stepRange.x = 0 ;
        }
        else {
          this.stepRange.x += value ;
        }
      }
    }
  }

  constructor({
    direction,
    maxWalkSteps,
    shouldFadeDownStepRate,
    nextPosition,
    stepRange,
    maxStepRange ,
  }: {
    direction: Direction;
    maxWalkSteps: number;
    shouldFadeDownStepRate: boolean;
    nextPosition: Position;
    stepRange: {x:number , y:number};
    maxStepRange:number ;
  }) {
    this.stepRange = stepRange;
    this.maxStepRange = maxStepRange ;
    this.direction = direction;
    this.counterOfSteps = 0;
    this.maxWalkSteps = maxWalkSteps;
    this.shouldFadeDownStepRate = shouldFadeDownStepRate;
    this.nextPosition = nextPosition;
  }
}
