import { Direction } from "../gameobjects/gameobject";
import { Damage } from "./damage";
import { TickController } from "./main";
import { Weapon } from "./weapon";

export type AttackClass = "phisical" | "magic";

export class Attack {
  private status: boolean; // доработать ???
  ticker: TickController; // интервал между выстрелами

  direction: Direction; // стартовый вектор начала движения Bullet

  private weapons: Weapon[]; // арсенал (пресеты, другими словами)
  currentWeapon: Weapon; // в данный момент выбранный пресет
  ownDamage: Damage; // урон наносимый самим объектом, не путать с уроном Weapon

  // доработать. пока что выберает первое оружие (пресет настроек) из массива пресетов
  setCurrentWeapon() {
    if (this.weapons.length) {
      this.currentWeapon = this.weapons[0];
      this.ticker = new TickController(this.currentWeapon.fireRate);
    } else {
      this.currentWeapon = null;
      this.ticker = null;
    }
  }

  setOwnDamge(value: number) {
    this.ownDamage.value = value;
  }

  getOwnDamage() {
    return this.ownDamage.value;
  }

  constructor(ownDamage: Damage, weapons: Weapon[]) {
    // this.speed = this.ticker.speed;
    this.ownDamage = ownDamage;
    this.weapons = weapons; // получение арсенала
    this.direction = { x: 1, y: 0 };
    this.setCurrentWeapon();
  }
}
