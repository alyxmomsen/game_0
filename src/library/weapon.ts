import { Damage } from "./damage";

export class Weapon {
  id: number;
  title: string;
  damage: Damage;

  constructor({ damage }: { damage: Damage }) {
    this.damage = damage;
  }
}
