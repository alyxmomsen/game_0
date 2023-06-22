import { Tick } from "./main";

export type AttackClass = "phisical" | "magic";

export class Attack {
  
  status:boolean ;
  speed:number ;
  ticker:Tick ;

  setTrueStatus () {

    this.status = true ;
  }

  reset() {
    this.status = false ;
  }

  constructor () {

    this.speed = 100 ;
    this.ticker = new Tick(this.speed);

  }
  
}
