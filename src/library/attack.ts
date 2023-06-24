import { Damage } from "./damage";
import { Tick } from "./main";
import { Weapon } from "./weapon";

export type AttackClass = "phisical" | "magic";

export class Attack {
  status: boolean;
  speed: number;
  ticker: Tick;
  // damage: Damage;

  weapons:Weapon[] ;
  currentWeapon:Weapon ;
  ownDamage:Damage ;

  setTrueStatus() {
    this.status = true;
  }

  reset() {
    this.status = false;
  }

  constructor(ownDamage: Damage, ticker: Tick , weapons:Weapon[] ) {
    this.ticker = ticker;
    this.speed = this.ticker.speed;
    // this.damage = damage;
    this.ownDamage = ownDamage ;

    // получение арсенала
    this.weapons = weapons ;

    // установка текущего оружия
    this.weapons.length ? this.weapons[0] : null 
    

  }
}
