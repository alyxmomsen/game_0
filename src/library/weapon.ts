import { Damage } from "./damage";

export class Weapon {
  id: number;
  title: string;
  damage: Damage;
  fireRate: number;

  constructor({ damage, fireRate }: { damage: Damage; fireRate: number }) {
    this.damage = damage;
    this.fireRate = fireRate;
  }
}
