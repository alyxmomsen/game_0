import { Direction } from "../gameobjects/gameobject";
import { Damage } from "./damage";
import { Tick } from "./main";
import { Weapon } from "./weapon";

export type AttackClass = "phisical" | "magic";

export class Attack {
  status: boolean;
  speed: number;
  ticker: Tick;
  
  direction:Direction ;

  weapons: Weapon[];
  currentWeapon: Weapon;
  ownDamage: Damage;

  setTrueStatus() {
    this.status = true;
  }

  reset() {
    this.status = false;
  }

  setCurrentWeapon() {
    if (this.weapons.length) {
      this.currentWeapon = this.weapons[0];
      this.ticker = new Tick(this.currentWeapon.fireRate);
    } else {
      this.currentWeapon = null;
      this.ticker = null;
    }
  }

  constructor(ownDamage: Damage, weapons: Weapon[]) {
    // this.speed = this.ticker.speed;
    this.ownDamage = ownDamage;
    this.weapons = weapons; // получение арсенала
    this.direction = {x:1 , y:0} ;
    this.setCurrentWeapon();
  }
}
