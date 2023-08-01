import { Damage } from "./damage";
import { TickController } from "./main";
import {
  Direction,
  Direction_XYType,
  Position,
  validDamageClasses,
} from "./types";
import { Weapon } from "./weapon";

export class Attack {
  private validAttackClassses: string[];

  private status: boolean; // доработать ???
  ticker: TickController; // интервал между выстрелами
  direction: Direction; // стартовый вектор начала движения Bullet
  private weapons: Weapon[]; // арсенал (пресеты, другими словами)
  // currentWeapon: Weapon | null; // в данный момент выбранный пресет
  private ownDamage: Damage; // урон наносимый самим объектом, не путать с уроном Weapon
  private spawnPoint: Position; // точка спауна для объекта аттаки
  private currentWeaponID: number;

  // доработать. пока что выберает первое оружие (пресет настроек) из массива пресетов
  setCurrentWeaponByDefault() {
    if (this.weapons.length) {
      this.currentWeaponID = 0;
      this.ticker.setTickInterval(this.weapons[this.currentWeaponID].get_FireRate());
    } else {
      this.currentWeaponID = -1; // означает что нету оружия или не установлено
    }
  }

  get_numberOfWeapons() {
    return this.weapons.length;
  }

  getWeaponByID(id: number) {}

  get_currentWeapon(): Weapon | null {
    // const weapon = this.weapons[this.currentWeaponID] ;
    if (this.currentWeaponID < 0) {
      return null;
    } else {
      const weapon = this.weapons[this.currentWeaponID];

      if (weapon instanceof Weapon) {
        return weapon;
      } else {
        return null;
      }
    }
  }

  get_currentWeaponID() {
    return this.currentWeaponID >= 0 ? this.currentWeaponID : undefined;
  }

  changeCurrentWeapon() {
    if (this.weapons.length) {
      this.currentWeaponID =
        this.currentWeaponID >= 0
          ? this.currentWeaponID + 1 < this.weapons.length
            ? this.currentWeaponID + 1
            : 0
          : 0;

      this.ticker = new TickController(this.weapons[this.currentWeaponID].get_FireRate());

    }

    console.log("changed ", this.currentWeaponID, this.weapons.length);
  }

  addWeapon(weapon: Weapon) {
    this.weapons.push(weapon);
  }

  getCurrentWeaponName() {

    const curWeaponID = this.get_currentWeaponID();



    return curWeaponID !== undefined ? this.weapons[curWeaponID].getProps().title : "";
  }

  setOwnDamge(value: number) {
    this.ownDamage.value = value;
  }

  getOwnDamage() {
    return this.ownDamage.value;
  }

  getSpawnPoint() {
    return { ...this.spawnPoint };
  }

  setSpawnPoint({ x, y }: Position) {
    this.spawnPoint = { x, y };
  }

  setDirection({ x, y }: Direction) {
    this.direction.x = x;
    this.direction.y = y;
  }

  changeWeapon() {
    this.setCurrentWeaponByDefault();
  }

  constructor({
    ownDamage,
    weapons,
    spawnPoint,
  }: {
    ownDamage: Damage;
    weapons: Weapon[];
    spawnPoint: Position;
  }) {
    this.ownDamage = ownDamage;
    this.weapons = weapons; // получение арсенала
    this.direction = { x: 0, y: 0 };
    this.spawnPoint = spawnPoint;
    this.ticker = new TickController(1000);
    this.setCurrentWeaponByDefault();

    // this.validAttackClassses = validDamageClasses ;

    // console.log('constructed');
    // console.log(new TickController(100));
    // console.log(this.ticker);
  }
}
