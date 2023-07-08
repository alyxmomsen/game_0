import { TickController } from "./main";
import { Direction, Position } from "./types";

export class Movement {

  private tickController: TickController;
  counterOfSteps: number;
  lastMoveTimestamp: number;
  maxAllowedSteps: number;
  shouldDecreaseStepRate: boolean;
  targetPosition: Position;
  currentStepRange: {x:number ,y:number};
  stepRangeChange:number ;
  stepRangeChangeDelta:number ;
  maxAllowedStepRange:number ;

  getTickInterval() {

  }

  setTickInterval(value: number) {
    value = Math.floor(value); // округляем вниз
    value = value >= 1 ? value : 1; // проверка на (1 или больше)
    this.tickController.setTickInterval(value); // устанавливаем в тикер целочисленное значение
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

    return value > this.maxAllowedStepRange ? true : false ;
  }

  updateStepRangeByController ({up , down , left , right}:{up:boolean , down:boolean , left:boolean , right:boolean}) {

    const value = 0.1 ;

    if(down && !up) {
      if(!this.isNextStepRangeBigger(Math.abs(this.currentStepRange.y + value))) {
        this.currentStepRange.y += this.stepRangeChange ;
      }
    } else if (up && !down) {
      if(!this.isNextStepRangeBigger(Math.abs(this.currentStepRange.y - value))) {
        this.currentStepRange.y -= this.stepRangeChange ;
      }
    } else {
      if(this.currentStepRange.y > 0) {
        if(this.currentStepRange.y - (this.stepRangeChange + this.stepRangeChangeDelta) <= 0) {
          this.currentStepRange.y = 0 ;
        }
        else {
          this.currentStepRange.y -= (this.stepRangeChange + this.stepRangeChangeDelta) ;
        }
      }
      else if(this.currentStepRange.y < 0) {
        if(this.currentStepRange.y + (this.stepRangeChange + this.stepRangeChangeDelta) >= 0) {
          this.currentStepRange.y = 0 ;
        }
        else {
          this.currentStepRange.y += (this.stepRangeChange + this.stepRangeChangeDelta) ;
        }
      }
    }

    if(right && !left) {
      if(!this.isNextStepRangeBigger(Math.abs(this.currentStepRange.x + value))) {
        this.currentStepRange.x += this.stepRangeChange ;
      }
    } else if (left && !right) {
      if(!this.isNextStepRangeBigger(Math.abs(this.currentStepRange.x - value))) {
        this.currentStepRange.x -= this.stepRangeChange ;
      }
    } else {
      if(this.currentStepRange.x > 0) {
        if(this.currentStepRange.x - (this.stepRangeChange + this.stepRangeChangeDelta) <= 0) {
          this.currentStepRange.x = 0 ;
        }
        else {
          this.currentStepRange.x -= (this.stepRangeChange + this.stepRangeChangeDelta) ;
        }
      }
      else if(this.currentStepRange.x < 0) {
        if(this.currentStepRange.x + (this.stepRangeChange + this.stepRangeChangeDelta) >= 0) {
          this.currentStepRange.x = 0 ;
        }
        else {
          this.currentStepRange.x += (this.stepRangeChange + this.stepRangeChangeDelta) ;
        }
      }
    }
  }

  constructor({
    maxWalkSteps,
    shouldFadeDownStepRate,
    nextPosition,
    stepRange,
    maxStepRange ,
  }: {
    maxWalkSteps: number;
    shouldFadeDownStepRate: boolean;
    nextPosition: Position;
    stepRange: {x:number , y:number};
    maxStepRange:number ;
  }) {
    this.currentStepRange = stepRange;
    this.maxAllowedStepRange = maxStepRange ;
    this.counterOfSteps = 0;
    this.maxAllowedSteps = maxWalkSteps;
    this.shouldDecreaseStepRate = shouldFadeDownStepRate;
    this.targetPosition = nextPosition;

    this.stepRangeChange = 0.2 ;
    this.stepRangeChangeDelta = 0 ;
  }
}
