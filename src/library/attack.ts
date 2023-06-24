import { Damage } from "./damage";
import { Tick } from "./main";

export type AttackClass = "phisical" | "magic";

export class Attack {
  status: boolean;
  speed: number;
  ticker: Tick;
  damage: Damage;
  

  setTrueStatus() {
    this.status = true;
  }

  reset() {
    this.status = false;
  }

  constructor(damage: Damage, ticker: Tick) {
    this.ticker = ticker;
    this.speed = this.ticker.speed;
    this.damage = damage;
  }
}
