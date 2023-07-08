import { Damage } from "./damage";
import { TickController } from "./main";
import { Direction, Direction_XYType, Position } from "./types";
import { Weapon } from "./weapon";

export class Attack {
  private status: boolean; // доработать ???
  ticker: TickController; // интервал между выстрелами
  direction: Direction_XYType; // стартовый вектор начала движения Bullet
  private weapons: Weapon[]; // арсенал (пресеты, другими словами)
  currentWeapon: Weapon; // в данный момент выбранный пресет
  ownDamage: Damage; // урон наносимый самим объектом, не путать с уроном Weapon
  private spawnPoint:Position ; // точка спауна для объекта аттаки

  // доработать. пока что выберает первое оружие (пресет настроек) из массива пресетов
  setCurrentWeapon() {
    if (this.weapons.length) {
      this.currentWeapon = this.weapons[0];
      this.ticker.setTickInterval(this.currentWeapon.fireRate);
    } else {
      this.currentWeapon = null;
    }
  }

  setOwnDamge(value: number) {
    this.ownDamage.value = value;
  }

  getOwnDamage() {
    return this.ownDamage.value;
  }

  getSpawnPoint () {
    return {...this.spawnPoint} ;
  }

  setSpawnPoint ({x , y}:Position) {
    this.spawnPoint = { x , y } ;
  }

  setDirection ({x , y}:Direction_XYType) {
    this.direction.x = x ;
    this.direction.y = y ;
  }

  constructor({ownDamage , weapons , spawnPoint}:{ownDamage: Damage, weapons: Weapon[] , spawnPoint:Position}) {
    this.ownDamage = ownDamage;
    this.weapons = weapons; // получение арсенала
    this.direction = { x: 0, y: 0 };
    this.spawnPoint = spawnPoint ;
    this.ticker = new TickController(1000) ;
    this.setCurrentWeapon();

    // console.log('constructed');
    // console.log(new TickController(100));
    // console.log(this.ticker);
  }
}
